import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <AppBar position="static" sx={{backgroundColor:'transparent', boxShadow: 'none'}}>
      <Toolbar>
        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="center"
          color="gray"
        >
          Class Management System
        </Typography>

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
