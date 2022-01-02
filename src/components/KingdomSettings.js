import { EXPANSIONS, PROMOS } from 'lib/constants';
import SelectorList from './SelectorList';
import PropTypes from 'prop-types';
import { expansionType, promoNameType } from 'lib/types';
import { SimpleGrid } from '@chakra-ui/react';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo }) {
	return (
		<SimpleGrid columns={{base: 1, md: 2}} spacingX="10vw">
			<SelectorList
				list={expansions}
				toggle={toggleExpansion}
				options={EXPANSIONS}
				name="Expansions"
			/>
			<SelectorList list={promos} toggle={togglePromo} options={PROMOS} name="Promos"/>
		</SimpleGrid>
	)
}

KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired
}
