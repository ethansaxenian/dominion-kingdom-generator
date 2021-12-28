import { EXPANSIONS, PROMOS } from '../lib/constants';
import Selector from './Selector';
import PropTypes from 'prop-types';
import { expansionType, promoNameType } from '../lib/types';
import { Col, Row } from 'react-bootstrap';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo }) {
	return (
		<Row xs="1" md="2">
			<Col>
				<Selector
					list={expansions}
					toggle={toggleExpansion}
					options={EXPANSIONS}
					name="Expansions"
				/>
			</Col>
			<Col>
				<Selector list={promos} toggle={togglePromo} options={PROMOS} name="Promos"/>
			</Col>
		</Row>
	)
}

KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired
}
