const User = require('../models/User');

//Create
exports.createUser = async (req, res) => {
    try {
        const { name, email, userType } = req.body;
        const user = new User({ name, email, userType });
    
        await user.save();
    
        res.status(201).json({ message: `${userType} ${name} (${email}) created successfully` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Read
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json({ message: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: could not find user! '});
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        console.log(req.query)
        const { email } = req.query;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: user });
        }

        res.status(200).json({ message: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: could not find user by email' });
    }
}

//Update
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, userType } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, userType }, { new: true });

        res.status(200).json({ message: `User ${updatedUser.email} updated successfully`, user: updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: could not update user!' });
    }
}

//Delete
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, userType } = req.body;

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: `${userType} ${name} (${email}) deleted successfully!` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: could not delete user!' });
    }
}
