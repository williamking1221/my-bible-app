import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Typography, Container } from '@mui/material';
import TopBar from '../components/TopBar';

const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the home page if not logged in
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Container component="main" maxWidth="md">
      <TopBar />
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to your Dashboard
      </Typography>
      {/* Add more content here */}
    </Container>
  );
};

export default Dashboard;
