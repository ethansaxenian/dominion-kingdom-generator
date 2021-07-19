import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../styles/Selector.module.css";

export default function Selector({ toggle, options, name, adjustAmts, expansionAmts, setExpansionAmts }) {
  const selectors = options.map((option) =>
    <li key={option} style={{margin: 5}}>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label={option}
            onClick={() => toggle(option)}
          />
        </Col>
        <Col xs="10" sm="8" md="4" lg="3">
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
    <Card className={styles.selector}>
      <Accordion.Toggle as={Card.Header} eventKey={name} className={styles.header}>
        Select {name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={name}>
        <ul>{selectors}</ul>
      </Accordion.Collapse>
    </Card>
  )
}
