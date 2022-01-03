import { EXPANSIONS, PROMOS } from 'lib/constants';
import SelectorList from './SelectorList';
import PropTypes from 'prop-types';
import { cardType, expansionType, promoNameType } from 'lib/types';
import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import MultiCardInput from './MultiCardInput';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo, blacklist, setBlacklist, cards }) {
	return (
		<>
			<SimpleGrid columns={{base: 1, md: 2}} spacingX="10vw" pb="30px">
				<SelectorList
					list={expansions}
					toggle={toggleExpansion}
					options={EXPANSIONS}
					name="Expansions"
				/>
				<SelectorList list={promos} toggle={togglePromo} options={PROMOS} name="Promos"/>
			</SimpleGrid>
			<Divider/>
			<Heading pt="30px" size="lg">Blacklist Cards:</Heading>
			<MultiCardInput list={blacklist} setList={setBlacklist} cardNames={cards.map(({name}) => name)}/>
		</>
	)
}

KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired,
	blacklist: PropTypes.arrayOf(cardType).isRequired,
	setBlacklist: PropTypes.func.isRequired,
	cards: PropTypes.arrayOf(cardType).isRequired,
}
