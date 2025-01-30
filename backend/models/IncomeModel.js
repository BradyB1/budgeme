const mongoose = require("mongoose")

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    amount: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        maxLength: 30,
        require: true, 
        trim: true
    },
    type: {
        type: String,
        default: "Income"
    },
    date: {
        type: Date,
        require: true,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Income", IncomeSchema)