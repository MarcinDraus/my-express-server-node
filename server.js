
const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const hbs = require('express-handlebars');

// Konfiguracja Handlebars
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: path.join(__dirname, 'views/layouts'), defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

// Konfiguracja Multer do przechowywania plików na dysku
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  },
});

// Obsługa wysyłania plików
app.post('/contact/send-message', upload.single('projectDesign'), (req, res) => {
  const { author, sender, title, message } = req.body;

  if (author && sender && title && message) {
    const fileName = req.file ? req.file.originalname : '';
    res.render('contact', { isSent: true, fileName: fileName });
  } else {
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


