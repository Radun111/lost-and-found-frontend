import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | Item['status']>('ALL');

  // Filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-4">
      {/* Search & Filter UI */}
      <div className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control
              type="search"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">All Statuses</option>
              <option value="LOST">Lost</option>
              <option value="FOUND">Found</option>
              <option value="CLAIMED">Claimed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Item List */}
      <Row>
        {filteredItems.map(item => (
          <Col key={item.id} md={4} className="mb-4">
            {/* Item card rendering */}
          </Col>
        ))}
      </Row>
    </div>
  );
}