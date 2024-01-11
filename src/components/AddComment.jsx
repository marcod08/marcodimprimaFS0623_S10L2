import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = ({ bookId, aggiornaCommenti }) => {
  const [commentObject, setCommentObject] = useState({
    comment: '',
    rate: '1',
    elementId: bookId || '',
  });

  const sendNewReview = async (e) => {
    e.preventDefault();
    console.log('bookId:', bookId);
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNDgzNWU2Mjg4NjAwMTg4M2YzYTgiLCJpYXQiOjE3MDQ4MDY0NTQsImV4cCI6MTcwNjAxNjA1NH0.dCtmzU31WvyqTrn015OpAIyiiQhYjm6G7S3YOxPpJkg',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentObject),
        }
      );
      if (response.ok) {
        alert('Commento salvato!');
        aggiornaCommenti();
      } else {
        const errorData = await response.json();
        console.error('Errore nel salvataggio del commento:', errorData);
        throw new Error(`Errore nel salvataggio del commento: ${errorData.message || 'Errore sconosciuto'}`);
      }
    } catch (error) {
      console.error('Errore generico:', error.message || 'Errore sconosciuto');
    }
  };

  return (
    <Form onSubmit={sendNewReview}>
      <Form.Group className="mb-1 mt-4">
        <Form.Label data-testid='comment-input' >Commento</Form.Label>
        <Form.Control
          type="text"
          value={commentObject.comment}
          onChange={(e) => setCommentObject({ ...commentObject, comment: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Select
          aria-label="comment rating"
          value={commentObject.rate}
          onChange={(e) => setCommentObject({ ...commentObject, rate: e.target.value })}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Invia
      </Button>
    </Form>
  );
};

export default AddComment;