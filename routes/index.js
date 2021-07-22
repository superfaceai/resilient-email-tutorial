const express = require('express');
const router = express.Router();
const { SuperfaceClient } = require('@superfaceai/one-sdk');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Resilient Email',
    sendEmailResult: req.cookies.sendEmailResult,
  });
  res.clearCookie('sendEmailResult');
});

router.post('/', async (req, res) => {
  // Create OneSDK instance
  const sdk = new SuperfaceClient();

  // Load installed profile
  const profile = await sdk.getProfile('communication/send-email');

  // Use the profile to SendEmail
  const to = req.body.to;
  const result = await profile.getUseCase('SendEmail').perform({
    to,
    from: 'hello@example.com',
    subject: 'Superface Resilient Email Tutorial',
    text: `Hello ${to} from Superface Tutorial`,
  });

  // Get and show data
  let data;
  try {
    data = result.unwrap();
  } catch (error) {
    console.error('Send Email Failed: ', error);
    data = { error: 'Uups..' };
  }

  res.cookie('sendEmailResult', JSON.stringify(data));
  res.redirect('/');
});

module.exports = router;
