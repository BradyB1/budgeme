const ExpenseSchema = require("../models/ExpenseModel")

//Create Expenses
exports.addExpense = async(req, res) =>{
    const {title, amount, category, date, description} = req.body

    const Expense = ExpenseSchema({
        title,
        amount, 
        category,
        description,
        date
    })

    try {
        if(!title || !amount || !category || !date || !description){
            res.status(400).json({message : "All fields are required"})
        }
        if (amount < 0 || !amount === 'number'){
            res.status(400).json({message: "Amount must be a positive number "})
        }
        await Expense.save()
        res.status(200).json({message: "Expense Successfully Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

// Read Expenses
exports.getExpenses = async(req, res) =>{
    try {
        const Expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(Expenses)
        console.log(Expenses)    
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
    
    
}

//Update Expenses
exports.updateExpense = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL parameters
    const { title, amount, category, date, description } = req.body; // Extract the updated fields from the request body

    try {
        // Validate required fields
        if (!title || !amount || !category || !date || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate amount
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        // Find and update the income document
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id, // The ID of the document to update
            { title, amount, category, date, description }, // The updated fields
            { new: true, runValidators: true } // Options: return the updated document and run schema validators
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense Successfully Updated", updatedExpense });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//Delete Expenses
exports.deleteExpenses = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure that the ID is valid
        if (!id) {
            return res.status(400).json({ message: "Expense ID is required" });
        }

        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense Successfully Deleted", deletedExpense });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




