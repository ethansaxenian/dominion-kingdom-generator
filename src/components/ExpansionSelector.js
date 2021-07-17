import { Accordion, Card, Form } from "react-bootstrap";
import { EXPANSIONS } from "../lib/constants";

export default function ExpansionSelector({ toggleExpansion }) {
  const expansionSelectors = EXPANSIONS.map((expansion) =>
    <li key={expansion}>
      <Form.Check
        type="checkbox"
        label={expansion}
        onClick={() => toggleExpansion(expansion)}
      />
    </li>
  );

  return (
    <Accordion>
      <Card style={{width: "30%", margin: "auto"}}>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Select Expansions
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <ul>{expansionSelectors}</ul>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
