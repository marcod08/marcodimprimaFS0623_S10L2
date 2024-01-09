import React, { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (bookId) {
      getComments();
    }
  }, [bookId]);

  const aggiornaCommenti = () => {
    getComments();
  };

  const getComments = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookId}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNDgzNWU2Mjg4NjAwMTg4M2YzYTgiLCJpYXQiOjE3MDQ4MDY0NTQsImV4cCI6MTcwNjAxNjA1NH0.dCtmzU31WvyqTrn015OpAIyiiQhYjm6G7S3YOxPpJkg',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Errore nel recupero dei commenti');
        }
      })
      .then((arrayOfComments) => {
        setComments(arrayOfComments);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div>
      <div>
        <CommentsList reviews={comments} />
      </div>
      <div>
        <AddComment bookId={bookId} aggiornaCommenti={aggiornaCommenti} />
      </div>
    </div>
  );
};

export default CommentArea;