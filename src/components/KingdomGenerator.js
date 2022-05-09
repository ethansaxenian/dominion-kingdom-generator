import { useEffect } from 'react';
import KingdomDisplay from './KingdomDisplay';
import { HStack, Text, VStack, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from 'redux/kingdomSlice';
import GenerateKingdomButton from './GenerateKingdomButton';

export default function KingdomGenerator() {
  const { expansions, promos } = useSelector((state) => state.settings);
  const alert = useSelector((state) => state.kingdom.alert);

  const dispatch = useDispatch();

  const alertToast = useToast();

  useEffect(() => {
    if (alert !== '') {
      alertToast({
        title: alert,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      dispatch(setAlert(''));
    }
  }, [alert]);

  return (
    <>
      <VStack w="100%" py="20px" spacing="20px">
        <HStack spacing="20px" alignItems="top">
          <Text fontWeight="bold" w="fit-content" whiteSpace="nowrap">Available pool:</Text>
          <Text>{expansions.concat(promos).join(', ') || 'None'}</Text>
        </HStack>
        <GenerateKingdomButton/>
      </VStack>
      <KingdomDisplay/>
    </>
  )
}
