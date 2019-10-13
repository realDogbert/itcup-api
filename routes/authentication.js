var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const userManager = require('../userManager');

router.post('/register', async (req, res, next) => {

    const newUser = await userManager.registerUser({
        loginName: req.body.loginName,
        email: req.body.email,
        password: req.body.password
    });

    res.status(201).send(newUser);

});

router.post('/login', async (req, res, next) => {

    const result = await userManager.getUserByLoginName(req.body.loginName);
    user = result.Items[0];

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
        res.status(200).send('OK');
    } else {
        res.status(401).send('Authentication failed');
    }


});

module.exports = router;