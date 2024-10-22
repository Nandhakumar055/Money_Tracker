const express = require('express');
const {
    addTransaction, getTransactions, getTransactionById,
    updateTransaction, deleteTransaction, getSummary
} = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Protect all transaction routes
router.post('/transactions', protect, addTransaction);
router.get('/transactions', protect, getTransactions);
router.get('/transactions/:id', protect, getTransactionById);
router.put('/transactions/:id', protect, updateTransaction);
router.delete('/transactions/:id', protect, deleteTransaction);
router.get('/summary', protect, getSummary);

module.exports = router;
