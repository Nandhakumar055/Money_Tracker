const Transaction = require('../models/Transaction');

// Add a new transaction linked to a user
exports.addTransaction = async (req, res) => {
    try {
        const { type, category, amount, description } = req.body;
        const newTransaction = new Transaction({
            user: req.user._id,  // Link transaction to the logged-in user
            type,
            category,
            amount,
            description
        });
        const transaction = await newTransaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error adding transaction' });
    }
};

// Get transactions linked to the logged-in user
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
};


// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transaction' });
    }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error updating transaction' });
    }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting transaction' });
    }
};

// Get summary (income, expense, balance)
exports.getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
        const balance = totalIncome - totalExpenses;
        res.status(200).json({ totalIncome, totalExpenses, balance });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving summary' });
    }
};
