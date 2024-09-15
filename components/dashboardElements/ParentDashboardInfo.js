import { Box, Typography } from '@mui/material';

const ParentDashboardInfo = () => {
  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={2} boxShadow={2}>
      <Typography variant="h6">Child's Information</Typography>
      <Typography variant="body1">Name: John Doe</Typography>
      <Typography variant="body1">Grade: 5th Grade</Typography>
      <Typography variant="body1">School: ABC Elementary</Typography>
    </Box>
  );
};

export default ParentDashboardInfo;