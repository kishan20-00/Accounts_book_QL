const express = require('express');
const BudgetPlan = require('../models/BudgetPlan');
const Month = require('../models/Month'); // Assuming you have a Month model for month data
const router = express.Router();

// Add a new budget plan for a specific month
router.post('/budget', async (req, res) => {
  const { month, year, revenues, expenses } = req.body;

  try {
    const foundMonth = await Month.findById(month); // Ensure the month exists
    if (!foundMonth) return res.status(404).json({ message: 'Month not found' });

    // Calculate total revenue and total expenses
    const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Create a new budget plan
    const newBudgetPlan = new BudgetPlan({
      month,
      year,
      revenues,
      expenses,
      profitLoss: totalRevenue - totalExpense, // Calculate profit/loss on creation
    });

    await newBudgetPlan.save();
    res.status(201).json({ message: 'Budget Plan created successfully', budgetPlan: newBudgetPlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// View all budget plans
router.get('/budget', async (req, res) => {
  try {
    const budgetPlans = await BudgetPlan.find().populate('month'); // Populate month to show month details
    res.json(budgetPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// View a specific budget plan by ID
router.get('/budget/:id', async (req, res) => {
  try {
    const budgetPlan = await BudgetPlan.findById(req.params.id).populate('month');
    if (!budgetPlan) return res.status(404).json({ message: 'Budget plan not found' });

    res.json(budgetPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a budget plan (e.g., add or remove revenues/expenses)
router.put('/budget/:id', async (req, res) => {
  const { revenues, expenses } = req.body;

  try {
    const budgetPlan = await BudgetPlan.findById(req.params.id);
    if (!budgetPlan) return res.status(404).json({ message: 'Budget plan not found' });

    // Update revenues and expenses
    budgetPlan.revenues = revenues || budgetPlan.revenues;
    budgetPlan.expenses = expenses || budgetPlan.expenses;

    // Calculate total revenue and total expenses
    const totalRevenue = budgetPlan.revenues.reduce((acc, revenue) => acc + revenue.amount, 0);
    const totalExpense = budgetPlan.expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Recalculate profit/loss
    budgetPlan.profitLoss = totalRevenue - totalExpense;

    // Save the updated budget plan
    await budgetPlan.save();

    res.json({ message: 'Budget plan updated successfully', budgetPlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a budget plan
router.delete('/budget/:id', async (req, res) => {
  try {
    const budgetPlan = await BudgetPlan.findByIdAndDelete(req.params.id);
    if (!budgetPlan) return res.status(404).json({ message: 'Budget plan not found' });

    res.json({ message: 'Budget plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
