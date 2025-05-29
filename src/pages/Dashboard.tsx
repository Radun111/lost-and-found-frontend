import { useEffect, useState } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { fetchItems, fetchRequests } from '../services';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    items: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    const loadData = async () => {
      const items = await fetchItems();
      const requests = user?.role !== 'student' ? await fetchRequests() : [];
      setStats({
        items: items.length,
        pendingRequests: requests.filter(r => r.status === 'PENDING').length
      });
    };
    loadData();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Welcome, {user?.username}</h2>
        <p className="text-muted">Role: {user?.role.toUpperCase()}</p>

        <Row className="mt-4">
          {/* Student View */}
          {user?.role === 'student' && (
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Report Lost Item</Card.Title>
                  <Card.Text>
                    Found someone's belongings? Report them here.
                  </Card.Text>
                  <a href="/items/new" className="btn btn-primary">
                    Create Report
                  </a>
                </Card.Body>
              </Card>
            </Col>
          )}

          {/* Staff/Admin View */}
          {user?.role !== 'student' && (
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Pending Requests</Card.Title>
                  <Card.Text>
                    {stats.pendingRequests} requests awaiting approval
                  </Card.Text>
                  <a href="/requests" className="btn btn-warning">
                    Review Requests
                  </a>
                </Card.Body>
              </Card>
            </Col>
          )}

          {/* Common Widget */}
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Browse Items</Card.Title>
                <Card.Text>
                  {stats.items} items in the system
                </Card.Text>
                <a href="/items" className="btn btn-success">
                  View All
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <div className="mt-5">
          <h4>Recent Activity</h4>
          <Alert variant="info">
            Feature coming soon!
          </Alert>
        </div>
      </div>
    </>
  );
}