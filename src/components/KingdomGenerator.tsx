import { useEffect } from 'react';
import { KingdomDisplay } from './KingdomDisplay';
import { HStack, Text, VStack, useToast } from '@chakra-ui/react';
import { setAlert } from 'state';
import { GenerateKingdomButton } from './GenerateKingdomButton';
import { useAppDispatch, useKingdom, useSettings } from 'hooks';

export const KingdomGenerator = () => {
  const { expansions, promos } = useSettings();
  const { alert } = useKingdom();

  const dispatch = useAppDispatch();

  const alertToast = useToast();

  useEffect(() => {
    if (alert !== '') {
      alertToast({
        title: alert,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(setAlert(''));
    }
  }, [alert, alertToast, dispatch]);

  return (
    <>
      <VStack w="100%" py="5" spacing="5">
        <HStack spacing="5" alignItems="top">
          <Text fontWeight="bold" w="fit-content" whiteSpace="nowrap">
            Available pool:
          </Text>
          <Text>{expansions.concat(promos).join(', ') || 'None'}</Text>
        </HStack>
        <GenerateKingdomButton />
      </VStack>
      <KingdomDisplay />
    </>
  );
};
