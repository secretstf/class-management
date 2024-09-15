// components/ParentDashboard.js

import { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert, Card, Divider } from "@mui/material";
import ParentDashboardInfo from "./parent/ParentDashboardInfo"; // Optional, if you have additional info to show
import AddStudentFAB from "./parent/AddStudentFAB";

const ParentDashboard = ({ user, updateUser }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [students, setStudents] = useState([]);

  // Check if students array is empty
  const checkStudents = async () => {
    if (user.students.length === 0) {
      setShowPrompt(true);
      setOpenSnackbar(true);
      return;
    }

    // get student data
    const studentData = await Promise.all(
      user.students.map(async (studentId) => {
        const response = await fetch(`/api/firestoreUser?id=${studentId}`);
        const data = await response.json();
        return data;
      })
    );

    setStudents(studentData);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Call checkStudents function when the component mounts
  useEffect(() => {
    checkStudents();
  }, [user.students]);

  return (
    <Box p={4} width={"100%"} height={"100%"} display={'flex'} flexDirection={'column'}>
      <Typography variant="h4" gutterBottom>
        Parent Dashboard
      </Typography>
      {showPrompt && (
        <Box
          p={1}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          boxShadow={2}
          mb={2}
        >
          <Typography variant="body1">
            Your student list is currently empty. Click the "Add" button on the
            right to add a student by providing their invitation code.
          </Typography>
        </Box>
      )}

      {students.length > 0 && (
        <Box pb={1}>
        <Typography variant="body1" textAlign={"left"}>
          Click on a student to view more details
        </Typography>
        <Divider />
      </Box >
      )}

      {/* Display student data here */}
      {students.map((student) => (
        <Box p={1}>
          <ParentDashboardInfo student={student} />
        </Box>
      ))}

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
      <AddStudentFAB user={user} updateUser={updateUser} />
    </Box>
  );
};

export default ParentDashboard;
