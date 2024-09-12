// components/AddStudentButton.js
import React, { useState } from "react";
import {
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddStudentButton = ({ onAddStudent }) => {
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: "", lastName: "" });

  // Handle dialog open/close
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input changes for first and last names
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the new student
  const handleSubmit = () => {
    onAddStudent(newStudent);  // Call the function passed in props
    setNewStudent({ firstName: "", lastName: "" });
    handleClose();
  };

  return (
    <>
      {/* Tooltip wraps the floating action button */}
      <Tooltip title="Add Student" arrow>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Dialog for adding a new student */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the student's first name and last name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={newStudent.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={newStudent.lastName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { AddStudentButton };