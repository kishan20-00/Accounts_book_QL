import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

export default function CreateMonth() {
  const [monthName, setMonthName] = useState("");
  const [monthFormat, setMonthFormat] = useState("");
  const [year, setYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://accounts-book-ql.vercel.app/api/month/add", {
        monthName,
        monthFormat,
        year,
        daysInMonth,
      });
      setMessage(response.data.message);

      // Clear form after successful submission
      setMonthName("");
      setMonthFormat("");
      setYear("");
      setDaysInMonth("");
    } catch (error) {
      setMessage("Error creating month: " + error.response?.data?.message);
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Create a New Month
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Month Name"
            value={monthName}
            onChange={(e) => setMonthName(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Month Format (e.g., 01 or Jan)"
            value={monthFormat}
            onChange={(e) => setMonthFormat(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Days in Month"
            type="number"
            value={daysInMonth}
            onChange={(e) => setDaysInMonth(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Create Month
          </Button>
        </form>
        {message && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
