import { Button } from "react-bootstrap";
import ModalAlert from "./ModalAlert";

export default function GenerateButton({ generateKingdom, alert, setAlert}) {
  return (
    <>
      <Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
      <ModalAlert text={alert} onClose={() => setAlert('')}/>
    </>
  )
}
