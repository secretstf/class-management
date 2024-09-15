import React, { useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

const AccountTypeSelector = ({ onSelect }) => {
  const [selection, setSelection] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const timeoutRef = useRef(null);

  const handleSelection = (type) => {
    if (selection === type) {
      // Confirm the selection on the second click
      setConfirm(true);
      if (onSelect) {
        onSelect(type); // Call the callback function to handle the selection
      }
    } else {
      // Set the selection on the first click
      setSelection(type);
      setConfirm(false);

      // Reset the timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setSelection(null); // Reset the selection if not confirmed
      }, 2000); // Timeout duration (e.g., 2 seconds)
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{ backgroundColor: 'inherit', padding: '20px' }}
    >
      <Typography variant="h4" gutterBottom>
        Select Your Account Type
      </Typography>
        <Typography variant="subtitle1" color='grey' maxWidth={'400px'} textAlign={'center'} gutterBottom>
            Our system indicates that your account is not associated with any role. Please select the role that best describes you.
        </Typography>
      <Box
        display="flex"
        flexDirection="row"
        gap="16px"
      >
        <Button
          variant={selection === 'student' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleSelection('student')}
        >
          Student
        </Button>
        <Button
          variant={selection === 'parent' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => handleSelection('parent')}
        >
          Parent
        </Button>
      </Box>
      {confirm && (
        <Typography variant="body1" mt={2}>
          You have confirmed: {selection.charAt(0).toUpperCase() + selection.slice(1)}
        </Typography>
      )}
      {selection && !confirm && (
        <Typography variant="body1" mt={2}>
          Double-click to confirm your selection: {selection.charAt(0).toUpperCase() + selection.slice(1)}
        </Typography>
      )}
    </Box>
  );
};

export{AccountTypeSelector};
