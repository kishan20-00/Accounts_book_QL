import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function UserPermissions() {
  return (
    <Container>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4">User Permissions</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Here, you can manage user roles and permissions.
        </Typography>

        {/* Example Button for User Permissions Action */}
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Manage Users
        </Button>
      </Box>
    </Container>
  );
}
