import PropTypes from 'prop-types';
import { GiCardPick, GiCastle } from 'react-icons/gi';
import { MdSettings } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import NavBarItem from './NavBarItem';
import { Flex, HStack, Icon, IconButton, Image, Link, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavBar({ page, setPage }) {
	const { colorMode, toggleColorMode } = useColorMode();

	const bgColor = useColorModeValue('gray.100', 'gray.900');

	return (
		<Flex
			w="100vw"
			p="20px"
			justify="space-between"
			bg={bgColor}
		>
			<Image src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" htmlHeight="40px" htmlWidth="40px"/>
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
			<HStack spacing="20px">
				<Link href="https://github.com/ethansaxenian/dominion-kingdom-generator" isExternal>
					<Icon as={GoMarkGithub} boxSize="20px"/>
				</Link>
				<IconButton
					onClick={toggleColorMode}
					aria-label={`toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`}
					icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
					fontSize="20px"
					bgColor={bgColor}
				/>
			</HStack>
		</Flex>
	)
}

NavBar.propTypes = {
	page: PropTypes.oneOf(['generate', 'settings', 'browse']).isRequired,
	setPage: PropTypes.func.isRequired
}
