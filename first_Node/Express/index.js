const express = require("express");
const app = express();

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST")
// res.send("HELLO, WE REQUEST YOUR GOT! A IS THIS RESPONSE")
//     res.send({ color: "red" })
// })

app.get('/cats', (req, res) => {
    console.log("CAT REQUEST!!!")
})

app.get('/', (req, res) => {
    res.send('This is the home page!')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit.</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing the post: ${postId} <br> On the ${subreddit} subreddit.</h1>`)
})

app.get('/search', (req, res) => {
    const { q } = req.query
    if (!q) {
        res.send('Nothing!')
    }
    res.send(`<h1>Search Results for ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})


app.listen(3000, () => {
    console.log("LISTEN ON PORT 3000")
})