const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("WUH OH LOOKS LIKE SOMETHING WENT WRONG WITH THE MONGOOSE")
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'John',
        last: 'Doe',
    })
    u.addresses.push({
        street: '123 Litter Collector Drive',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '78 Turkey ln',
            city: 'Atlanta',
            state: 'GA',
            country: 'USA'
        }

    )
    const res = await user.save()
    console.log(res);
}

addAddress('67c352f05dbf318272c6ef7a');