import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import Card from './Card';
import { Container, Wrap, WrapItem } from '@chakra-ui/react';

export default function CardsDisplay({ data, swap, lock, blackMarket }) {

  return (
    <Container centerContent maxW="container.lg" p="10px">
      <Wrap spacing="20px" justify="center">
        {data.map((card) => (
          <WrapItem key={card.name}>
            <Card card={card} swap={swap} lock={lock} blackMarket={blackMarket}/>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  )
}

CardsDisplay.propTypes = {
  data: PropTypes.arrayOf(cardType).isRequired,
  swap: PropTypes.bool.isRequired,
  lock: PropTypes.bool.isRequired,
  blackMarket: PropTypes.bool
}
