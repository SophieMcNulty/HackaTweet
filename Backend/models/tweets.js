const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    firstname: String,
    username: String,
    textContent: String,
    nbrOfLikes: { type: Number, default: 0 },
    hashtags: [String],
},
    { timestamps: { createdAt: 'createdAt' } });


const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;