import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const UpdateBudgetPlan = () => {
  const { id } = useParams();
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBudgetPlan = async () => {
      try {
        const response = await axios.get(`https://accounts-book-ql.vercel.app/api/budget/${id}`);
        setBudgetPlan(response.data);
        setRevenues(response.data.revenues);
        setExpenses(response.data.expenses);
      } catch (error) {
        setError("Error fetching budget plan");
      }
    };

    fetchBudgetPlan();
  }, [id]);

  // Similar handleChange and handleAddTransaction as CreateBudgetPlan.js for updating transactions

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://accounts-book-ql.vercel.app/api/budget/${id}`, {
        revenues,
        expenses,
      });
      setSuccess("Budget plan updated successfully");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Error updating budget plan");
      setSuccess("");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Budget Plan
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      {budgetPlan && (
        <form onSubmit={handleSubmit}>
          {/* Similar to CreateBudgetPlan.js, use revenues and expenses state here */}
        </form>
      )}
    </Box>
  );
};

export default UpdateBudgetPlan;
