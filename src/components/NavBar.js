import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function NavBar({ page, setPage }) {
	return (
		<Navbar variant="light" bg="light" style={{width: '50%', margin: 'auto'}}>
			<Nav variant="tabs" className="m-auto">
				<Nav.Item>
					<Nav.Link
						active={page === 'generate'}
						eventKey="key-2"
						onClick={() => setPage('generate')}
					>
						Kingdom Generator
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						active={page === 'browse'}
						eventKey="key-1"
						onClick={() => setPage('browse')}
					>
						Browse Cards
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</Navbar>
	)
}


NavBar.propTypes = {
	page: PropTypes.oneOf(['generate', 'browse']).isRequired,
	setPage: PropTypes.func.isRequired
}
