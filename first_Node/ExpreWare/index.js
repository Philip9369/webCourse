const express = require('express')
const app = express();
var morgan = require('morgan');


app.use(morgan('dev'))

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path)
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('doggiieeee')
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send('SORRY DINGUS A PASSWORD IS REQUIRED')
}


// app.use((req, res, next) => {
//     console.log("FIRST MIDWARE")
//     return next();
// })

// app.use((req, res, next) => {
//     console.log("Second MIDWARE")
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('arhg')
})

app.get('/secret', verifyPassword, (req, res) => {
    // console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('My secret is that I love chicken nuggets')
})

app.use((req, res) => {
    res.status(404).send("DINGUS")
})


app.listen(3693, () => {
    console.log('App is running on localhost:3693')
})