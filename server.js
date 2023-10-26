
const express = require('express');
const path = require('path');

const app = express();
const hbs = require('express-handlebars');
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

// app.use((req, res, next) => {
//     res.show = (name) => {
//       res.sendFile(path.join(__dirname, `/views/${name}`));
//     };
//     next();
//   });

  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (req, res) => {
    res.render('index', { layout: false });
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { layout: false });
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact', { layout: false });
  });
  
  app.get('/info', (req, res) => {
    res.render('info', { layout: false });
  });
  
  app.get('/history', (req, res) => {
    res.render('history', { layout: false });
  });

  app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

  

//   app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '/style.css'));
//   });
  
//   app.get('/test.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '/test.png'));
//   });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});