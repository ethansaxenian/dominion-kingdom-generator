import { EXPANSIONS, PROMOS } from '../lib/constants';
import Selector from './Selector';
import PropTypes from 'prop-types';
import { expansionAmtsType, expansionType, promoNameType } from '../lib/types';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo, expansionAmts, setExpansionAmts }) {
	return (
		<>
			<Selector
				list={expansions}
				toggle={toggleExpansion}
				options={EXPANSIONS}
				name="Expansions"
				adjustAmts
				expansionAmts={expansionAmts}
				setExpansionAmts={setExpansionAmts}
			/>
			<Selector list={promos} toggle={togglePromo} options={PROMOS} name="Promos" adjustAmts={false}/>
		</>
	)
}

KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired,
	expansionAmts: expansionAmtsType.isRequired,
	setExpansionAmts: PropTypes.func.isRequired
}
