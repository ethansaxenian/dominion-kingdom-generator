import { Card, Col, Form, Row } from 'react-bootstrap';
import styles from '../styles/Selector.module.css';
import PropTypes from 'prop-types';
import { expansionAmtsType, expansionType, promoNameType } from '../lib/types';

export default function Selector({ list, toggle, options, name, adjustAmts, expansionAmts, setExpansionAmts }) {
	const selectors = options.map((option) => (
		<li key={option} className={styles.checkboxRow}>
			<Row>
				<Col>
					<Form.Check
						type="checkbox"
						label={option}
						checked={list.includes(option)}
						onChange={() => toggle(option)}
					/>
				</Col>
				<Col xs="4">
					{adjustAmts && (
						<Form.Control
							min="0"
							max="10"
							type="number"
							value={expansionAmts[option]}
							onChange={(event) => setExpansionAmts({...expansionAmts, [option]: event.target.value})}
						/>
					)}
				</Col>
			</Row>
		</li>
	));

	return (
		<Card className={styles.selector}>
			<Card.Header className={styles.header}>
				Select {name}
			</Card.Header>
			<Card.Body>
				<ul>{selectors}</ul>
			</Card.Body>
		</Card>
	)
}


Selector.propTypes = {
	list: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	toggle: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	name: PropTypes.oneOf(['Expansions', 'Promos']).isRequired,
	adjustAmts: PropTypes.bool.isRequired,
	expansionAmts: expansionAmtsType,
	setExpansionAmts: PropTypes.func
}
