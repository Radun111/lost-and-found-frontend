import { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { validateItem } from '../utils/validation';

interface ItemFormProps {
  onSubmit: (item: CreateItemDto, image?: File) => Promise<void>;
}

export default function ItemForm({ onSubmit }: ItemFormProps) {
  const [item, setItem] = useState<CreateItemDto>({
    title: '',
    description: '',
    status: 'LOST'
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = {
      title: validateItem(item).title,
      ...(image && { image: validateImage(image) })
    };
    
    setErrors(validationErrors);
    
    if (!Object.values(validationErrors).some(Boolean)) {
      await onSubmit(item, image || undefined);
      resetForm();
    }
  };

  const resetForm = () => {
    setItem({ title: '', description: '', status: 'LOST' });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Existing fields... */}
      
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          ref={fileInputRef}
        />
        {errors.image && <Alert variant="danger">{errors.image}</Alert>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

// Add to validation.ts
export const validateImage = (file: File): string | null => {
  if (file.size > 5 * 1024 * 1024) return 'Image must be <5MB';
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return 'Only JPEG/PNG allowed';
  }
  return null;
};