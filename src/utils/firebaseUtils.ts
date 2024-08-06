import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getBibleStudiesForUser = async (userId: string) => {
  const q = query(collection(db, 'bibleStudies'), where('creatorId', '==', userId));
  const querySnapshot = await getDocs(q);
  const studies = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return studies;
};
