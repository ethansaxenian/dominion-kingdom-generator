import { CloseButton, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from '../styles/ModalAlert.module.css';

export default function ModalAlert({ text, onClose }) {
	return (
		<Modal show={text !== ''} onHide={() => onClose()} centered>
			<Modal.Body className={styles.modalBody}>
				<CloseButton className={styles.closeButton} onClick={() => onClose()}/>
				<div className={styles.alertText}>{text}</div>
			</Modal.Body>
		</Modal>
	)
}

ModalAlert.propTypes = {
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
}
