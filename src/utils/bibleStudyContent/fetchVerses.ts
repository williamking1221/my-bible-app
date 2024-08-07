import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { Verse, Entry } from '../../types';
import bibleDataMap from './bibleData'; // Adjust the path as needed

const fetchVerses = async (
  defaultVersion: string,
  startBook: string,
  startChapter: number,
  startVerse: number,
  endBook: string,
  endChapter: number,
  endVerse: number
): Promise<Verse[]> => {
  const verses: Verse[] = [];

  // Fetch verses for a single chapter
  const fetchVersesForChapter = async (book: string, chapter: number, start: number, end: number) => {
    const totalVerses = bibleDataMap[book]?.[chapter] || 0;

    // Check if the chapter is valid
    if (totalVerses === 0) {
      console.warn(`Invalid chapter ${book} ${chapter}`);
      return;
    }

    // Correct the end boundary if it exceeds total verses
    const validEnd = Math.min(end, totalVerses);

    if (start == 1) {
        start = 0;
    }

    console.log(`Fetching ${book} ${chapter}:${start}-${validEnd}`);

    const versesQuery = query(
      collection(db, `${defaultVersion}/${book}/Chapters/${chapter}/Verses`),
      where('id', '>=', start),
      where('id', '<=', validEnd)
    );

    const querySnapshot = await getDocs(versesQuery);
    querySnapshot.docs.forEach(doc => {
      const data = doc.data() as DocumentData;

      const entries: Entry[] = (data.entries as any[]).map(entry => ({
        type: entry.type,
        text: entry.text,
        level: entry.level
      }));

      verses.push({
        id: Number(data.id),
        chapter: Number(data.chapter),
        o: data.o as number,
        entries: entries
      });
    });
  };

  // Fetch all chapters within a range for the same book
  const fetchVersesForBook = async (book: string, startChapter: number, endChapter: number, startVerse: number, endVerse: number) => {
    for (let chapter = startChapter; chapter <= endChapter; chapter++) {
      const start = (chapter === startChapter) ? startVerse : 1;
      const end = (chapter === endChapter) ? endVerse : (bibleDataMap[book]?.[chapter] || 0);

      // Skip invalid chapters
      if (bibleDataMap[book]?.[chapter] === undefined) {
        console.warn(`Skipping invalid chapter ${book} ${chapter}`);
        continue;
      }
      
      await fetchVersesForChapter(book, chapter, start, end);
    }
  };

  // Handle cases where startBook and endBook are the same
  if (startBook === endBook) {
    await fetchVersesForBook(startBook, startChapter, endChapter, startVerse, endVerse);
  } else {
    // Fetch verses for the start book
    const startEndChapter = Math.max(...Object.keys(bibleDataMap[startBook] || {}).map(Number));
    await fetchVersesForBook(startBook, startChapter, startEndChapter, startVerse, Number.MAX_SAFE_INTEGER);

    // Handle books in between
    const books = Object.keys(bibleDataMap);
    const startBookIndex = books.indexOf(startBook);
    const endBookIndex = books.indexOf(endBook);

    for (let i = startBookIndex + 1; i < endBookIndex; i++) {
      const book = books[i];
      const maxChapter = Math.max(...Object.keys(bibleDataMap[book] || {}).map(Number));
      await fetchVersesForBook(book, 1, maxChapter, 1, Number.MAX_SAFE_INTEGER);
    }

    // Fetch verses for the end book
    await fetchVersesForBook(endBook, 1, endChapter, 1, endVerse);
  }

  // Remove the header if the last entry is a header
  if (verses.length > 0) {
    const lastVerse = verses[verses.length - 1];
    if (lastVerse.entries.length > 1 && lastVerse.entries[lastVerse.entries.length - 1].type === 'header') {
      lastVerse.entries.pop(); // Remove the last entry if it is a header
    }
  }

  return verses;
};

export default fetchVerses;
