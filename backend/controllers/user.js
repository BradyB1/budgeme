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




exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return userId if login is successful
        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.logoutUser = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};

exports.addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hashedPassword, email });
        await user.save();

        res.status(201).json({ message: "User created successfully.", userId: user._id }); 
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
        console.log("Error fetching user: ", error);
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
    const { username, email, password } = req.body;

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find the user first
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Prepare updated fields (only update what is provided)
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long." });
            }
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        res.status(200).json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
