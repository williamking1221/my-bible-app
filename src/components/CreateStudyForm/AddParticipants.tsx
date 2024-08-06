import React, { useState } from 'react';
import { TextField, Box, Button, Chip } from '@mui/material';

interface AddParticipantsProps {
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddParticipants: React.FC<AddParticipantsProps> = ({ setParticipants }) => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const addParticipant = () => {
    if (email) {
      setParticipants((prev) => [...prev, email]);
      setEmails((prev) => [...prev, email]);
      setEmail('');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Invite Participants (Email)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={addParticipant} variant="outlined" sx={{ mb: 2 }}>
        Add Participant
      </Button>
      <Box>
        {emails.map((e, index) => (
          <Chip
            key={index}
            label={e}
            onDelete={() => {
              setEmails((prev) => prev.filter((email, i) => i !== index));
              setParticipants((prev) => prev.filter((email, i) => i !== index));
            }}
            sx={{ margin: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AddParticipants;
