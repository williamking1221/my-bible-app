import { Container, Paper, Typography, Grid } from '@mui/material';
import GoogleSignInButton from '../components/auth/GoogleSignInButton'; // Import the Google Sign-In button component

const SignUpPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GoogleSignInButton />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
