const mongoose = require('mongoose');

const commonFieldsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('CommonFields', commonFieldsSchema);
