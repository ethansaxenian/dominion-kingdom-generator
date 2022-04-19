import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import Card from './Card';
import { Container, Wrap, WrapItem } from '@chakra-ui/react';

export default function CardsDisplay({ data, swapCard, lockCard }) {

  return (
    <Container centerContent maxW="container.lg" p="10px">
      <Wrap spacing="20px" justify="center">
        {data.map((card) => (
          <WrapItem key={card.name}>
            <Card card={card} swapCard={swapCard} lockCard={lockCard}/>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  )
}

CardsDisplay.propTypes = {
  data: PropTypes.arrayOf(cardType).isRequired,
  swapCard: PropTypes.func,
  lockCard: PropTypes.func
}
