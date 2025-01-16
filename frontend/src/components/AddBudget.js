import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const CreateBudgetPlan = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [revenues, setRevenues] = useState([
    { transactionName: "", amount: "", relatedDocs: "", assignedPartner: "" },
  ]);
  const [expenses, setExpenses] = useState([
    { transactionName: "", amount: "", relatedDocs: "", assignedPartner: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch months from the backend
  useEffect(() => {
    const fetchMonths = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://accounts-book-ql.vercel.app/api/month/all");
        setMonths(response.data); // Assuming the response contains an array of months
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching months");
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, []);

  // Handle input changes for revenues and expenses
  const handleChange = (index, type, field, value) => {
    const updatedData = type === "revenue" ? [...revenues] : [...expenses];
    updatedData[index][field] = value;
    type === "revenue" ? setRevenues(updatedData) : setExpenses(updatedData);
  };

  // Add a new transaction (either revenue or expense)
  const handleAddTransaction = (type) => {
    if (type === "revenue") {
      setRevenues([
        ...revenues,
        { transactionName: "", amount: "", relatedDocs: "", assignedPartner: "" },
      ]);
    } else {
      setExpenses([
        ...expenses,
        { transactionName: "", amount: "", relatedDocs: "", assignedPartner: "" },
      ]);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://accounts-book-ql.vercel.app/api/budget/budget", {
        month,
        year,
        revenues,
        expenses,
      });
      setSuccess("Budget plan created successfully");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Error creating budget plan");
      setSuccess("");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create Budget Plan
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      <form onSubmit={handleSubmit}>
        {/* Month Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            label="Month"
            required
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              months.map((monthRecord) => (
                <MenuItem key={monthRecord._id} value={monthRecord.monthName}>
                  {monthRecord.monthName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Year Input */}
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        {/* Revenues Section */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Revenues
        </Typography>
        {revenues.map((revenue, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              label="Transaction Name"
              value={revenue.transactionName}
              onChange={(e) =>
                handleChange(index, "revenue", "transactionName", e.target.value)
              }
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Amount"
              value={revenue.amount}
              onChange={(e) =>
                handleChange(index, "revenue", "amount", e.target.value)
              }
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Related Docs"
              value={revenue.relatedDocs}
              onChange={(e) =>
                handleChange(index, "revenue", "relatedDocs", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Assigned Partner"
              value={revenue.assignedPartner}
              onChange={(e) =>
                handleChange(index, "revenue", "assignedPartner", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
        <Button onClick={() => handleAddTransaction("revenue")}>Add Revenue</Button>

        {/* Expenses Section */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Expenses
        </Typography>
        {expenses.map((expense, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              label="Transaction Name"
              value={expense.transactionName}
              onChange={(e) =>
                handleChange(index, "expense", "transactionName", e.target.value)
              }
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Amount"
              value={expense.amount}
              onChange={(e) =>
                handleChange(index, "expense", "amount", e.target.value)
              }
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Related Docs"
              value={expense.relatedDocs}
              onChange={(e) =>
                handleChange(index, "expense", "relatedDocs", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Assigned Partner"
              value={expense.assignedPartner}
              onChange={(e) =>
                handleChange(index, "expense", "assignedPartner", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
        <Button onClick={() => handleAddTransaction("expense")}>Add Expense</Button>

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Create Budget Plan
        </Button>
      </form>
    </Box>
  );
};

export default CreateBudgetPlan;
