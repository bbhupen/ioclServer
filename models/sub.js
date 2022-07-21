const mongoose = require('mongoose')

const subSchema = new mongoose.Schema({
    subscription: {
        type: Object,
        required: true
    }
})

const Sub = mongoose.model('Sub', subSchema)
