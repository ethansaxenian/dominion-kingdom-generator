import styles from '../styles/CardsDisplay.module.css';
import { Image } from 'react-bootstrap';

export default function CardsDisplay({ data }) {
  const cards = data.map(({ name, img, link }) => (
    <li key={name}>
      <a href={link}><Image src={img} alt={name}/></a>
    </li>
  ));

  return (
    <ul className={styles.cardsList}>{cards}</ul>
  )
}
