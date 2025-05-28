import { Button, Card } from 'react-bootstrap';
import { Request } from '../types/request';

interface RequestCardProps {
  request: Request;
  onStatusChange?: (status: 'APPROVED' | 'REJECTED') => void;
}

export default function RequestCard({ request, onStatusChange }: RequestCardProps) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{request.item.title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-1">Requested by: {request.user.username}</p>
            <span className={`badge ${
              request.status === 'PENDING' ? 'bg-warning' : 
              request.status === 'APPROVED' ? 'bg-success' : 'bg-danger'
            }`}>
              {request.status}
            </span>
          </div>
          {onStatusChange && request.status === 'PENDING' && (
            <div>
              <Button 
                variant="success" 
                size="sm" 
                onClick={() => onStatusChange('APPROVED')}
                className="me-2"
              >
                Approve
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => onStatusChange('REJECTED')}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}