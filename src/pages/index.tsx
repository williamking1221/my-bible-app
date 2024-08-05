import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import TopBar from '../components/TopBar';

const HomePage: React.FC = () => {
  return (
    <>
      <TopBar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Bible Study App
          </Typography>
          {/* Additional content can go here */}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;