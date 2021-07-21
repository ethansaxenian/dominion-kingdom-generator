import _ from "lodash";
import { min } from "mathjs";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { arrayIncludesCard, arrayIncludesCardName, drawCards, sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";

export default function KingdomDisplay({ kingdom, landscapes, swapCard, swapLandscape, usePlatinumColony, platinumColony, blackMarketOptions }) {
  const [blackMarketDeck, setBlackMarketDeck] = useState([]);

  useEffect(() => {
    if (!arrayIncludesCardName(kingdom, 'Black Market')) {
      setBlackMarketDeck([]);
    }
  }, [kingdom]);

  const generateBlackMarketDeck = () => {
    setBlackMarketDeck(_.sampleSize(blackMarketOptions, min(blackMarketOptions.length, 10)));
  }

  console.log(blackMarketOptions)

  const swapBMCard = (oldCard) => {
    const newOptions = blackMarketOptions.filter((card) => !arrayIncludesCard(blackMarketDeck, card));
    console.log(newOptions)
    if (newOptions.length > 0) {
      const newBMDeck = blackMarketDeck.filter((card) => card.name !== oldCard.name);
      const [newCard] = drawCards(newOptions, 1);
      console.log(newCard);
      setBlackMarketDeck([...newBMDeck, newCard]);
    }
  }

  return (
    <>
      <CardsDisplay data={kingdom.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={170}/>
      <Row>
        {(landscapes.length > 0) && (
          <Col>
            <CardsDisplay data={landscapes.sort((card1, card2) => sortTwoCards(card1, card2, 'name'))} swapCard={swapLandscape}/>
          </Col>
        )}
        {usePlatinumColony && (
          <Col>
            <CardsDisplay data={platinumColony} cardWidth={150}/>
          </Col>
        )}
      </Row>
      <br/>
      {arrayIncludesCardName(kingdom, 'Black Market') && (
        <>
          <Button onClick={() => generateBlackMarketDeck()}>Generate Black Market Deck</Button>
          {(blackMarketDeck.length > 0) && (
            <>
              <br/>
              <br/>
              <CardsDisplay
                data={blackMarketDeck.sort((card1, card2) => sortTwoCards(card1, card2, 'name'))}
                swapCard={swapBMCard}
                cardWidth={170}
              />
            </>
          )}
        </>
      )}
    </>
  )
}
