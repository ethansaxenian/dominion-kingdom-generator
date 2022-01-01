import PropTypes from 'prop-types';
import { GiCardPick, GiCastle } from 'react-icons/gi';
import { MdSettings } from 'react-icons/md';
import NavBarItem from './NavBarItem';
import { Flex, IconButton, Image, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavBar({ page, setPage }) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex
			w="100vw"
			p="20px"
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
				icon={MdSettings}
			/>
			<NavBarItem
				label="Browse Cards"
				isActive={page === 'browse'}
				onClick={() => setPage('browse')}
				icon={GiCardPick}
			/>
			<IconButton
				onClick={toggleColorMode}
				aria-label={`toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`}
				icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
				fontSize="20px"
			/>
		</Flex>
	)
}

NavBar.propTypes = {
	page: PropTypes.oneOf(['generate', 'settings', 'browse']).isRequired,
	setPage: PropTypes.func.isRequired
}
