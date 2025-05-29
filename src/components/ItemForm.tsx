import { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CreateItemDto } from '../types/item';

interface ItemFormProps {
  onSubmit: (item: CreateItemDto) => Promise<void>;
}

export default function ItemForm({ onSubmit }: ItemFormProps) {
  const [item, setItem] = useState<CreateItemDto>({
    title: '',
    description: '',
    status: 'LOST'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(item);
    setItem({ title: '', description: '', status: 'LOST' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={item.title}
          onChange={(e) => setItem({...item, title: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={item.description}
          onChange={(e) => setItem({...item, description: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={item.status}
          onChange={(e) => setItem({...item, status: e.target.value as 'LOST' | 'FOUND'})}
        >
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}