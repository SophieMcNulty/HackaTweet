var express = require('express');
var router = express.Router();

require('../models/connection')
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')
const uid2 = require('uid2')
const bcrypt = require('bcrypt')


/* route signup */

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ firstname: req.body.firstname, username: req.body.username })
    .then(data => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
          firstname: req.body.firstname,
          username: req.body.username,
          token: uid2(32),
          password: hash,
        });
        newUser.save()
          .then(() => {
            res.json({ result: true, token: newUser.token })
          })
      } else {
        res.json({ result: false, error: "User already exists" })
      }
    });
});

/* route signin */

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ username: req.body.username })
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token, firstname: data.firstname });
      } else {
        res.json({ result: false, error: "Try again" })
      }
    });
});




module.exports = router;
