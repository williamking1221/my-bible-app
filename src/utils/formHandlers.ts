// src/utils/formHandlers.ts
import { db } from './firebaseConfig'; // Assuming this is the Firestore instance
import { addDoc, collection } from 'firebase/firestore';
import { BibleStudy } from '../types'; // Define this type based on your schema

export const createStudyHandler = async (studyData: BibleStudy) => {
  try {
    // Validate and process studyData if necessary
    const { title, startBook, startChapter, startVerse, endBook, endChapter, endVerse, defaultVersion, additionalVersions } = studyData;

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
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
