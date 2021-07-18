import { Button } from "react-bootstrap";
import ExpansionSelector from "./ExpansionSelector";

export default function KingdomSettings({ toggleExpansion, generateKingdom }) {
  return (
    <div>
      <ExpansionSelector toggleExpansion={toggleExpansion}/>
      <br/>
      <Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
    </div>
  )
}
