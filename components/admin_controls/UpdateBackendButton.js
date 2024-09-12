import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { updateUsers } from "@/services/updateUsers";

const UpdateBackendButton = ({ originalUsers, updatedUsers, changeLog, clearLogs}) => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    // Open the modal dialog when the button is clicked
    setOpen(true);
  };

  const handleClose = () => {
    // Close the modal without saving
    setOpen(false);
  };

  const handleSave = () => {
    // Call onClick function to update the backend
    updateUsers(updatedUsers, changeLog);
    clearLogs();
    setOpen(false); // Close the modal after saving
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
        sx={{ fontSize: "1.2em", textTransform: "none" }}
      >
        Update Backend
      </Button>

      {/* Modal/Dialog for showing the changes */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The following changes will be applied to the backend:
          </DialogContentText>

          {/* List of changes */}
          <List>
            {Object.keys(changeLog).map((userID, index) => (
              <ListItem key={index}>
                <ListItemText>
                  {originalUsers[userID].fullName}: {changeLog[userID]}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { UpdateBackendButton };
