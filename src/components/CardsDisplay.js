import styles from '../styles/CardsDisplay.module.css';
import { Button, Card, Figure } from 'react-bootstrap';

export default function CardsDisplay({ data, swapCard, cardWidth }) {
  const cards = data.map(({ name, img, link, bane }) => (
    <li key={name}>
      <Card>
        <a href={link}><Figure.Image width={cardWidth} src={img} alt={name}/></a>
        <Card.Body>
          {bane && <Card.Text>Bane Card</Card.Text>}
          {swapCard && <Button size="sm" variant="danger" onClick={() => swapCard(name)}>Swap</Button>}
        </Card.Body>
      </Card>
    </li>
  ));

  return (
    <ul className={styles.cardsList}>{cards}</ul>
  )
}
