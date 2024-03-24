const Class = require('../models/Class');

// Controller functions
exports.createClass = async (req, res) => {
    try {
        const { subject, code, number, name, description, teacher } = req.body;
        const newClass = new Class({ subject, code, number, name, description, teacher });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error getting classes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add more controller functions as needed
