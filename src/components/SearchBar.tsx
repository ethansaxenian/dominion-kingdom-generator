import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { SortCardsBy } from 'lib';
import { FC } from 'react';

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (string: string) => void;
  sortBy: SortCardsBy;
  setSortBy: (string: SortCardsBy) => void;
  displayed: Array<string>;
  toggleDisplayType: (string: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  displayed,
  toggleDisplayType,
}) => {
  return (
    <>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="space-evenly"
        w={{ base: 'fit-content', md: '75%' }}
        p="30px"
      >
        <Input
          value={searchTerm}
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
          w="64"
        />
        <InputGroup w="64">
          <InputLeftAddon>Sort by:</InputLeftAddon>
          <Select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortCardsBy)}
            borderLeftRadius="none"
          >
            <option value="name">Name</option>
            <option value="expansion">Expansion</option>
            <option value="cost">Cost</option>
          </Select>
        </InputGroup>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '5px', md: '20px' }}
      >
        {['Supply', 'Non-supply', 'Landscape'].map((type) => (
          <HStack key={type}>
            <Switch
              isChecked={displayed.includes(type)}
              onChange={() => toggleDisplayType(type)}
            />
            <Text pl="10px">{type}</Text>
          </HStack>
        ))}
      </Stack>
    </>
  );
};
