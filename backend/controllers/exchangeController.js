const fixer = require('fixer-api');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { exchangeRates, currencies, convert } = require('exchange-rates-api');
const axios = require('axios');

exports.currencies = catchAsyncErrors(async (req, res, next) => {
  const data = await axios.get(
    `http://api.currencylayer.com/live?access_key=${process.env.API_KEY}`
  );

  res.status(200).json({
    success: true,
    response: data?.data?.quotes,
    meesage: 'Data fetched successfully.',
  });
});

exports.currencyConvert = catchAsyncErrors(async (req, res, next) => {
  const { from, to, amount } = req.body;
  const data = await fixer
    .set({ accessKey: '4843ba5d1d4c039f70795cd60f3a4064' })
    .convert(from, to, amount, '2018-02-22');
  console.log(data);

  res.status(200).json({
    success: true,
    response: data,
    meesage: 'Currency converted successfully.',
  });
});
