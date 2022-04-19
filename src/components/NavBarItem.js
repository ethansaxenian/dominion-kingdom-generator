import PropTypes from 'prop-types';
import { HStack, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';

export default function NavBarItem({ label, isActive, onClick, icon }) {

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
        color: textColor
      }}
      bg={isActive && bgActiveColor}
    >
      <HStack spacing="10px" w="fit-content" p="10px">
        <Icon as={icon} boxSize="25px"/>
        <Text display={{base: 'none', md: 'flex'}}>{label}</Text>
      </HStack>
    </Link>
  )
}

NavBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired
}
