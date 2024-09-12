import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { useUser, SignOutButton } from "@clerk/nextjs";

const Dashboard = () => {
  const { user } = useUser(); // Access user details from Clerk

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
    >
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="h6" gutterBottom>
        Welcome, {user?.fullName || 'User'}!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Feature 1
              </Typography>
              <Typography variant="body2">
                Description of Feature 1.
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Feature 2
              </Typography>
              <Typography variant="body2">
                Description of Feature 2.
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Feature 3
              </Typography>
              <Typography variant="body2">
                Description of Feature 3.
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <SignOutButton>
          <Button variant="outlined" color="secondary">
            Sign Out
          </Button>
        </SignOutButton>
      </Box>
    </Box>
  );
};

export default Dashboard;
