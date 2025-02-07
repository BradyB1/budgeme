const { addExpense, getExpenses, deleteExpense, updateExpense } = require("../controllers/expense")
const { addIncome, getIncomes, deleteIncome, updateIncome } = require("../controllers/incomes")
const { addUser, getUser, deleteUser, updateUser, loginUser, logoutUser } = require("../controllers/user")
const router= require("express").Router()

// income routes
router.post("/add-income", addIncome)
router.get("/get-incomes/:userId", getIncomes)
router.delete("/delete-income/:id", deleteIncome)
router.put("/update-income/:id", updateIncome)

// expense routes
router.post("/add-expense", addExpense);
router.get("/get-expenses/:userId", getExpenses);
router.delete("/delete-expense/:id", deleteExpense);
router.put("/update-expense/:id", updateExpense);

// user routes
router.post("/login", loginUser)
router.post("./logout", logoutUser)
router.post("/add-user", addUser)
router.get("/get-user/:id", getUser)
router.delete("/delete-user/:id", deleteUser)
router.post("/update-user/:id", updateUser)


// ai based routes
// router.get('/financial-tips', )
module.exports = router