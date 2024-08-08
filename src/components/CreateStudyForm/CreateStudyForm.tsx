import React, { useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Container, Typography, Button, Box, Chip, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { createStudyHandler } from '../../utils/formHandlers';
import bibleData from '../../data/bibleData.json'; // Import JSON data

const CreateStudyForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [startBook, setStartBook] = useState('');
  const [startChapter, setStartChapter] = useState(1);
  const [startVerse, setStartVerse] = useState(1);
  const [endBook, setEndBook] = useState('');
  const [endChapter, setEndChapter] = useState(1);
  const [endVerse, setEndVerse] = useState(1);
  const [defaultVersion, setDefaultVersion] = useState<string>("NIV");
  const [additionalVersions, setAdditionalVersions] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState<string>('');

  const router = useRouter();

  const books = bibleData.map((book, index) => ({
    name: book.book,
    index: index,
  }));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStartBookChange = (event: SelectChangeEvent<string>) => {
    const selectedBook = event.target.value;
    setStartBook(selectedBook);
    setStartChapter(1);
    setStartVerse(1);
    setEndBook(selectedBook); // Reset end book to match start
    setEndChapter(1);
    setEndVerse(1);
    setDefaultVersion(defaultVersion);
  };

  const handleStartChapterChange = (event: SelectChangeEvent<string>) => {
    const selectedChapter = Number(event.target.value);
    setStartChapter(selectedChapter);
    setStartVerse(1);
    setEndChapter(selectedChapter); // Reset end chapter to match start
    setEndVerse(1);
  };

  const handleStartVerseChange = (event: SelectChangeEvent<string>) => {
    setStartVerse(Number(event.target.value));
    setEndVerse(Number(event.target.value)); // Reset end verse to match start
  };

  const handleEndBookChange = (event: SelectChangeEvent<string>) => {
    setEndBook(event.target.value);
    setEndChapter(1);
    setEndVerse(1);
  };

  const handleEndChapterChange = (event: SelectChangeEvent<string>) => {
    setEndChapter(Number(event.target.value));
    setEndVerse(1);
  };

  const handleEndVerseChange = (event: SelectChangeEvent<string>) => {
    setEndVerse(Number(event.target.value));
  };

  const getChapters = (bookName: string) => {
    const book = bibleData.find((book) => book.book === bookName);
    return book ? book.chapters : [];
  };

  const isStartBeforeEnd = () => {
    const startBookIndex = books.findIndex((book) => book.name === startBook);
    const endBookIndex = books.findIndex((book) => book.name === endBook);
    if (startBookIndex < endBookIndex) return true;
    if (startBookIndex === endBookIndex) {
      if (startChapter < endChapter) return true;
      if (startChapter === endChapter) return startVerse <= endVerse;
    }
    return false;
  };

  const handleInviteEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  };

  const handleAddInvite = () => {
    if (inviteEmail && !invitedUsers.includes(inviteEmail)) {
      setInvitedUsers([...invitedUsers, inviteEmail]);
      setInviteEmail('');
    }
  };

  const handleRemoveInvite = (email: string) => {
    setInvitedUsers(invitedUsers.filter((user) => user !== email));
  };

  const handleSubmit = async () => {
    // Gather form data into an object
    const studyData = {
      title,
      startBook,
      startChapter,
      startVerse,
      endBook,
      endChapter,
      endVerse,
      defaultVersion,
      additionalVersions,
      users: invitedUsers,
    };
    try {
      // Call the handler to create a new study
      const docId = await createStudyHandler(studyData);

      // Redirect to the newly created study's page or show success message
      router.push(`/studies/${docId}`);
    } catch (error) {
      console.error("Error creating study:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5" component="h2" gutterBottom>
        Create a Bible Study
      </Typography>

      {/* Title Input */}
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          required
        />
      </FormControl>

      {/* Start Selection */}
      <Typography variant="h6" component="h3">
        Start Passage
      </Typography>
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Start Book</InputLabel>
        <Select value={startBook} 
                id="demo-native-select"
                label="Start Book"
                onChange={handleStartBookChange}
                required 
                sx={{ minWidth: 120 }}>
          {books.map((book) => (
            <MenuItem key={book.name} value={book.name}>
              {book.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {startBook && (
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Start Chapter</InputLabel>
          <Select value={startChapter.toString()} 
                  id="demo-simple-select"
                  label="Start Chapter" 
                  onChange={handleStartChapterChange} 
                  required 
                  sx={{ minWidth: 120 }}>
            {getChapters(startBook).map((chapter, index) => (
              <MenuItem key={chapter.chapter} value={index + 1}>
                {chapter.chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {startBook && (
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Start Verse</InputLabel>
          <Select value={startVerse.toString()} 
                  id="demo-simple-select"
                  label="Start Verse"
                  onChange={handleStartVerseChange} 
                  required 
                  sx={{ minWidth: 120 }}>
            {Array.from({ length: Number(getChapters(startBook)[startChapter - 1]?.verses) }, (_, i) => i + 1).map((verse) => (
              <MenuItem key={verse} value={verse}>
                {verse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* End Selection */}
      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        End Passage
      </Typography>
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">End Book</InputLabel>
        <Select value={endBook} 
                id="demo-native-select"
                label="End Book"
                onChange={handleEndBookChange} 
                required 
                sx={{ minWidth: 120 }}>
          {books.map((book) => (
            <MenuItem key={book.name} value={book.name} disabled={book.index < books.findIndex((b) => b.name === startBook)}>
              {book.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {endBook && (
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">End Chapter</InputLabel>
          <Select value={endChapter.toString()} 
                  id="demo-simple-select"
                  label="End Chapter"
                  onChange={handleEndChapterChange} 
                  required 
                  sx={{ minWidth: 120 }}>
            {getChapters(endBook).map((chapter, index) => (
              <MenuItem key={chapter.chapter} value={index + 1}>
                {chapter.chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {endBook && (
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">End Verse</InputLabel>
          <Select value={endVerse.toString()} 
                  id="demo-simple-select"
                  label="End Verse"
                  onChange={handleEndVerseChange} 
                  required 
                  sx={{ minWidth: 120 }}>
            {Array.from({ length: Number(getChapters(endBook)[endChapter - 1]?.verses) }, (_, i) => i + 1).map((verse) => (
              <MenuItem key={verse} value={verse}>
                {verse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Default Version */}
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Default Version</InputLabel>
        <Select value={defaultVersion} 
                id="demo-simple-select"
                label="Default Version"
                onChange={(e: SelectChangeEvent<string>) => setDefaultVersion(e.target.value)} 
                sx={{ minWidth: 120 }}>
          {['NIV', 'ESV', 'KJV'].map((version) => (
            <MenuItem key={version} value={version}>
              {version}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Additional Versions */}
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Additional Versions</InputLabel>
        <Select
          multiple
          value={additionalVersions}
          id="demo-multiple-select"
          label="Additional Versions"
          onChange={(e: SelectChangeEvent<string[]>) => setAdditionalVersions(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          sx={{ minWidth: 120 }}
        >
          {['NIV', 'ESV', 'KJV'].map((version) => (
            <MenuItem key={version} value={version}>
              {version}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Invite Users */}
      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        Invite Users
      </Typography>
      <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
        <TextField
          label="Invite by Email"
          value={inviteEmail}
          onChange={handleInviteEmailChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddInvite} sx={{ mt: 1 }}>
          Add
        </Button>
      </FormControl>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {invitedUsers.map((email) => (
          <Chip key={email} label={email} onDelete={() => handleRemoveInvite(email)} />
        ))}
      </Box>

      {/* Submit Button */}
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isStartBeforeEnd()}
        sx={{ mt: 3, mb: 2 }}
      >
        Create Bible Study
      </Button>
    </Container>
  );
};

export default CreateStudyForm;
