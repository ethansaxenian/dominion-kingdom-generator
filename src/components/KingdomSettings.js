import { Accordion, Col } from "react-bootstrap";
import { EXPANSIONS, PROMOS } from "../lib/constants";
import Selector from "./Selector";

export default function KingdomSettings({ toggleExpansion, togglePromo, expansionAmts, setExpansionAmts }) {

  return (
    <>
      <Col xs={{span: 10, offset: 1}} sm={{span: 8, offset: 2}} md={{span: 4, offset: 4}}>
        <Accordion>
          <Selector
            toggle={toggleExpansion}
            options={EXPANSIONS}
            name="Expansions"
            adjustAmts
            expansionAmts={expansionAmts}
            setExpansionAmts={setExpansionAmts}
          />
        </Accordion>
      </Col>
      <Col xs={{span: 10, offset: 1}} sm={{span: 8, offset: 2}} md={{span: 4, offset: 4}}>
        <Accordion>
          <Selector toggle={togglePromo} options={PROMOS} name="Promos"/>
        </Accordion>
      </Col>
    </>
  )
}
