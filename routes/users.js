var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user --> registration */
router.post('/', (req, res) => {

  console.log(req.body.firstname);

  const mailgun = require("mailgun-js");
  const mg = mailgun({
    apiKey: process.env.MAILGUN_APIKEY, 
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST});

  var text = 'firstname: ' + req.body.firstname 
    + '\nlastname: ' + req.body.lastname 
    + '\nemail: ' + req.body.email
    + '\nagreement: ' + req.body.agreement;
  
  const data = {
    from: 'BMW IT-Cup Registration <postmaster@mg.bmw-itcup.de>',
    to: 'fveitzen@gmail.com',
    subject: '--> New registration',
    text: text
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
    res.send(body);
  });
  
})

module.exports = router;
