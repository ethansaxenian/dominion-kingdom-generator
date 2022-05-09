import PropTypes from 'prop-types';
import { expansionType, promoNameType } from 'lib/types';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, HStack, Switch, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Fragment } from 'react';

export default function SelectorList({ list, toggle, options, name }) {
  return (
    <Accordion allowToggle w="250px" mt="30px" justify="center">
      <AccordionItem bg={useColorModeValue('gray.100', 'gray.800')} border="1px solid gray" borderRadius="8px">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              bg={useColorModeValue('gray.300', 'gray.700')}
              _hover={{
                bg: useColorModeValue('gray.400', 'gray.600')
              }}
              p="15px"
              borderTopRadius="8px"
              borderBottomRadius={isExpanded ? 'none' : '8px'}
            >
              <Box flex="1" textAlign="left">
                Select {name}
              </Box>
              <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel py={4}>
              <VStack alignItems="left" m="auto" w="fit-content">
                {options.map((option) => (
                  <Fragment key={option}>
                    <HStack justify="space-between">
                      <Text fontWeight="semibold" pr="15px">{option}</Text>
                      <Switch isChecked={list.includes(option)} onChange={() => toggle(option)} ml="auto"/>
                    </HStack>
                    <Divider/>
                  </Fragment>
                ))}
              </VStack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

SelectorList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
  toggle: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
  name: PropTypes.oneOf(['Expansions', 'Promos']).isRequired
}
