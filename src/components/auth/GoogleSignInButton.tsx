// src/components/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { handleGoogleAuth } from '../../utils/auth'; // Import the Google Auth function
import GoogleIcon from '@mui/icons-material/Google'; // Import a Google icon from MUI icons
import { useRouter } from 'next/router';

const GoogleSignInButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      await handleGoogleAuth(); // Call the Google authentication function
      router.push('/dashboard'); // Redirect to the dashboard page
      // Handle post-authentication logic (e.g., redirect, show success message)
    } catch (error) {
      // Handle any errors
      setLoading(false);
      console.error('Error with Google authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={loading}
      startIcon={<GoogleIcon />}
      sx={{
        mt: 2,
        mx: 0,
        mb: 1,
        backgroundColor: 'white', // Set the background color to white
        color: 'black', // Set the text color to black for contrast
        '&:hover': {
          backgroundColor: '#f0f0f0', // Light grey for hover effect
        },
      }}
    >
      {loading ? <CircularProgress size={24} /> : 'Continue with Google'}
    </Button>
  );
};

export default GoogleSignInButton;
