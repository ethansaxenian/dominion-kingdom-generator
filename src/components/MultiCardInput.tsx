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
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { CARDS_TO_REMOVE } from 'lib';
import { useCardPool } from 'hooks';

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
          <TagRightIcon boxSize="2.5" as={CloseIcon} />
        </Tag>
      ))}
    </Wrap>
  );

  const recommendations = useMemo(
    () =>
      cardNames.filter(
        (name) =>
          name.toLowerCase().substring(0, text.length) === text.toLowerCase() &&
          !list.includes(name)
      ),
    [list, text, cardNames]
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
          <TagLeftIcon boxSize="3" as={AddIcon} />
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
