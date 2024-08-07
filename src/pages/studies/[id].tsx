import { GetServerSideProps } from 'next';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box } from '@mui/material';
import { StudyProps } from '../../types'
import BibleStudyContent from '../../components/BibleStudies/BibleStudyContent';
import TopBar from '@/src/components/TopBar';

const BibleStudyPage: React.FC<StudyProps> = ({ study }) => {
  const {
    title,
    defaultVersion,
    startBook,
    startChapter,
    startVerse,
    endBook,
    endChapter,
    endVerse,
  } = study;

  return (
    <Container>
      <TopBar />
      <Typography variant="h2" style={{ marginTop: '0.5em' }}>Bible Study: {title}</Typography>
      <Box mt={2}>
        <BibleStudyContent
          defaultVersion={defaultVersion}
          startBook={startBook}
          startChapter={startChapter}
          startVerse={startVerse}
          endBook={endBook}
          endChapter={endChapter}
          endVerse={endVerse}
        />
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const docRef = doc(db, "bibleStudies", id as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const studyData = docSnap.data();
    // Convert Firestore Timestamp to JSON serializable format
    const study = {
      ...studyData,
      createdAt: studyData.createdAt.toDate().toISOString(), 
      updatedAt: studyData.updatedAt.toDate().toISOString(),
    };
    return {
      props: {
        study,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default BibleStudyPage;
