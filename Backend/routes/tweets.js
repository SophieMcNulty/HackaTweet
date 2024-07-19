var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets');
const { now } = require('mongoose');

router.get('/', (req, res) => {
    Tweet.find()
        .then(data => { res.json({ tweets: data }) }
        )
})

router.post('/postTweet', (req, res) => {
    const newTweet = new Tweet({
        textContent: req.body.textContent,
        username: req.body.username,
        firstname: req.body.firstname,
        nbrOfLikes: 0,
        hashtags: req.body.hashtags,
    })
    newTweet.save()
        .then(savedTweet => res.json({ result: true, tweet: savedTweet }))
})


router.delete("/deleteTweet/:tweetId", (req, res) => {
    Tweet.deleteOne({ _id: req.params.tweetId })
        .then(deletedTweet => {
            if (deletedTweet.deletedCount > 0) {
                res.json({ result: true, message: 'successfully deleted' })
            } else {
                res.json({ result: false, error: "not deleted" })
            }
        })
});

router.post("/updateTweetLikes", (req, res) => {
    Tweet.updateOne({ _id: req.body.tweetId },
        { nbrOfLikes: req.body.nbr }
    ).then(data => {
        if (data) {
            res.json({ result: true, message: "likes updated" })
        }
    })
})

router.post('/hashtag', (req, res) => {
    Tweet.find({ hashtags: req.body.hashtag })
        .then(data => {
            if (data) {
                { res.json({ result: true, tweets: data }) }
            } else {
                { res.json({ result: false }) }
            }
        }
        )
})



module.exports = router;