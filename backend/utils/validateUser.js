const validator = require("validator");

const validateUserData = (username, password, email) => {
    const errors = [];

    // Check if all fields exist
    if (!username || !password || !email) {
        errors.push("All fields are required.");
    }

    //Username validation
    if (typeof username !== "string") {
        errors.push("Username must be a string.");
    }
    if (username.length < 3) {
        errors.push("Username must be at least 3 characters.");
    }
    if (username.length > 15) {
        errors.push("Username cannot be greater than 15 characters.");
    }

    // Password validation
    if (typeof password !== "string") {
        errors.push("Password must be a string.");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }
    if (password.length > 30) {
        errors.push("Password cannot be greater than 30 characters.");
    }

    // Email validation
    if (!validator.isEmail(email)) {
        errors.push("Invalid email format.");
    }

    return errors;
};

module.exports = validateUserData;
