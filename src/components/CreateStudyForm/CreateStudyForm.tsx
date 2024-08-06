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
  const [defaultVersion, setDefaultVersion] = useState<string>("ESV");
  const [additionalVersions, setAdditionalVersions] = useState<string[]>([]);

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
    setDefaultVersion("NIV");
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
          error
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
                error 
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
                  error 
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
                  error 
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
                error 
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
                  id="demo-native-select"
                  label="End Chapter"
                  onChange={handleEndChapterChange} 
                  required
                  error 
                  sx={{ minWidth: 120 }}>
            {getChapters(endBook).map((chapter, index) => (
              <MenuItem key={chapter.chapter} value={index + 1} disabled={endBook === startBook && index + 1 < startChapter}>
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
                  id="demo-native-select"
                  label="End Verse"
                  onChange={handleEndVerseChange} 
                  required
                  error 
                  sx={{ minWidth: 120 }}>
            {Array.from({ length: Number(getChapters(endBook)[endChapter - 1]?.verses) }, (_, i) => i + 1).map((verse) => (
              <MenuItem key={verse} value={verse} disabled={endBook === startBook && endChapter === startChapter && verse < startVerse}>
                {verse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Version Selection */}
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel id="default-version-label">Default Version</InputLabel>
        <Select
          labelId="default-version-label"
          value={defaultVersion}
          onChange={(event) => setDefaultVersion(event.target.value as string)}
          required
          error 
          label="Default Version"
        >
          <MenuItem value="ESV">ESV</MenuItem>
          <MenuItem value="NKJV">NKJV</MenuItem>
          <MenuItem value="NIV">NIV</MenuItem>
          <MenuItem value="CSB">CSB</MenuItem>
        </Select>
      </FormControl>
      
      {/* Additional Versions */}
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel id="additional-versions-label">Additional Versions</InputLabel>
        <Select
          labelId="additional-versions-label"
          value=""
          onChange={(event) => {
            const version = event.target.value as string;
            if (!additionalVersions.includes(version)) {
              setAdditionalVersions([...additionalVersions, version]);
            }
          }}
          label="Additional Versions"
        >
          {["ESV", "NKJV", "NIV", "CSB"].map((version) => (
            <MenuItem key={version} value={version} disabled={version == defaultVersion}>
              {version}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2 }}>
        {additionalVersions.map((version, index) => (
          <Chip
            key={index}
            label={version}
            onDelete={() =>
              setAdditionalVersions(additionalVersions.filter((v) => v !== version))
            }
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={!isStartBeforeEnd()}>
          Create Study
        </Button>
      </Box>
    </Container>
  );
};

export default CreateStudyForm;
