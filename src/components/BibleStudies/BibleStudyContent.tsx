import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import fetchVerses from '../../utils/bibleStudyContent/fetchVerses';
import { Verse, Entry } from '../../types';
import BibleStudyComments from './BibleStudyComment'; // Import the Comments component

interface BibleStudyContentProps {
  defaultVersion: string;
  startBook: string;
  startChapter: number;
  startVerse: number;
  endBook: string;
  endChapter: number;
  endVerse: number;
}

const BibleStudyContent: React.FC<BibleStudyContentProps> = ({
  defaultVersion,
  startBook,
  startChapter,
  startVerse,
  endBook,
  endChapter,
  endVerse,
}) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null); // State to keep track of the selected verse

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVerses = await fetchVerses(
          defaultVersion,
          // startBook,
          // startChapter,
          // startVerse,
          // endBook,
          // endChapter,
          // endVerse
          "1 Corinthians",
          16,
          1,
          "2 Corinthians",
          2,
          4
        );
        setVerses(fetchedVerses);
      } catch (err) {
        setError('Error fetching verses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [defaultVersion, startBook, startChapter, startVerse, endBook, endChapter, endVerse]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleVerseClick = (verse: Verse) => {
    setSelectedVerse(verse); // Set the selected verse
  };

  const formatText = (text: string) => {
    return text.replace(/\*\w+/g, ''); // Remove all * formatting directives
  };

  const isHeader = (entry: Entry): entry is { type: 'header'; level: number; text: string } => {
    return entry.type === 'header';
  };

  const renderVerses = () => {
    return verses.map((verse, verseIndex) => (
      <React.Fragment key={verseIndex}>
        {verse.entries.map((entry, entryIndex) => {
          if (isHeader(entry)) {
            const headerVariant = `h${Math.min(6, Math.max(1, entry.level + 2))}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return (
              <Typography variant={headerVariant} component="div" key={entryIndex} style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
                {formatText(entry.text)}
              </Typography>
            );
          } else {
            return (
              <Typography
                variant="body1"
                component="span"
                key={entryIndex}
                onClick={() => handleVerseClick(verse)}
                style={{ cursor: 'pointer', marginRight: '0.5em' }}
              >
                {verse.id !== 0 && (
                  <strong style={{ marginRight: '0.5em' }}>
                    {verse.id}
                  </strong>
                )}
                {formatText(entry.text)}
              </Typography>
            );
          }
        })}
      </React.Fragment>
    ));
  };

  return (
    <Box>
      <Box display="flex">
        <Box flex={1} padding="16px">
          {renderVerses()}
        </Box>
        <Box flex={1} padding="16px" borderLeft="1px solid #ccc">
          {selectedVerse && (
            <BibleStudyComments
              verseId={selectedVerse.id}
              chapter={selectedVerse.chapter}
              book={startBook}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BibleStudyContent;
