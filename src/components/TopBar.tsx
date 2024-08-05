import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import GoogleSignInButton from './auth/GoogleSignInButton';
import Profile from './Profile';

const TopBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <Typography variant="h6" component="div">
            Bible Study App
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Profile />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
