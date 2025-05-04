const express = require('express')
// const app = express();
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('YOU SHALL NOT PASS')
})


router.get('/topsecret', (req, res) => {
    res.send('ADMIN')
})

router.get('/deleteeverything', (req, res) => {
    res.send('its all gone :) ')
})

module.exports = router;