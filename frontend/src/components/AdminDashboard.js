import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function AdminDashboard() {
  const [open, setOpen] = useState(true); // Sidebar is open by default

  // Sidebar width
  const drawerWidth = 240;

  // Toggle sidebar open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box>
          <List>
            <ListItem>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
            <Divider />
            {/* User Permissions Button */}
            <ListItem button component={Link} to="/user-permissions">
              <ListItemText primary="User Permissions" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
          ml: open ? `${drawerWidth}px` : 0, // Margin left adjusts based on sidebar state
          transition: "margin 0.3s ease-in-out",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            ml: open ? `${drawerWidth}px` : 0,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Add spacing below AppBar */}
        <Toolbar />

        {/* Main content area */}
        <Container>
          <Typography variant="h4" sx={{ marginTop: 3 }}>
            Welcome to the Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Here you can manage users, settings, and more.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
