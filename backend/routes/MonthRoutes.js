const express = require('express');
const Month = require('../models/Month'); // Import the month model
const router = express.Router();

// Add a new month
router.post('/add', async (req, res) => {
  const { monthName, monthFormat, year, daysInMonth } = req.body;

  try {
    // Check if the month for the given year already exists
    const existingMonth = await Month.findOne({ monthName, year });
    if (existingMonth) {
      return res.status(400).json({ message: 'Month already exists for this year.' });
    }

    // Create a new month
    const newMonth = new Month({
      monthName,
      monthFormat,
      year,
      daysInMonth,
    });

    await newMonth.save();
    res.status(201).json({ message: 'Month added successfully', newMonth });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// View all months
router.get('/all', async (req, res) => {
  try {
    const months = await Month.find();
    res.json(months);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a month
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const monthToDelete = await Month.findByIdAndDelete(id);
    if (!monthToDelete) {
      return res.status(404).json({ message: 'Month not found' });
    }

    res.json({ message: 'Month deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
