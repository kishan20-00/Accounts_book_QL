const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Default route for Vercel
app.get('/', (req, res) => {
  res.send('Hello to Vercel!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Export the app (for Vercel compatibility)
module.exports = app;

// Local server for development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000; // Default port for local development
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
