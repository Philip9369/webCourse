const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError')

const Product = require('./models/product')
const Farm = require('./models/Farm')


mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONECTION OPEN")
        var C = 1
        if (C !== 3) {
            console.log("HORRAYYYY")
        }
    })
    .catch(err => {
        console.log("MONGO ERROR")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

//FARM ROUTES

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({})
    res.render('farms/index', { farms })
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body)
    await farm.save();
    res.redirect('/farms')
})

app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })

})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product)
    product.farm = farm;
    await farm.save()
    await product.save()
    res.redirect(`/farms/${id}`)
})

app.delete('/farms/:id', async (req, res) => {
    // const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(req.params.id)
    res.redirect('/farms')
})

//PRODUCTS ROUTES
const categories = ['fruit', 'vegetable', 'dairy', 'other'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', wrapAsync(async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm')
    if (!product) {
        throw new AppError('Product Not Registered', 404);
    }
    res.render('products/show', { product })
}))

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body)
    res.redirect('/products')
    // res.send("easter")
})

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})
app.use((err, req, res, next) => {
    const { status = 500, message = 'WOMP WOMP' } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON 3000")
})