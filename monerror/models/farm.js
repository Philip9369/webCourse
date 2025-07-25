const mongoose = require('mongoose');
const Product = require('./product')
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'All Farms have names.']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Yes']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res)
    }
    console.log("POST MIDDLEWARE")
})


const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;