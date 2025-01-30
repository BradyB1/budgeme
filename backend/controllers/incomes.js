const IncomeSchema = require("../models/IncomeModel")


// Create Incomes
exports.addIncome = async(req, res) =>{
    const {title, amount, category, date, description} = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: "Income Successfully Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

// Read Incomes
exports.getIncomes = async(req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
        console.log(incomes)    
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
    
    
}

// Update Incomes
exports.updateIncome = async (req, res) => {
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
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id, // The ID of the document to update
            { title, amount, category, date, description }, // The updated fields
            { new: true, runValidators: true } // Options: return the updated document and run schema validators
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income Successfully Updated", updatedIncome });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



// Delete Incomes
exports.deleteIncomes = async(req,res)=>{
    const {id} = req.params
    IncomeSchema.findByIdAndDelete(id).then(()=>{
        res.status(200).json({message: "Income Sucessfully Deleted."})
    }).catch(()=>{
        res.status(500).json({message: "Server Error."})
    })
}


