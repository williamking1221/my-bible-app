import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

// Handles Google Sign-In/Sign-Up
export const handleGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User authenticated:", user);
    // Additional logic, such as storing user data, can be added here
  } catch (error) {
    console.error("Error with Google authentication:", error);
    throw error; // Re-throw error to handle it in the component
  }
};