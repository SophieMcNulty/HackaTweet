var express = require('express');
var router = express.Router();

require('../models/connection')
const User = require('../models/users')
const Tweet = require('../models/tweets')
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

router.post('/', async (req, res) => {
  const findUser = await User.findOne({ token: req.body.token })
  if (findUser) {
    console.log(findUser)
    res.json({ result: true, user: findUser })
  } else {
    res.json({ result: false, error: "User not found" })
  }
})

router.post("/updateTweetLikes", async (req, res) => {
  const findUser = await User.findOne({ token: req.body.token })
  const listTweetLike = findUser.tweetLike
  // console.log(listTweetLike.includes(req.body.id))
  if (!listTweetLike || !listTweetLike.includes(req.body.id)) {
    const addTweetId = await User.updateOne({ token: req.body.token }, { $push: { tweetLike: req.body.id } })
    const addLike = await Tweet.findById(req.body.id)
    addLike.nbrOfLikes++
    addLike.save()
    res.json({ result: true })
  } else {
    const removeTweetId = await User.updateOne({ token: req.body.token }, { $pull: { tweetLike: req.body.id } })
    const removeLike = await Tweet.findById(req.body.id)
    removeLike.nbrOfLikes--
    removeLike.save()
    res.json({ result: false })
  }
})

router.post("/removeTweetLikes", (req, res) => {
  User.updateOne({ token: req.body.token },
    { $pull: { tweetLike: req.body.id } }
  ).then(data => {
    if (data) {
      res.json({ result: true, message: "like remove" })
    }
  })
})



module.exports = router;
