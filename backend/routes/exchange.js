const express = require('express');
const router = express.Router();

const {
  currencies,
  currencyConvert,
} = require('../controllers/exchangeController');

router.route('/currencies').get(currencies);
router.route('/currencies/convert').post(currencyConvert);

module.exports = router;
