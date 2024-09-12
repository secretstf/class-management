import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

const LandingPage = () => {
  const { isLoading, user, isSignedIn } = useUser();

  return (
    <Box
      sx={{
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "inherit",
      }}
    >
      {/* Heading */}
      {isLoading && (
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Loading...
        </Typography>
      )}

      {isSignedIn && (
        <>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome back, {user.firstName}!
          </Typography>
          <Typography
            variant="body1"
            component="p"
            align="center"
            sx={{ maxWidth: "600px", marginBottom: "32px" }}
          >
            To get started, click the button below to go to your dashboard!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ padding: "12px 24px", borderRadius: "24px" }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Go to Dashboard
          </Button>
        </>
      )}

      {!isSignedIn && !isLoading && (
        <>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome to Class Management System
          </Typography>

          <Typography
            variant="body1"
            component="p"
            align="center"
            sx={{ maxWidth: "600px", marginBottom: "32px" }}
          >
            To get started, sign in to your account and head to your dashboard!
          </Typography>
          <SignInButton>
            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ padding: "12px 24px", borderRadius: "24px" }}
                onClick={() => console.log("Get Started!")}
            >
                Sign In
            </Button>
          </SignInButton>
        </>
      )}
    </Box>
  );
};

export default LandingPage;
