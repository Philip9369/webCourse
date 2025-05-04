const express = require('express')
const app = express();
const session = require('express-session')

const cookieParser = require('cookie-parser')
app.use(cookieParser('thisismysecret'))
app.use(session({ secret: 'thisisnotagoodsecret' }))

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have been here ${req.session.count} times.`)
})

app.listen(3000, () => {
    console.log("SERVING")
})