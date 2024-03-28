const Class = require('../models/Class');
const Teacher = require('../models/Teacher');

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

exports.getClass = async (req, res) => {
    try {
        // const {}//continue;
        const { classId } = req.params;
        console.log(classId);
        const someClass = await Class.findById(classId);
        res.status(200).json({ message: someClass });
    } catch (error) {
        console.error('Error getting class:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.taughtBy = async (req, res) => {
    try {
        const teacher = await Teacher.findOne( { email: req.query['teacher'] } );
        const classes = await Class.find( { teacher } );
        res.status(200).json(classes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. could not find teacher.' });
    }
}
