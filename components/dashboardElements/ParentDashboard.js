// components/ParentDashboard.js

import { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import ParentDashboardInfo from "./ParentDashboardInfo"; // Optional, if you have additional info to show
import AddStudentFAB from "./AddStudentFAB";

const ParentDashboard = ({ user }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Check if students array is empty
  const checkStudents = () => {
    if (user.students.length === 0) {
      setShowPrompt(true);
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddStudentClick = () => {
    // Handle the logic for adding a student
  };

  // Call checkStudents function when the component mounts
  useEffect(() => {
    checkStudents();
  }, [user.students]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      {showPrompt && (
        <Box
          p={2}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          boxShadow={2}
          mb={2}
        >
          <Typography variant="body1">
            Your student list is currently empty. Click the "Add" button below
            to invite a student and provide their invitation code.
          </Typography>
        </Box>
      )}
      <ParentDashboardInfo />
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStudentClick}
        >
          Add Student
        </Button>
      </Box>
      {/* Snackbar for user feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          Your student list is empty. Please add a student by clicking the
          button below.
        </Alert>
      </Snackbar>

      {/* Floating action button to add a student */}
      <AddStudentFAB />
    </Box>
  );
};

export default ParentDashboard;
