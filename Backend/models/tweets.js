const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    firstname: String,
    username: String,
    date: Date,
    textContent: String,
    nbrOfLikes: Number,
    hashtag: String
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;