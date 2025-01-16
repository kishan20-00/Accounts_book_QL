const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema(
  {
    monthName: {
      type: String,
      required: true, // Example: "January"
    },
    monthFormat: {
      type: String,
      required: true, // Example: "01" or "Jan"
    },
    year: {
      type: Number,
      required: true, // Example: 2025
    },
    daysInMonth: {
      type: Number,
      required: true, // Example: 31 (number of days in the month)
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Month = mongoose.model('Month', monthSchema);

module.exports = Month;
