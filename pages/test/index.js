import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Heading */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Our Service
      </Typography>

      {/* Description */}
      <Typography variant="body1" component="p" align="center" sx={{ maxWidth: '600px', marginBottom: '32px' }}>
        We offer the best solution for managing your tasks effectively and efficiently. Join us today and start getting things done with ease!
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ padding: '12px 24px', borderRadius: '24px' }}
        onClick={() => console.log('Get Started!')}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
