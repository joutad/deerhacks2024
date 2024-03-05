// models/Teacher.js
const mongoose = require('mongoose');
const CommonFields = require('./CommonFields');

const teacherSchema = new mongoose.Schema({
    //extend
});

module.exports = CommonFields.discriminator('Teacher', teacherSchema);
