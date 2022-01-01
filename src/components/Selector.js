import PropTypes from 'prop-types';
import { expansionType, promoNameType } from 'lib/types';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Switch, Text, useColorModeValue, VStack } from '@chakra-ui/react';

export default function Selector({ list, toggle, options, name }) {

	return (
		<Accordion allowToggle w="250px" mt="30px" justify="center" borderColor="transparent">
			<AccordionItem bg={useColorModeValue('gray.100', 'gray.800')}>
				<AccordionButton
					bg={useColorModeValue('gray.300', 'gray.700')}
					_hover={{
						bg: useColorModeValue('gray.400', 'gray.600')
					}}
				>
					<Box flex="1" textAlign="left">
						Select {name}
					</Box>
					<AccordionIcon/>
				</AccordionButton>
				<AccordionPanel py={4}>
					<VStack alignItems="left" m="auto" w="fit-content">
						{options.map((option) => (
							<HStack key={option}>
								<Switch isChecked={list.includes(option)} onChange={() => toggle(option)}/>
								<Text pl="10px" fontWeight="semibold">{option}</Text>
							</HStack>
						))}
					</VStack>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

Selector.propTypes = {
	list: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	toggle: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	name: PropTypes.oneOf(['Expansions', 'Promos']).isRequired
}
