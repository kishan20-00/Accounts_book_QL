import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Grid,
  CircularProgress,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";

export default function UserPermissions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(""); // To edit the request status
  const [updateError, setUpdateError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setRequestStatus(user.request); // Set the current request status
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setUpdateError("");
  };

  const handleUpdateRequest = async () => {
    if (!selectedUser) return;

    setUpdating(true);
    setUpdateError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUpdateError("No token found. Please log in.");
        setUpdating(false);
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/auth/users/${selectedUser._id}/request`,
        { request: requestStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id
            ? { ...user, request: response.data.user.request }
            : user
        )
      );

      setModalOpen(false); // Close the modal
    } catch (err) {
      setUpdateError("Failed to update request. " + (err.response?.data?.message || err.message));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        User Permissions
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center" variant="body1">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {user.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Request: {user.request}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleManagePermissions(user)}
                  >
                    Manage Permissions
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for managing permissions */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Manage Permissions for {selectedUser?.username}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: {selectedUser?.email}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Role: {selectedUser?.user}
          </Typography>
          <TextField
            fullWidth
            select
            label="Request Status"
            value={requestStatus}
            onChange={(e) => setRequestStatus(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          {updateError && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {updateError}
            </Typography>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={handleUpdateRequest}
              variant="contained"
              color="primary"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </Button>
            <Button onClick={handleCloseModal} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
