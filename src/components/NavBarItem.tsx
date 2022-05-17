import { HStack, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

export interface NavBarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: IconType;
}

export const NavBarItem: FC<NavBarItemProps> = ({
  label,
  isActive,
  onClick,
  icon,
}) => {
  const textColor = useColorModeValue('black', 'white');
  const textActiveColor = useColorModeValue('gray.600', 'gray.400');
  const bgActiveColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Link
      onClick={() => onClick()}
      rounded="md"
      color={isActive ? textColor : textActiveColor}
      _hover={{
        textDecoration: 'none',
        color: textColor,
      }}
      bg={isActive ? bgActiveColor : undefined}
    >
      <HStack spacing="10px" w="fit-content" p="10px">
        <Icon as={icon} boxSize="25px" />
        <Text display={{ base: 'none', md: 'flex' }}>{label}</Text>
      </HStack>
    </Link>
  );
};
