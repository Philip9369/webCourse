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
    if (password === 'easter') {
        next();
    }
    // res.send('SORRY DINGUS A PASSWORD IS REQUIRED')
    // throw new Error('Password required')
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home')
})

app.get('/error', (req, res) => {
    chicken.fly()
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

app.use((err, req, res, next) => {
    console.log('*******************************************')
    console.log('*****************ERROR*********************')
    console.log('*******************************************')
    console.log(err)
    res.send('Sorrying something is broken :3')

})

app.listen(3404, () => {
    console.log('App is running on localhost:3404')
})