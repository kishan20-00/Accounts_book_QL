import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";

const ViewBudgetPlans = () => {
  const [budgetPlans, setBudgetPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgetPlans = async () => {
      try {
        const response = await axios.get("https://accounts-book-ql.vercel.app/api/budget");
        setBudgetPlans(response.data);
      } catch (error) {
        console.error("Error fetching budget plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://accounts-book-ql.vercel.app/api/budget/${id}`);
      setBudgetPlans(budgetPlans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error("Error deleting budget plan", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        View All Budget Plans
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {budgetPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Month: {plan.month}</Typography>
                <Typography>Year: {plan.year}</Typography>
                <Typography>Profit/Loss: {plan.profitLoss}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(plan._id)}
                  sx={{ marginTop: 1 }}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewBudgetPlans;
