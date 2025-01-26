const express = require("express");
const { createLoan, getLoans, getLoanById, updateLoanStatus } = require("../controllers/loanController");
const router = express.Router();

// Routes
router.post("/", createLoan); // Submit a loan application
router.get("/", getLoans); // Get all loan applications
router.get("/:id", getLoanById); // Get loan by ID
router.put("/:id", updateLoanStatus); // Update loan status

module.exports = router;
