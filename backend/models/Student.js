// models/Student.js
const mongoose = require('mongoose');
const CommonFields = require('./CommonFields');

const studentSchema = new mongoose.Schema({
    //extend
});

module.exports = CommonFields.discriminator('Student', studentSchema);
