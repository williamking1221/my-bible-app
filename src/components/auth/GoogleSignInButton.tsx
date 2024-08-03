import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { handleGoogleAuth } from '../../utils/auth'; // Import the Google Auth function

const GoogleSignInButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await handleGoogleAuth();
      // Handle post-authentication logic (e.g., redirect, show success message)
    } catch (error) {
      // Handle any errors
      console.error("Error with Google authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
      disabled={loading}
      fullWidth
    >
      {loading ? <CircularProgress size={24} /> : 'Sign In with Google'}
    </Button>
  );
};

export default GoogleSignInButton;