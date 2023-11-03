
const express = require('express');
const path = require('path');

const app = express();
const hbs = require('express-handlebars');
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: path.join(__dirname, 'views/layouts'), defaultLayout: 'main' }));
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views'));

//app.engine('.hbs', hbs());
//app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'views/layouts'));


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

  

//   app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '/style.css'));
//   });
  
//   app.get('/test.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '/test.png'));
//   });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});