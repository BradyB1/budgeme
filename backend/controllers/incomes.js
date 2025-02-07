const Income = require("../models/IncomeModel");
const User = require("../models/UserModel")

exports.addIncome = async (req, res) => {
    console.log("Received income data:", req.body);
    const { userId, title, amount, category, date, description } = req.body;

    try {
        if (!userId || !title || !amount || !category || !date || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate userId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        // Ensure user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the date is valid
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Create the income
        const income = new Income({
            userId,
            title,
            amount,
            category,
            description,
            date: parsedDate, // Ensure correct Date object
        });

        await income.save();
        res.status(201).json({ message: "Income Successfully Added", income });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Fetch Only User's Incomes
exports.getIncomes = async (req, res) => {
    const { userId } = req.params; // ✅ Get userId from URL parameters

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const incomes = await Income.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};



// Update Incomes

exports.updateIncome = async (req, res) => {
    const { id } = req.params; // Get income ID from URL
    const { title, amount, category, date, description } = req.body;

    try {
        // ✅ Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid income ID format" });
        }

        // ✅ Ensure the income exists
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        // ✅ Ensure the date is valid
        let parsedDate = income.date;
        if (date) {
            parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DDTHH:mm:ss.sssZ" });
            }
        }

        // ✅ Update income fields (only if provided)
        income.title = title || income.title;
        income.amount = amount || income.amount;
        income.category = category || income.category;
        income.description = description || income.description;
        income.date = parsedDate;

        await income.save();

        res.status(200).json({ message: "Income Successfully Updated", income });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




// Delete Incomes

exports.deleteIncome = async (req, res) => {
    const { id } = req.params; // ✅ Get income ID from URL

    try {
        // ✅ Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid income ID format" });
        }

        // ✅ Check if the income exists
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        // ✅ Delete the income
        await Income.findByIdAndDelete(id);

        res.status(200).json({ message: "Income Successfully Deleted" });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


