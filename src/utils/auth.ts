import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';

const provider = new GoogleAuthProvider();

export const handleGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);
    return user; // Return user info
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error; // Throw error to handle it outside
  }
};
