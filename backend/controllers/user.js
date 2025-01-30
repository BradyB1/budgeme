const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const validator = require("validator")
const UserSchema = require("../models/UserModel")
const validateUserData = require("../utils/validateUser")

exports.validateUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const errors = validateUserData(username, password, email);
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        res.status(200).json({ message: "Validation successful." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Add User Controller with Hashed Password
exports.addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validate user input
        const errors = validateUserData(username, password, email);
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ username, password: hashedPassword, email });

        await user.save();

        res.status(201).json({ message: "User created successfully.", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user); 
    } catch (error) {
        console.log("❌ Error fetching user: ", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.deleteUser = async(req, res) => {
    const {id} = req.params

    UserSchema.findByIdAndDelete(id).then(()=>{
        res.status(200).json({message: "Account successfully Delete"})
    }).catch(()=>{
        res.status(500).json({message: "Server Error"})
    })


}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;

    try {
        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        //Validate user input
        const errors = validateUserData(username, password, email);
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        //Hash password if updating
        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, password: hashedPassword, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
