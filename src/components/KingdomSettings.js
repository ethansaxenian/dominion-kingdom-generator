import { Accordion } from "react-bootstrap";
import { EXPANSIONS, PROMOS } from "../lib/constants";
import Selector from "./Selector";

export default function KingdomSettings({ toggleExpansion, togglePromo, expansionAmts, setExpansionAmts }) {

  return (
    <>
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
      <Accordion>
        <Selector toggle={togglePromo} options={PROMOS} name="Promos"/>
      </Accordion>
    </>
  )
}
