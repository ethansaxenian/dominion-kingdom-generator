import PropTypes from 'prop-types';
import { GiCardPick, GiCastle } from 'react-icons/gi';
import { BsInboxes } from 'react-icons/bs';
import NavBarItem from './NavBarItem';
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';

export default function NavBar({ page, setPage }) {

	return (
		<Flex
			w="100%"
			py="20px"
			ps="20px"
			pe="15vw"
			justify="space-between"
			bg={useColorModeValue('gray.100', 'gray.900')}
			borderRadius="8px"
		>
			<Image src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" boxSize="40px"/>
			<NavBarItem
				label="Kingdom Generator"
				isActive={page === 'generate'}
				onClick={() => setPage('generate')}
				icon={GiCastle}
			/>
			<NavBarItem
				label="Kingdom Settings"
				isActive={page === 'settings'}
				onClick={() => setPage('settings')}
				icon={BsInboxes}
			/>
			<NavBarItem
				label="Browse Cards"
				isActive={page === 'browse'}
				onClick={() => setPage('browse')}
				icon={GiCardPick}
			/>
		</Flex>
	)
}

NavBar.propTypes = {
	page: PropTypes.oneOf(['generate', 'settings', 'browse']).isRequired,
	setPage: PropTypes.func.isRequired
}
