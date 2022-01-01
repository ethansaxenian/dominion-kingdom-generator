import { EXPANSIONS, PROMOS } from 'lib/constants';
import Selector from './Selector';
import PropTypes from 'prop-types';
import { expansionType, promoNameType } from 'lib/types';
import { SimpleGrid } from '@chakra-ui/react';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo }) {
	return (
		<SimpleGrid columns={{base: 1, md: 2}} spacingX="10vw">
			<Selector
				list={expansions}
				toggle={toggleExpansion}
				options={EXPANSIONS}
				name="Expansions"
			/>
			<Selector list={promos} toggle={togglePromo} options={PROMOS} name="Promos"/>
		</SimpleGrid>
	)
}

KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired
}
