const mongoose = require('mongoose');
const User = require('./User');

const teacherSchema = new mongoose.Schema({
    // Teacher-specific fields, if any
});

// Inherit from User schema
teacherSchema.add(User.schema);

module.exports = mongoose.model('Teacher', teacherSchema);
