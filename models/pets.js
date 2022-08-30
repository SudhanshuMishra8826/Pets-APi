const mongoose = require('mongoose');

const PetsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    breed: String,
    age: Number,
})

module.exports = mongoose.model('pets', PetsSchema);