const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { read } = require('fs');
const { v4: uuid } = require('uuid')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
// app.use(methodOverride('X-HTTP-Method-Override'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Jack',
        comment: 'Numerical Number 487'
    },
    {
        id: uuid(),
        username: 'hairycavewomanlegs454',
        comment: 'You supposed to be my day one man'
    },
    {
        id: uuid(),
        username: 'ReligiousPerson56',
        comment: 'Religion'
    },
    {
        id: uuid(),
        username: 'Keylover',
        comment: 'I love keys'
    }
]

app.get('/comments', (req, res) => {
    return res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    return res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos RESPONSE")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos.`)
})


app.get("/", (req, res) => {
    res.send({ msg: "Server is working" });
})

app.listen(4554, () => {
    console.log("ON PORT 4554")
})