import { Nav, Navbar } from "react-bootstrap";

export default function NavBar({ page, setPage }) {
  return (
    <Navbar variant="light" bg="light">
      <Nav variant="tabs" className="m-auto">
        <Nav.Item>
          <Nav.Link
            active={page === 'generate'}
            eventKey="key-2"
            onSelect={() => setPage('generate')}
          >
            Kingdom Generator
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={page === 'browse'}
            eventKey="key-1"
            onSelect={() => setPage('browse')}
          >
            Browse Cards
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}
