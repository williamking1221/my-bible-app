export interface BibleStudy {
    id?: string; // Optional, if you want to store the Firestore document ID
    title: string;
    startBook: string;
    startChapter: number;
    startVerse: number;
    endBook: string;
    endChapter: number;
    endVerse: number;
    defaultVersion: string;
    additionalVersions: string[];
    createdAt?: Date; 
    updatedAt?: Date;
    creatorId?: string;
  }

export interface StudyProps {
    study: any; // Define a proper type for your study data
  }

export interface Verse {
    id: number;
    chapter: number;
    o: number;
    entries: Entry[];
  }

export type Entry = 
  | { type: 'text'; text: string }
  | { type: 'header'; level: number; text: string };