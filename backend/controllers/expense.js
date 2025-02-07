const Expense = require("../models/ExpenseModel");
const User = require("../models/UserModel"); // ✅ Import User model

// ✅ Create Expense (Now Requires `userId`)
exports.addExpense = async (req, res) => {
    const { userId, title, amount, category, date, description } = req.body;

    try {
        if (!userId || !title || !amount || !category || !date || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Ensure the user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Validate date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DDTHH:mm:ss.sssZ" });
        }

        const expense = new Expense({
            userId,
            title,
            amount,
            category,
            description,
            date: parsedDate,
        });

        await expense.save();
        res.status(201).json({ message: "Expense Successfully Added", expense });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Fetch User-Specific Expenses

exports.getExpenses = async (req, res) => {
    const { userId } = req.params; // ✅ Read userId from URL

    try {
        // ✅ Ensure userId is valid
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // ✅ Find expenses by userId
        const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

        // ✅ If no expenses found, return a message
        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found for this user" });
        }

        res.status(200).json(expenses);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Update Expense

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;

    try {
        // ✅ Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid expense ID format" });
        }

        // ✅ Find expense by ID
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // ✅ Validate and parse date if provided
        let parsedDate = expense.date;
        if (date) {
            parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DDTHH:mm:ss.sssZ" });
            }
        }

        // ✅ Allow Partial Updates
        expense.title = title || expense.title;
        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.description = description || expense.description;
        expense.date = parsedDate;

        await expense.save();

        res.status(200).json({ message: "Expense Successfully Updated", expense });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid expense ID format" });
        }

        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense Successfully Deleted", deletedExpense });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
