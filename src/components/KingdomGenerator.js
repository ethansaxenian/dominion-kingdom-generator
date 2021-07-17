import { useState } from "react";
import { addExtraCards, arrayIncludesCard, drawCards, isLandscape, isValidKingdomCard, sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";
import ExpansionSelector from "./ExpansionSelector";
import { Alert, Button } from "react-bootstrap";
import { combinations } from "mathjs";

export default function KingdomGenerator({ cards }) {
  const [kingdom, setKingdom] = useState([]);
  const [landscapes, setLandScapes] = useState([]);
  const [expansions, setExpansions] = useState([]);

  const availableCards = cards.filter((card) => isValidKingdomCard(card) && expansions.includes(card.expansion));
  const availableLandscapes = cards.filter((card) => isLandscape(card) && expansions.includes(card.expansion));

  const remainingCards = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));
  const remainingLandscapes = availableLandscapes.filter((card) => !arrayIncludesCard(landscapes, card));

  const generateKingdom = () => {
    const newKingdom = drawCards(remainingCards, 10);
    const newLandscapes = drawCards(remainingLandscapes, 2);
    setKingdom(addExtraCards(newKingdom, newLandscapes, availableCards));
    setLandScapes(newLandscapes);
  }

  const swapCard = (oldCard) => {
    let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
    if (oldCard.name === 'Young Witch') {
      newKingdom = newKingdom.filter((card) => !card.bane);
    }
    if (!oldCard.bane && !oldCard.wotm) {
      const [newCard] = drawCards(remainingCards, 1);
      newKingdom.push(newCard);
    }
    setKingdom(addExtraCards(newKingdom, landscapes, remainingCards));
  }

  const swapLandscape = (oldCard) => {
    let newLandscapes = landscapes.filter((card) => card.name !== oldCard.name);
    let newKingdom = kingdom;
    if (oldCard.name === 'Way of the Mouse') {
      newKingdom = newKingdom.filter((card) => !card.wotm);
    }
    const [newCard] = drawCards(remainingLandscapes, 1);
    newLandscapes = [...newLandscapes, newCard];
    setLandScapes(newLandscapes);
    setKingdom(addExtraCards(newKingdom, newLandscapes, remainingCards));
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
      {(kingdom.length !== 0) && (
        <Alert>
          Don't like this kingdom? Luckily for you, there are over {combinations(availableCards.length, 10) * combinations(availableLandscapes.length, 10)} different combinations to choose from!
        </Alert>
      )}
      <Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
      <br/>
      <br/>
      <CardsDisplay data={kingdom.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={200}/>
      <CardsDisplay data={landscapes} swapCard={swapLandscape}/>
    </div>
  )
}
