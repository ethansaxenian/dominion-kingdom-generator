import styles from '../styles/CardsDisplay.module.css';
import { Button, Card, Figure } from 'react-bootstrap';

export default function CardsDisplay({ data, swapCard, cardWidth }) {
  const cards = data.map((card) => (
    <li key={card.name}>
      <Card>
        <a href={card.link} target="_blank" rel="noopener noreferrer">
          <Figure.Image width={cardWidth} src={process.env.PUBLIC_URL + card.img} alt={card.name}/>
        </a>
        <Card.Body>
          {card.bane && <Card.Text>Bane Card</Card.Text>}
          {card.wotm && <Card.Text>Way of the Mouse</Card.Text>}
          {swapCard && <Button size="sm" variant="danger" onClick={() => swapCard(card)}>Swap</Button>}
        </Card.Body>
      </Card>
    </li>
  ));

  return (
    <ul className={styles.cardsList}>{cards}</ul>
  )
}
