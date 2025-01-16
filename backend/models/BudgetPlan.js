const mongoose = require('mongoose');

const budgetPlanSchema = new mongoose.Schema({
  month: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Month', // Reference to the Month model
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  revenues: [
    {
      transactionName: { type: String, required: true },
      amount: { type: Number, required: true },
      relatedDocs: { type: String }, // Link to related documents
      assignedPartner: { type: String }, // Assigned partner name
    },
  ],
  expenses: [
    {
      transactionName: { type: String, required: true },
      amount: { type: Number, required: true },
      relatedDocs: { type: String }, // Link to related documents
      assignedPartner: { type: String }, // Assigned partner name
    },
  ],
  profitLoss: {
    type: Number,
    default: 0, // Initially set to 0
  },
}, { timestamps: true });

budgetPlanSchema.methods.calculateProfitLoss = function () {
  const totalRevenue = this.revenues.reduce((acc, revenue) => acc + revenue.amount, 0);
  const totalExpense = this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  this.profitLoss = totalRevenue - totalExpense;
};

const BudgetPlan = mongoose.model('BudgetPlan', budgetPlanSchema);

module.exports = BudgetPlan;
