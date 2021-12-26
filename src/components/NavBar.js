import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function NavBar({ page, setPage }) {

	return (
		<Navbar className="justify-content-center">
			<Navbar.Brand as="div">
				<img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" height={40}/>
			</Navbar.Brand>
			<Nav navbar variant="pills">
				<Nav.Item>
					<Nav.Link
						active={page === 'generate'}
						onClick={() => setPage('generate')}
					>
						Kingdom Generator
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						active={page === 'browse'}
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
