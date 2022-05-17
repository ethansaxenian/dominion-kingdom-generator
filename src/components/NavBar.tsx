import { GiCardPick, GiCastle } from 'react-icons/gi';
import { MdSettings } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import { NavBarItem } from './NavBarItem';
import {
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { Page } from 'lib';

export interface NavBarProps {
  page: Page;
  setPage: (page: Page) => void;
}

export const NavBar: FC<NavBarProps> = ({ page, setPage }) => {
  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const themeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const themeIconLabel = useColorModeValue('dark', 'light');

  return (
    <Flex w="100vw" p="20px" justify="space-between" bg={bgColor}>
      <Image
        src={`${process.env.PUBLIC_URL}/favicon.ico`}
        alt="logo"
        boxSize="10"
      />
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
        <Center
          as={Link}
          height="10"
          width="10"
          borderRadius="8px"
          href="https://github.com/ethansaxenian/dominion-kingdom-generator"
          isExternal
          aria-label="View source code on GitHub"
        >
          <Icon as={GoMarkGithub} boxSize="5" />
        </Center>
        <IconButton
          onClick={toggleColorMode}
          aria-label={`Toggle ${themeIconLabel} mode`}
          icon={themeIcon}
          fontSize="xl"
          bgColor={bgColor}
        />
      </HStack>
    </Flex>
  );
};
