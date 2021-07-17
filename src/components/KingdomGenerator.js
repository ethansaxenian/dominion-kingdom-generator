import { useState } from "react";
import { addExtraCards, arrayIncludesCard, drawCards, isValidKingdomCard, sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";
import ExpansionSelector from "./ExpansionSelector";
import { Button } from "react-bootstrap";

export default function KingdomGenerator({ cards }) {
  const [kingdom, setKingdom] = useState([]);
  const [expansions, setExpansions] = useState([]);

  const availableCards = cards.filter((card) => isValidKingdomCard(card) && expansions.includes(card.expansion));

  const remainingCards = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));

  const addCards = (num, add) => {
    const newCards = drawCards(remainingCards, num);
    const newKingdom = add ? [...kingdom, ...newCards] : newCards;
    setKingdom(addExtraCards(newKingdom, availableCards));
  }

  const swapCard = (oldCard) => {
    let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
    if (oldCard.name === 'Young Witch') {
      newKingdom = newKingdom.filter((card) => !card.bane);
    }
    if (!oldCard.bane) {
      const [newCard] = drawCards(remainingCards, 1);
      newKingdom.push(newCard);
    }
    setKingdom(addExtraCards(newKingdom, remainingCards));
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
      <Button variant="success" onClick={() => addCards(10)}>Generate Kingdom!</Button>
      <Button variant="success" onClick={() => addCards(1, true)}>Add Single Card</Button>
      <Button variant="success" onClick={() => setKingdom([])}>Clear</Button>
      <br/>
      <br/>
      <CardsDisplay data={kingdom.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={200}/>
    </div>
  )
}
