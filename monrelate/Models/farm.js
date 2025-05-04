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


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: '4.99', season: 'Summer' },
//     { name: 'Glaciel Grapes', price: '10.49', season: 'Winter' },
//     { name: 'Athletic Apples', price: '2.99', season: 'Spring' }
// ])


// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Giving Tree Farms', city: 'Guinda, CA' });
//     const melon = await Product.findOne({ name: 'Glaciel Grapes' });
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm);
// }


const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Giving Tree Farms' })
    const grapes = await Product.findOne({ name: 'Glaciel Grapes' });
    farm.products.push(grapes)
    await farm.save()
    console.log(farm)
}

Farm.findOne({ name: 'Giving Tree Farms' })
    .populate('products')
    .then(farm => console.log(farm))