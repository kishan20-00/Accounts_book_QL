import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import videos from './max.mp4';

export default function WaitingPage() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Set a timer for 5 seconds to show the optional message
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000); // Adjust time (in milliseconds) as needed

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black", // Ensures a black background
      }}
    >
      {/* Full-Screen Video */}
      {!showMessage && (
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw", // Widened the video to 120% of viewport width
            height: "100%",
            objectFit: "cover", // Ensures the video covers the screen without stretching
            zIndex: 0,
          }}
        >
          <source src={videos} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Optional Message */}
      {showMessage && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1, // Ensures the message appears above the video
            color: "#fff",
            backgroundColor: "black", // Ensures full-screen message
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dark overlay
              borderRadius: "8px",
            }}
          >
            Please wait while we process your request...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
