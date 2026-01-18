import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  VStack,
  Wrap,
  useConst,
  Icon,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { CARDS_TO_REMOVE } from 'lib';
import { useCardPool } from 'hooks';
import Fuse from 'fuse.js';

export interface MultiCardInputProps {
  list: Array<string>;
  setList: (arr: Array<string>) => void;
}

export const MultiCardInput: FC<MultiCardInputProps> = ({ list, setList }) => {
  const cardPool = useCardPool();
  const cards = useConst(() =>
    cardPool.filter(
      (card) => card.in_supply && !CARDS_TO_REMOVE.includes(card.name)
    )
  );
  const cardNames = useConst(() => cards.map(({ name }) => name));

  const [text, setText] = useState('');
  const [recommendations, setRecommendations] = useState<Array<string>>([]);

  useEffect(() => {
    const fuse = new Fuse(cardNames);
    const recs = fuse.search(text).map(({ item }) => item);
    const filteredRecs = recs.filter((name) => !list.includes(name));
    setRecommendations(filteredRecs);
  }, [text, cardNames, list]);

  const updateList = (item: string, action: 'add' | 'remove') => {
    if (
      action === 'add' &&
      !list.map((i) => i.toLowerCase()).includes(item.toLowerCase())
    ) {
      cardNames.forEach((name) => {
        if (name.toLowerCase() === item.toLowerCase()) {
          setList([...list, name]);
          setText('');
        }
      });
    }
    if (action === 'remove') {
      setList(list.filter((i) => i !== item));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateList(text, 'add');
    }
  };

  const blacklisted = (
    <Wrap w="72" pb="3.5">
      {list.map((card) => (
        <Tag
          key={card}
          borderRadius="full"
          colorScheme="red"
          variant="solid"
          cursor="pointer"
          onClick={() => updateList(card, 'remove')}
          _hover={{
            bgColor: 'red.400',
          }}
        >
          <TagLabel>{card}</TagLabel>
          <TagRightIcon boxSize="2.5" as={FaTimes} />
        </Tag>
      ))}
    </Wrap>
  );

  const recommendedList = (
    <VStack align="start" w="72" pt="1.5">
      {recommendations.map((name) => (
        <Tag
          key={name}
          cursor="pointer"
          colorScheme="green"
          variant="solid"
          borderRadius="full"
          onClick={() => updateList(name, 'add')}
          _hover={{
            bgColor: 'green.400',
          }}
        >
          <TagLeftIcon boxSize="3" as={FaPlus} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </VStack>
  );

  return (
    <Box pt="3.5" pb="7">
      {blacklisted}
      <InputGroup w="72">
        <Input
          pr="10px"
          placeholder="Enter card name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          // @ts-ignore
          onKeyDown={handleKeyDown}
          errorBorderColor="crimson"
        />
        <InputRightElement width="16">
          <Button h="7" size="sm" onClick={() => updateList(text, 'add')}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      {text !== '' && recommendedList}
    </Box>
  );
};
