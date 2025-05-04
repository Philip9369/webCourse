const express = require("express");
// const { watch } = require("fs");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/w/:Watch', (req, res) => {
    const { Watch } = req.params
    res.render('Watch', { Watch })
    // res.send('42')
})

app.listen(4040, () => {
    console.log("LISTENING ON PORT 4040")
})