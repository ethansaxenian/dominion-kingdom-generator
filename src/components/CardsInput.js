import { Box, Button, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel, TagLeftIcon, VStack, Wrap } from '@chakra-ui/react';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';

export default function CardsInput({ list, setList, cardNames }) {
	const [text, setText] = useState('');
	const [invalid, setInvalid] = useState(false);

	const updateList = (item, action) => {
		if (action === 'add' && !list.map((i) => i.toLowerCase()).includes(item.toLowerCase())) {
			cardNames.forEach((name) => {
				if (name.toLowerCase() === item.toLowerCase()) {
					setList([...list, name]);
					setText('');
					return;
				}
			});
			setInvalid(true);
		}
		if (action === 'remove') {
			setList(list.filter((i) => i !== item));
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			updateList(text, 'add');
		} else {
			setInvalid(false);
		}
	}

	const blacklisted = (
		<Wrap w="300px" pb="15px">
			{list.sort().map((card) => (
				<Tag
					key={card}
					borderRadius="full"
					colorScheme="red"
					variant="solid"
					cursor="pointer"
					onClick={() => updateList(card, 'remove')}
					_hover={{
						bgColor: 'red.400'
					}}
				>
					<TagLabel>{card}</TagLabel>
					<TagCloseButton/>
				</Tag>
			))}
		</Wrap>
	);

	const recommendations = cardNames.filter(
		(name) => (name.toLowerCase().substring(0, text.length) === text.toLowerCase() && !list.includes(name))
	);

	const recommendedList = (
		<VStack align="start" w="300px" pt="5px">
			{recommendations.map((name) => (
				<Tag
					key={name}
					cursor="pointer"
					colorScheme="green"
					variant="solid"
					borderRadius="full"
					onClick={() => updateList(name, 'add')}
					_hover={{
						bgColor: 'green.400'
					}}
				>
					<TagLeftIcon boxSize="12px" as={AddIcon}/>
					<TagLabel>{name}</TagLabel>
				</Tag>
			))}
		</VStack>
	);

	return (
		<Box pt="15px" pb="30px">
			{blacklisted}
			<InputGroup w="300px">
				<Input
					pr="10px"
					placeholder="Enter card name"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					onClick={() => setInvalid(false)}
					errorBorderColor="crimson"
					isInvalid={invalid}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={() => updateList(text, 'add')}>Add</Button>
				</InputRightElement>
			</InputGroup>
			{text !== '' && recommendedList}
		</Box>
	)
}

CardsInput.propTypes = {
	list: PropTypes.arrayOf(cardType).isRequired,
	setList: PropTypes.func.isRequired,
	cardNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}
