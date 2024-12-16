import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.post(
        "https://accounts-book-ql.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      console.log("Login successful:", user);
      localStorage.setItem("token", token); // Save token in local storage
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" marginTop={1}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
        </form>
        <Typography textAlign="center" marginTop={2}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
