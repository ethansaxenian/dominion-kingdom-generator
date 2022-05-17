import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, HStack, Switch, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Expansion, Promo } from 'lib';
import { FC, Fragment } from 'react';

export interface SelectorListProps {
  list: Array<Expansion | Promo>;
  toggle: (name: Expansion | Promo) => void;
  options: Array<Expansion | Promo>;
  name: string;
}

export const SelectorList: FC<SelectorListProps> = ({ list, toggle, options, name }) => {
  return (
    <Accordion allowToggle w="250px" mt="30px">
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
  );
};
