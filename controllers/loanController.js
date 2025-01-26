const Loan = require("../models/loan");

// Submit a loan application
const createLoan = async (req, res) => {
  try {
    const { userId, loanType, amount, duration } = req.body;

    if (!userId || !loanType || !amount || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const loan = new Loan({
      userId,
      loanType,
      amount,
      duration,
    });

    const savedLoan = await loan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(500).json({ message: "Error submitting loan application", error });
  }
};

// Get all loan applications
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loans", error });
  }
};

// Get loan by ID
const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan", error });
  }
};

// Update loan status
const updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: "Error updating loan status", error });
  }
};

module.exports = { createLoan, getLoans, getLoanById, updateLoanStatus };
