import { Button } from 'react-bootstrap';
import ModalAlert from './ModalAlert';
import PropTypes from 'prop-types';

export default function GenerateButton({ generateKingdom, alert, setAlert}) {
	return (
		<>
			<Button variant="success" onClick={() => generateKingdom()}>Generate Kingdom!</Button>
			<ModalAlert text={alert} onClose={() => setAlert('')}/>
		</>
	)
}

GenerateButton.propTypes = {
	generateKingdom: PropTypes.func.isRequired,
	alert: PropTypes.string.isRequired,
	setAlert: PropTypes.func.isRequired
}
