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