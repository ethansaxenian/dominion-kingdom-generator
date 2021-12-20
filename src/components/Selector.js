import { Accordion, Col, Form, Row } from "react-bootstrap";
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
        <Col xs="4" sm="3" md="4" lg="3">
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
    <Accordion.Item>
      <Accordion.Header eventKey={name} className={styles.header}>
        Select {name}
      </Accordion.Header>
      <Accordion.Body eventKey={name}>
        <ul>{selectors}</ul>
      </Accordion.Body>
    </Accordion.Item>
  )
}
