// src/pages/ViewAllMonths.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent, Button, Container } from "@mui/material";

export default function ViewAllMonths() {
  const [months, setMonths] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get("https://accounts-book-ql.vercel.app/api/month/all");
        setMonths(response.data);
      } catch (error) {
        setError("Failed to fetch months.");
      }
    };
    fetchMonths();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/months/${id}`);
      setMonths(months.filter((month) => month._id !== id)); // Remove deleted month from the list
    } catch (error) {
      setError("Error deleting month.");
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          View All Months
        </Typography>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {months.map((month) => (
            <Grid item xs={12} sm={6} md={4} key={month._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{month.monthName} </Typography>
                  <Typography variant="h6">Year: {month.year}</Typography>
                  <Typography variant="body2">Format: {month.monthFormat}</Typography>
                  <Typography variant="body2">Days: {month.daysInMonth}</Typography>
                </CardContent>
                <Box sx={{ padding: 1 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(month._id)}
                  >
                    Delete Month
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
