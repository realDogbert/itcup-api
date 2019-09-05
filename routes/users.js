var express = require('express');
var router = express.Router();

const db = require('../dynamoDBManager');
const mail = require('../mailgunManager');

/* Get list of users */
router.get('/', (req, res) => {

  // Only allow for local environment, not in public use.
  if (process.env.ENVIRONMENT != 'LOCAL') {
    res.status(403).send('Not allowed for public use.');
  }

  db.getUsers(req.query.userStatus).then(
    data => {
      if (data.Count < 1) {
        // no users found
        res.status(404).send('No data for requested user state found');
      } else {
        res.send(data.Items);
      }
    },
    error => {
      console.log(error);
      res.status(error.statusCode).send(error.message);
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
      if (!data.Item) {
        // user not found
        res.status(404).send('User not found');
      };
      res.send(data.Item);
    },
    error => {
      console.log(error);
      res.status(error.statusCode).send(error.message);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

});

/* Delete a single user */
router.delete('/:id', (req, res) => {

  db.deleteUser(req.params.id).then(
    data => {
      res.send(data);
    },
    error => {
      console.log(error);
      res.status(error.statusCode).send(error.message);
    }
  ).catch(
    error => {
      renderError(error);
    }
  );

});

/* Update data for a singel user */
router.put('/:id', (req, res) => {

  var updatedUser = req.body;
  db.updateUser(req.params.id, updatedUser).then(
    data => {
      res.send(updatedUser);
    },
    error => {
      console.log(error);
      res.status(error.statusCode).send(error.message);
    }
  ).catch(
    error => {
      renderError(error);
    }
  )

});


/* POST user --> registration
Save user to dynamoDB and send mail as notification 
*/
router.post('/', (req, res) => {

  var newUser = req.body;
  db.createUser(newUser).then(
    data => {
      mail.sendMail(newUser);
      // send with https status for CREATED
      res.status(201).send(newUser);
    },
    error => {
      console.log(error);
      res.status(error.statusCode).send(error.message);
    }
  ).catch(
    error => {
      renderError(error);
    }
  ); 
});




function renderError(error, res) {
  console.log(error);
  res.status(500).send(error);
}



module.exports = router;
