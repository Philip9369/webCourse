const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("WUH OH LOOKS LIKE SOMETHING WENT WRONG WITH THE MONGOOSE")
        console.log(err)
    })


const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     const user = new User({
//         username: 'chickenfan99',
//         age: '23'
//     })
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'Me want Chicken', likes: '2', })
//     tweet2.user = user;
//     user.save();
//     tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t);
}

findTweet();    