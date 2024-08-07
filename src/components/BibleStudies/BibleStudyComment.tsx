import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Box, Typography, TextField, Button } from '@mui/material';

interface CommentsProps {
  verseId: number;
  chapter: number;
  book: string;
}

interface Comment {
  id: string;
  text: string;
}

const BibleStudyComments: React.FC<CommentsProps> = ({ verseId, chapter, book }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, 'comments'), where('book', '==', book), where('chapter', '==', chapter), where('verseId', '==', verseId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Comment[];
      setComments(commentsData);
    };
    fetchComments();
  }, [verseId, chapter, book]);

  const handleSaveComment = async () => {
    if (editingCommentId) {
      const commentRef = doc(db, 'comments', editingCommentId);
      await updateDoc(commentRef, { text: newComment });
    } else {
      await addDoc(collection(db, 'comments'), {
        book,
        chapter,
        verseId,
        text: newComment,
      });
    }
    setNewComment('');
    setEditingCommentId(null);
    const q = query(collection(db, 'comments'), where('book', '==', book), where('chapter', '==', chapter), where('verseId', '==', verseId));
    const querySnapshot = await getDocs(q);
    const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Comment[];
    setComments(commentsData);
  };

  const handleEditComment = (comment: Comment) => {
    setNewComment(comment.text);
    setEditingCommentId(comment.id);
  };

  return (
    <Box>
      <Typography variant="h6">Comments for {book} {chapter}:{verseId}</Typography>
      {comments.map(comment => (
        <Box key={comment.id} mb={2}>
          <Typography>{comment.text}</Typography>
          <Button onClick={() => handleEditComment(comment)}>Edit</Button>
        </Box>
      ))}
      <TextField
        label="New Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      <Button onClick={handleSaveComment} variant="contained" color="primary" style={{ marginTop: '1em' }}>
        {editingCommentId ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
};

export default BibleStudyComments;
