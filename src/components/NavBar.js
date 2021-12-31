import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GiCardPick, GiCastle } from 'react-icons/gi';
import { BsInboxes } from 'react-icons/bs';
import NavBarItem from './NavBarItem';
import { Image } from '@chakra-ui/react';

export default function NavBar({ page, setPage }) {

	return (
		<Navbar>
			<Navbar.Brand as="div">
				<Image src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" boxSize="40px"/>
			</Navbar.Brand>
			<Nav>
				<NavBarItem
					label="Kingdom Generator"
					isActive={page === 'generate'}
					onClick={() => setPage('generate')}
					icon={<GiCastle/>}
				/>
				<NavBarItem
					label="Kingdom Settings"
					isActive={page === 'settings'}
					onClick={() => setPage('settings')}
					icon={<BsInboxes/>}
				/>
				<NavBarItem
					label="Browse Cards"
					isActive={page === 'browse'}
					onClick={() => setPage('browse')}
					icon={<GiCardPick/>}
				/>
			</Nav>
		</Navbar>
	)
}

NavBar.propTypes = {
	page: PropTypes.oneOf(['generate', 'settings', 'browse']).isRequired,
	setPage: PropTypes.func.isRequired
}
