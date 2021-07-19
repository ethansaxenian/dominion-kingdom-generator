import { useState } from "react";
import { addExtraCards, arrayIncludesCard, drawCards, hasValidExpansion, isLandscape, isValidKingdomCard, sortTwoCards } from "../lib/utils";
import { Alert } from "react-bootstrap";
import { combinations, min, sum } from "mathjs";
import _ from "lodash";
import KingdomSettings from "./KingdomSettings";
import KingdomDisplay from "./KingdomDisplay";
import { EXPANSIONS } from "../lib/constants";
import GenerateButton from "./GenerateButton";

export default function KingdomGenerator({ cards }) {
  const [kingdom, setKingdom] = useState([]);
  const [landscapes, setLandScapes] = useState([]);
  const [expansions, setExpansions] = useState([]);
  const [promos, setPromos] = useState([]);
  const [usePlatinumColony, setUsePlatinumColony] = useState(false);
  const [alert, setAlert] = useState('');
  const [expansionAmts, setExpansionAmts] = useState(_.fromPairs(EXPANSIONS.map((name) => [name, ''])));

  const availableCards = cards.filter((card) =>
    isValidKingdomCard(card)
    && (hasValidExpansion(card, expansions) || promos.includes(card.name))
  );

  const availableLandscapes = cards.filter((card) =>
    isLandscape(card)
    && (hasValidExpansion(card, expansions) || promos.includes(card.name))
  );

  const remainingCards = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));
  const remainingLandscapes = availableLandscapes.filter((card) => !arrayIncludesCard(landscapes, card));

  const generateKingdom = () => {
    if (sum(_.toPairs(expansionAmts).map(([exp, amt]) => (expansions.includes(exp) ? amt : 0))) > 10) {
      setAlert('Kingdom can\'t include more than 10 cards!')
      return
    }
    let newKingdom = [];
    if (_.values(expansionAmts).some((str) => !str)) {
      newKingdom = generateKingdomFromRules();
    } else {
      newKingdom = drawCards(availableCards, 10);
    }
    if (newKingdom.length < 10) {
      setAlert('You need at least 10 kingdom cards!')
      return
    }
    const newLandscapes = drawCards(availableLandscapes, min(2, availableLandscapes.length));
    const leftovers = availableCards.filter((card) => !arrayIncludesCard(newKingdom, card));
    setKingdom(addExtraCards(newKingdom, newLandscapes, leftovers));
    setLandScapes(newLandscapes);
    if (newKingdom.length > 0) {
      setUsePlatinumColony(_.sample(newKingdom).expansion === 'Prosperity');
    }
  }

  const generateKingdomFromRules = () => {
    const newCards = [];
    const extraExpansions = [];
    _.toPairs(expansionAmts).forEach(([exp, amt]) => {
      if (amt !== '') {
        newCards.push(
          ...drawCards(availableCards, +amt, ((card) => hasValidExpansion(card, [exp]) && !arrayIncludesCard(newCards, card)))
        );
      } else if (expansions.includes(exp)) {
        extraExpansions.push(exp);
      }
    });
    const leftovers = availableCards.filter((card) => !arrayIncludesCard(newCards, card));
    console.log(extraExpansions)
    return newCards.concat(drawCards(leftovers, 10 - newCards.length, ((card) => hasValidExpansion(card, extraExpansions))));
  }

  const swapCard = (oldCard) => {
    if (remainingCards.length < 10) {
      setAlert('There are no available kingdom cards to swap!')
      return
    }
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
    if (remainingLandscapes.length < 10) {
      setAlert('There are no available landscapes to swap!')
      return
    }
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

  const togglePromo = (name) => {
    promos.includes(name)
    ? setPromos(promos.filter((promo) => promo !== name))
    : setPromos([...promos, name])
  }

  const platinumColony = cards.filter((card) => card.name === 'Platinum' || card.name === 'Colony').sort((a, b) => sortTwoCards(a, b, 'cost'));

  return (
    <>
      <KingdomSettings
        toggleExpansion={toggleExpansion}
        togglePromo={togglePromo}
        expansionAmts={expansionAmts}
        setExpansionAmts={setExpansionAmts}
      />
      <br/>
      <GenerateButton generateKingdom={generateKingdom} alert={alert} setAlert={setAlert}/>
      <br/>
      <br/>
      <KingdomDisplay
        kingdom={kingdom}
        landscapes={landscapes}
        swapCard={swapCard}
        swapLandscape={swapLandscape}
        usePlatinumColony={usePlatinumColony}
        platinumColony={platinumColony}
      />
      {((kingdom.length >= 10) && (availableCards.length > 0)) && (
        <Alert variant="success" style={{width: '50%', margin: 'auto', marginTop: 20, marginBottom: 20}}>
          Don't like this kingdom? Luckily for you, there are over {2 * combinations(availableCards.length, 10) * ((availableLandscapes.length >= 2) ? combinations(availableLandscapes.length, 2) : 1)} different combinations to choose from!
        </Alert>
      )}
    </>
  )
}
