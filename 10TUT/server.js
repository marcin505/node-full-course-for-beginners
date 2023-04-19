const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const { corsOptions } = require('./config/corsOptions');
const fs = require('fs');
const fsPromises = require('fs').promises;
const cors = require('cors');

const { logger } = require(`./middleware/logEvents`);
const errorHandler = require(`./middleware/errorHandler`);
const PORT = process.env.PORT || 3500;

// custom middlware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: appplication/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));
// public folder for the /subdir
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load load hello.html');
    next();
  },
  (req, res) => {
    res.send('Hello World!');
  }
);

// app.use is used for middleware, doesn't understnd regex

// app.all/get/post is used for routing
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    // res.json({ error: '404 Not Found Kurde' });
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
