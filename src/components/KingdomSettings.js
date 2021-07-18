import { Accordion } from "react-bootstrap";
import { EXPANSIONS, PROMOS } from "../lib/constants";
import Selector from "./Selector";

export default function KingdomSettings({ toggleExpansion, togglePromo }) {

  return (
    <div>
      <Accordion>
        <Selector toggle={toggleExpansion} options={EXPANSIONS} name="Expansions"/>
      </Accordion>
      <Accordion>
        <Selector toggle={togglePromo} options={PROMOS} name="Promos"/>
      </Accordion>
    </div>
  )
}
