import { Alert, CloseButton, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from '../styles/ModalAlert.module.css';

export default function ModalAlert({ text, onClose }) {
	return (
		<Modal show={text !== ''} onHide={() => onClose()}>
			<Modal.Body>
				<CloseButton className={styles.closeButton} onClick={() => onClose()}/>
				<Alert variant="danger" className={styles.alertText}>{text}</Alert>
			</Modal.Body>
		</Modal>
	)
}

ModalAlert.propTypes = {
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
}
