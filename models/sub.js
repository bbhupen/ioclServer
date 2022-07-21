const mongoose = require('mongoose')

const subSchema = new mongoose.Schema({
    subcription: {
        type: Object,
        required: true
    }
})

const Sub = mongoose.model('Sub', subSchema)
