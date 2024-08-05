import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Avatar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import GoogleSignInButton from './auth/GoogleSignInButton';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/');
    });
    handleClose();
  };

  return (
    <>
      {user ? (
        <div>
          <Button onClick={handleClick} color="inherit">
            <Avatar src={user.photoURL || ''} alt={user.displayName || 'User'} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{user.displayName}</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      ) : (
        <GoogleSignInButton />
      )}
    </>
  );
};

export default Profile;
