
const express = require('express');
const path = require('path');

const app = express();
const hbs = require('express-handlebars');
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: path.join(__dirname, 'views/layouts'), defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

app.post('/contact/send-message', (req, res) => {

    const { author, sender, title, message } = req.body;
  
    if(author && sender && title && message) {
      res.render('contact', { isSent: true });
    }
    else {
      res.render('contact', { isError: true });
    }
  
  });
  

  app.use(express.static(path.join(__dirname, '/public')));

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

  app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});