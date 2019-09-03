var express = require('express');
var router = express.Router();

const db = require('../dynamoDBManager');

/* Get list of users */
router.get('/', (req, res) => {

  db.getUsers(req.query.userStatus).then(
    data => {
      if (data.Count < 1) {
        // no users found
        res.status(404).send('No data for requested user state found');
      } else {
        res.send(data);
      }
    },
    error => {
      console.log(error);
      res.send(error);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

})


/* GET a single user */
router.get('/:id', (req, res) => {

  db.getUser(req.params.id).then(
    data => {
      res.send(data.Item);
    },
    error => {
      console.log(error);
      res.send(error);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

});

router.delete('/:id', (req, res) => {

  db.deleteUser(req.params.id).then(
    data => {
      res.send(data);
    },
    error => {
      console.log(error);
      res.send(error);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

});


router.put('/:id', (req, res) => {

  db.updateUser(req.params.id, req.body).then(
    data => {
      res.send(data);
    },
    error => {
      console.log(error);
      res.send(error);
    }
  ).catch(
    error => {
      renderError(error);
    }
  )

});


/* POST user --> registration */
router.post('/', (req, res) => {

  db.createUser(req.body).then(
    data => {
      res.send(data);
    },
    error => {
      console.log(error);
      res.send(error);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

  // var newUser = req.body;
  // if (!newUser.id) {
  //   newUser.id = uuidv1();
  // }
  // newUser.userName = newUser.lastName + ' ' + newUser.firstName;
  // newUser.userStatus = 'registered';

  // docClient.put({ TableName: table, Item: newUser }, function(err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //     res.send(err);
  //   } else {
  //     console.log(data);
  //     res.send(newUser);
  //   }
  // })


  // const mailgun = require("mailgun-js");
  // const mg = mailgun({
  //   apiKey: process.env.MAILGUN_APIKEY, 
  //   domain: process.env.MAILGUN_DOMAIN,
  //   host: process.env.MAILGUN_HOST});

  // var text = 'firstname: ' + req.body.firstname 
  //   + '\nlastname: ' + req.body.lastname 
  //   + '\nemail: ' + req.body.email
  //   + '\nagreement: ' + req.body.agreement;
  
  // const data = {
  //   from: 'BMW IT-Cup Registration <postmaster@mg.bmw-itcup.de>',
  //   to: 'fveitzen@gmail.com',
  //   subject: '--> New registration',
  //   text: text
  // };

  // mg.messages().send(data, function (error, body) {
  //   console.log(body);
  //   res.send(body);
  // });
  
});

function renderError(error, res) {
  console.log(error);
  res.send(error);
}



module.exports = router;
