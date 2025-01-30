const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require("bcrypt")
const saltRounds = 10;



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true, 
        required: true
    },  
    password: {
        type: String,
        maxLength: 100,
        trim: true,
        required: true,
        
    },
    email: {
        type: String, 
        time: true,
        require: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid Email format"
        }
    }

}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    if(this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(saltRounds)
        this.password = await bcrypt.hash(his.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)