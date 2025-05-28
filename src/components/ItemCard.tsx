import { Button, Card } from 'react-bootstrap';
import { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
  onClaim?: (id: string) => void;
}

export default function ItemCard({ item, onDelete, onClaim }: ItemCardProps) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <div className="d-flex justify-content-between">
          <span className={`badge ${
            item.status === 'LOST' ? 'bg-danger' : 
            item.status === 'FOUND' ? 'bg-success' : 'bg-info'
          }`}>
            {item.status}
          </span>
          <div>
            {onClaim && (
              <Button 
                variant="warning" 
                size="sm" 
                onClick={() => onClaim(item.id)}
                className="me-2"
              >
                Claim
              </Button>
            )}
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}