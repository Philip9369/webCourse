const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/peopleNames', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONECTION OPEN")
    })
    .catch(err => {
        console.log("ERROR")
        console.log(err)
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {
    this.first = 'YO'
    this.last = 'MAMA'
    console.log("ABOUT TO SAVE!")
})
personSchema.post('save', async function () {
    console.log("FINISHED SAVING!")
})
const Person = mongoose.model('Person', personSchema);


const tammy = new Person({ first: 'Tammy', last: 'Johnson' })
const carson = new Person({ first: 'Carson', last: 'Jackson' })
