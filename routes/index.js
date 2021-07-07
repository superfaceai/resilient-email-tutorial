const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Resilient Email',
    sendEmailResult: req.cookies.sendEmailResult,
  });
  res.clearCookie('sendEmailResult');
});

router.post('/', async (req, res) => {
  // TODO: Implement Send Hello email
  const data = { Hi: 'There' };

  res.cookie('sendEmailResult', JSON.stringify(data));
  res.redirect('/');
});

module.exports = router;
