import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RequestForm() {
  const [itemId, setItemId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post('/requests', { itemId });
    navigate('/requests');
  };

  return (
    <div className="container mt-4">
      <h2>Create Request</h2>
      <Form onSubmit={handleSubmit} className="border p-4 rounded">
        <Form.Group className="mb-3">
          <Form.Label>Item ID</Form.Label>
          <Form.Control
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Request
        </Button>
      </Form>
    </div>
  );
}