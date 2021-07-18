import { Col, Row } from "react-bootstrap";
import { sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";

export default function KingdomDisplay({ kingdom, landscapes, swapCard, swapLandscape, usePlatinumColony, platinumColony }) {
  return (
    <div>
      <CardsDisplay data={kingdom.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={200}/>
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
    </div>
  )
}
