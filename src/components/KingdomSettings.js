import { Accordion, Button } from "react-bootstrap";
import { EXPANSIONS, PROMOS } from "../lib/constants";
import Selector from "./Selector";

export default function KingdomSettings({ toggleExpansion, togglePromo, generateKingdom }) {
  return (
    <div>
      <Accordion>
        <Selector toggle={toggleExpansion} options={EXPANSIONS} name="Expansions"/>
        <Selector toggle={togglePromo} options={PROMOS} name="Promos"/>
      </Accordion>
      <br/>
      <Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
    </div>
  )
}
