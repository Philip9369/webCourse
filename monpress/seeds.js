const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO ERROR")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: '1.99',
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Nigga Milk',
        price: '2.59',
        category: 'dairy'
    },
    {
        name: 'Lanced Dried Eggplant',
        price: '5.99',
        category: 'vegetable'
    },
    {
        name: 'Organic Green Sour Seedless Grapes',
        price: '9.99',
        category: 'fruit'
    },
    {
        name: 'Winter Brewed Wizard Shrooms',
        price: '4.69',
        category: 'other'
    },
    {
        name: 'Young Fresh Homegrown Latina Exalted Jumbo Mangos',
        price: '1.99',
        category: 'fruit'
    },
    {
        name: 'Whole Milk',
        price: '4.99',
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })