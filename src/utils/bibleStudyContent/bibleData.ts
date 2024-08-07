import bibleData from '../../data/bibleData.json'; // Adjust the path as needed

// Convert to a map-like object
const bibleDataMap: Record<string, Record<number, number>> = bibleData.reduce((map, book) => {
  map[book.book] = book.chapters.reduce((chaptersMap, chapter) => {
    chaptersMap[parseInt(chapter.chapter, 10)] = parseInt(chapter.verses, 10);
    return chaptersMap;
  }, {} as Record<number, number>);
  return map;
}, {} as Record<string, Record<number, number>>);

export default bibleDataMap;
