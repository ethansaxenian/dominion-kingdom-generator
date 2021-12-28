import { Accordion, Card, Form } from 'react-bootstrap';
import styles from '../styles/Selector.module.css';
import PropTypes from 'prop-types';
import { expansionType, promoNameType } from '../lib/types';

export default function Selector({ list, toggle, options, name }) {
	const selectors = options.map((option) => (
		<Form.Check
			key={option}
			type="switch"
			label={option}
			checked={list.includes(option)}
			onChange={() => toggle(option)}
			className={styles.checkboxRow}
		/>
	));

	return (
		<Accordion className={styles.selector} as={Card}>
			<Accordion.Header>
				Select {name}
			</Accordion.Header>
			<Accordion.Body className={styles.checklist}>
				{selectors}
			</Accordion.Body>
		</Accordion>
	)
}

Selector.propTypes = {
	list: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	toggle: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.oneOfType([expansionType, promoNameType])).isRequired,
	name: PropTypes.oneOf(['Expansions', 'Promos']).isRequired
}
