const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const hbs = require('express-handlebars');

// Konfiguracja silnika szablonów Handlebars dla Express
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: path.join(__dirname, 'views/layouts'), defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Dodanie middleware do obsługi przesyłania danych z formularzy (dane kodowane jako URL)
app.use(express.urlencoded({ extended: false }));

// Stworzenie instancji multer z konfiguracją dla przechowywania plików w pamięci
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  },
});

// Konfiguracja endpointu dla przesyłania plików w formularzu kontaktowym
app.post('/contact/send-message', upload.single('projectDesign'), (req, res) => {
  // Pobranie danych z formularza
  const { author, sender, title, message } = req.body;

  // Sprawdzenie, czy wszystkie wymagane pola są wypełnione
  if (author && sender && title && message) {
    // Jeśli plik został przesłany, pobierz jego zawartość jako base64
    const imageBase64 = req.file ? req.file.buffer.toString('base64') : '';
    
    // Renderowanie widoku 'contact' z flagą isSent i danymi do wyświetlenia obrazka
    res.render('contact', { isSent: true, imageBase64: imageBase64 });
  } else {
    // Renderowanie widoku 'contact' z flagą isError
    res.render('contact', { isError: true });
  }
});

// Dodanie middleware do obsługi plików statycznych (np. style CSS, obrazy)
app.use(express.static(path.join(__dirname, '/public')));

// Konfiguracja endpointów dla różnych stron
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'dark' });
});

// Obsługa błędów dla nieodnalezionych stron (404)
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

// Uruchomienie serwera na porcie 8000
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});


