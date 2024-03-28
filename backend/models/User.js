const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        unique: false
    }
}, {
    collection: 'accounts',
});

module.exports = mongoose.model('User', userSchema);
