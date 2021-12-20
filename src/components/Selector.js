import { Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/Selector.module.css";

export default function Selector({ list, toggle, options, name, adjustAmts, expansionAmts, setExpansionAmts }) {
  const selectors = options.map((option) =>
    <li key={option} style={{margin: 5}}>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label={option}
						checked={list.includes(option)}
            onChange={() => toggle(option)}
          />
        </Col>
        <Col xs="4">
          {adjustAmts && (
            <Form.Control
              min="0"
              max="10"
              type="number"
              value={expansionAmts[option]}
              onChange={(event) => setExpansionAmts({...expansionAmts, [option]: event.target.value})}
            />
          )}
        </Col>
      </Row>
    </li>
  );

  return (
    <Card>
      <Card.Header className={styles.header}>
        Select {name}
      </Card.Header>
      <Card.Body>
        <ul>{selectors}</ul>
      </Card.Body>
    </Card>
  )
}
