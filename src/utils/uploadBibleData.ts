const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

// Define the Entry and Verse types
interface Entry {
  type: 'header' | 'text';
  text: string;
  level?: number;
}

interface Verse {
  id: number;
  chapter: number;
  o?: number;
  entries: Entry[];
}

// Load environment variables
require('dotenv').config();

// Initialize Firebase Admin SDK with the service account JSON file
const serviceAccountPath = path.join('../../', 'bible-study-manager-firebase-adminsdk-eynig-7f87180220.json'); // Path to your JSON file

// Initialize Firebase Admin SDK with your credentials
initializeApp({
  credential: cert(require(serviceAccountPath)),
});

const db = getFirestore();

// Read JSON data
const data = JSON.parse(fs.readFileSync("/Users/williamking1221/Desktop/my-bible-app/src/data/NIV/Zephaniah.json", 'utf-8'));

// Upload data to Firestore
const uploadData = async () => {
  try {
    const chapterIds = new Set<string>(); // Track existing chapters
    for (const item of data) {
      const { r, h, t, o } = item;
      const [version, book, chapter, verse] = r.split(':');

      const chapterNumber = parseInt(chapter, 10);
      const verseNumber = parseInt(verse, 10);
      
      // Define Firestore document path
      const verseDocRef = db.collection("NIV")   
                         .doc(book)           
                         .collection('Chapters')
                         .doc(chapter)                   // Chapter Number
                         .collection('Verses')
                         .doc(verse);                   // Verse Number
                         
      // Prepare data to upload
      let dataToUpload = {
        id: verseNumber,
        chapter: chapterNumber,
        o,
        entries: [] as Entry[], // Array to hold multiple content entries
      };

      // Determine the type and content
      const entry: Entry = h
        ? { type: 'header', level: h, text: t }
        : { type: 'text', text: t };

      // Retrieve existing data if any
      const existingData = (await verseDocRef.get()).data();
      if (existingData) {
        dataToUpload.entries = existingData.entries || [];
      }

      // Add new entry to the entries array
      dataToUpload.entries.push(entry);

      // Upload or update the data
      await verseDocRef.set(dataToUpload);

      // Ensure chapter documents are created
      if (!chapterIds.has(chapter)) {
        const chapterDocRef = db.collection("NIV")
                                 .doc(book)
                                 .collection('Chapters')
                                 .doc(chapter);

        const chapterDataToUpload = {
          id: chapterNumber,
        };

        await chapterDocRef.set(chapterDataToUpload); // Upload the chapter document
        chapterIds.add(chapter); // Track this chapter as created
      }
    }
    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};
uploadData().catch(console.error);
