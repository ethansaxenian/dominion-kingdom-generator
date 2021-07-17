import styles from '../styles/CardsDisplay.module.css';
import { Figure } from 'react-bootstrap';

export default function CardsDisplay({ data }) {
  const cards = data.map(({ name, img, link }) => (
    <li key={name}>
      <a href={link}><Figure.Image src={img} alt={name}/></a>
    </li>
  ));

  return (
    <ul className={styles.cardsList}>{cards}</ul>
  )
}
