import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, Grow } from "@mui/material";
import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, use } from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {isSignedIn, user, isLoaded} = useUser();
  const [redirection, setRedirection] = useState({});

  // Handle click event for the title button
  const handleClick = (event) => {
    if (isSignedIn && isLoaded) {
      setAnchorEl(event.currentTarget);
    }
    else {
      window.location.href = '/';
    }
  };

  // Handle closing of the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      setRedirection({"Dashboard": '/dashboard' });
      if (user.publicMetadata.admin) {
        setRedirection({"Dashboard": '/dashboard', "Admin": '/admin'});
      }
    }
  }, [isSignedIn, user, isLoaded]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          zIndex: 1300,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
          {/* Title with clickable button for dropdown */}
          <Box>
            <Typography
              onClick={handleClick} // Trigger menu when clicked
              variant="h6"
              component="div"
              sx={{
                cursor: "pointer", // Make it clear it's clickable
                textAlign: "center",
                color: "gray",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "8px 16px",
                display: "inline-block",
              }}
            >
              Class Management System
            </Typography>
          </Box>

          {/* Authentication Buttons */}
          <Box>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button color="primary">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sliding Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow} // Sliding effect
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px", // Make the menu have rounded corners
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Add shadow for depth
          },
        }}
      >
        {Object.keys(redirection).map((key) => (
          <MenuItem key={key} onClick={() => {window.location.href = redirection[key]}}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Header;
