import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none'}}> 
      <Toolbar sx={{justifyContent: 'space-between', display:'flex'}}>
        {/* Title */}
        <Box > 
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
          {/* Show UserButton when the user is signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Show SignInButton when the user is signed out */}
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
