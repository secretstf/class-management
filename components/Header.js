import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <AppBar
      position="fixed" // Changed to fixed to float above the page
      sx={{
        backgroundColor: 'transparent', // Makes the header transparent
        boxShadow: 'none', // Removes the shadow
        zIndex: 1300, // Ensures header stays above other content
        top: 0, // Sticks the header to the top of the viewport
        left: 0, // Aligns header to the left
        right: 0, // Ensures the header takes up the full width
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', display: 'flex' }}>
        {/* Title */}
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              color: 'gray',
              backgroundColor: 'white', // Optional: background color for better visibility
              borderRadius: '8px', // Adjust to control the roundness
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Adjust shadow as needed
              padding: '8px 16px', // Optional: padding for better appearance
              display: 'inline-block', // Ensures the box sizes to fit content
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
  );
};

export default Header;
