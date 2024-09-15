// components/AddStudentFAB.js
import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { checkInvitationCode } from '@/services/checkInvitationCode'; // This should be your API or service for checking codes

const AddStudentFAB = ({ user, updateUser }) => {
  const [open, setOpen] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const {isValid, studentID} = await checkInvitationCode(invitationCode); // Check if the code is valid
      console.log(isValid, studentID);
      if (isValid) {
        // Add the student to the user's list
        const updatedUser = { ...user, students: [...user.students, studentID] };
        await updateUser(user.id, updatedUser);
        setSnackbarMessage('Student added successfully!');
      } else {
        setSnackbarMessage('Invalid invitation code.');
      }
    } catch (error) {
      setSnackbarMessage('Error adding student.');
    }
    setLoading(false);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Invitation Code"
            type="text"
            fullWidth
            variant="outlined"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddStudentFAB;
