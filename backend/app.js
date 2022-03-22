const express = require('express');
const app = express();

const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION')
  require('dotenv').config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import all routes
const auth = require('./routes/auth');

const exchange = require('./routes/exchange');

app.use('/api/v1', auth);
app.use('/api/v1', exchange);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
