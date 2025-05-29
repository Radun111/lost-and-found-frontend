import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Greenwood University
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/items">Items</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}