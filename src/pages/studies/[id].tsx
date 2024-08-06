import { GetServerSideProps } from 'next';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box } from '@mui/material';
import { StudyProps } from '../../types'

const BibleStudyPage: React.FC<StudyProps> = ({ study }) => {
  return (
    <Container>
      <Typography variant="h4">Bible Study: {study.title}</Typography>
      {/* Render Bible study content */}
      <Box>
        {/* Display Bible passage and comments */}
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
    console.log(studyData);
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
