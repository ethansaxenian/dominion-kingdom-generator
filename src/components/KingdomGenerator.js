import { useState } from "react";
import { arrayIncludesCard, arrayIncludesCardName, drawCard, isValidKingdomCard, sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";
import _ from 'lodash';
import ExpansionSelector from "./ExpansionSelector";
import { Button } from "react-bootstrap";

export default function KingdomGenerator({ cards }) {
  const [kingdom, setKingdom] = useState([]);
  const [expansions, setExpansions] = useState([]);

  const availableCards = cards.filter((card) => isValidKingdomCard(card) && expansions.includes(card.expansion));

  const remainingCards = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));

  const generateKingdom = () => {
    const newKingdom = _.sampleSize(availableCards, 10);
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(newKingdom, card));
    if (arrayIncludesCardName(newKingdom, 'Young Witch')) {
      const bane = drawCard(notInKingdom, (card) => ((card.coins === 2) || (card.coins === 3)))
      bane && newKingdom.push({...bane, bane: true});
    }
    setKingdom(newKingdom)
  }

  const swapCard = (name) => {
    const newCard = _.sample(remainingCards);
    setKingdom([...kingdom.filter((card) => card.name !== name), newCard]);
  }

  const toggleExpansion = (name) => {
    expansions.includes(name)
    ? setExpansions(expansions.filter((exp) => exp !== name))
    : setExpansions([...expansions, name])
  }

  return (
    <div>
      <ExpansionSelector toggleExpansion={toggleExpansion}/>
      <br/>
      <Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
      <br/>
      <br/>
      <CardsDisplay data={kingdom.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={200}/>
    </div>
  )
}
