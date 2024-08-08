import { db, auth } from './firebaseConfig'; // Assuming this is the Firestore instance
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BibleStudy } from '../types'; // Define this type based on your schema

export const createStudyHandler = async (studyData: BibleStudy) => {
  try {
    // Validate and process studyData if necessary
    const { title, startBook, startChapter, startVerse, endBook, endChapter, endVerse, defaultVersion, additionalVersions, users } = studyData;

    const currentUser = getAuth().currentUser;

    // Create a new document in Firestore
    const docRef = await addDoc(collection(db, 'bibleStudies'), {
      title,
      startBook,
      startChapter,
      startVerse,
      endBook,
      endChapter,
      endVerse,
      defaultVersion,
      additionalVersions,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [currentUser, ...users],
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
