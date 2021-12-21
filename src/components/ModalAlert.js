import { Alert, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ModalAlert({ text, onClose }) {
	return (
		<Modal show={text !== ''} onHide={() => onClose()}>
			<Modal.Body><Alert variant="danger" style={{textAlign: 'center'}}>{text}</Alert></Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => onClose()}>
          Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}


ModalAlert.propTypes = {
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
}
