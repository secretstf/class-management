import { Box, Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const AdminDeleteButton = ({ userID, deleteFunction }) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteClick = (userID, deleteFunction) => {
    if (clicked) {
      deleteFunction(userID);
      setClicked(false);
      setOpen(false);
    } else {
      setClicked(true);
      setOpen(true);
    }
  };

  return (
    <div id={`delete-${userID}`}> 
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant={clicked ? "contained" : "outlined"}
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deleteClick(userID, deleteFunction)}
          size="small"
        >
          Delete
        </Button>
      </Box>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClick={() => setOpen(false)}
        >
            <Alert severity="info" sx={{ width: "100%" }}>
                Click again to delete user
            </Alert>
        </Snackbar>
    </div>
  );
};

export { AdminDeleteButton };
