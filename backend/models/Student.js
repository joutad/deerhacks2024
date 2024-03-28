const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
    // Student-specific fields, if any
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false,
    }],
    classroomInvitations:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false,
    }]
});

// Inherit from User schema
studentSchema.add(User.schema);

module.exports = mongoose.model('Student', studentSchema);
