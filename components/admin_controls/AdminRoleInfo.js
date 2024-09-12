import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  DialogActions
} from "@mui/material";
import { Update, UpdateDisabledRounded } from "@mui/icons-material";

const AdminRoleInfo = ({ user, updateRoles }) => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState(user.roles);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    handleClose();
    updateRoles(user, roles);
  };

  return (
    <>
      <Box
        justifyContent={"space-between"}
        px={2}
        py={1}
        flexDirection={"row"}
        display={"flex"}
      >
        <Typography>
          <strong>Roles:</strong>{" "}
          {Object.keys(roles)
            .filter((role) => user.roles[role])
            .map((role) => role.charAt(0).toUpperCase() + role.slice(1))
            .sort()
            .join(", ")}
        </Typography>
        <Button onClick={handleClickOpen}>Change Role</Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the role for this user.
          </DialogContentText>

          {/* Add your role selection here */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Role:</FormLabel>
            <FormGroup>
              {Object.keys(roles).sort().map((role) => (
                <FormControlLabel
                  key={role}
                  control={
                    <Checkbox
                      checked={roles[role]}
                      onChange={handleChange}
                      name={role}
                    />
                  }
                  label={role.charAt(0).toUpperCase() + role.slice(1)}
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color='primary'>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AdminRoleInfo };
