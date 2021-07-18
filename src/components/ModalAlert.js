import { Alert, Button, Modal } from "react-bootstrap";

export default function ModalAlert({ text, onClose }) {
  return (
    <Modal show={text} onHide={() => onClose()}>
      <Modal.Body><Alert variant="danger">{text}</Alert></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
