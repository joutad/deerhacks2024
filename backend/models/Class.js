const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher', // Reference to the User schema for the teacher
        required: true
    }
}, {
    collection: 'classes'
});

classSchema.index({ subject: 1, code: 1, number: 1 }, { unique: true }); // Ensure uniqueness of subject, code, and number combination

module.exports = mongoose.model('Class', classSchema);
