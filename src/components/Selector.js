import { Accordion, Card, Form } from "react-bootstrap";
import styles from "../styles/Selector.module.css";

export default function Selector({ toggle, options, name }) {
  const selectors = options.map((option) =>
    <li key={option}>
      <Form.Check
        type="checkbox"
        label={option}
        onClick={() => toggle(option)}
      />
    </li>
  );

  return (
    <Card className={styles.selector}>
      <Accordion.Toggle as={Card.Header} eventKey="0" className={styles.header}>
        Select {name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <ul>{selectors}</ul>
      </Accordion.Collapse>
    </Card>
  )
}
