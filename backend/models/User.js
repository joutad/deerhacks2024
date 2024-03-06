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
        enum: ['student', 'teacher'],
        required: true
    }
}, {
    collection: 'accounts',
});

module.exports = mongoose.model('User', userSchema);
