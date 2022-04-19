import { EXPANSIONS, PROMOS } from 'lib/constants';
import SelectorList from './SelectorList';
import PropTypes from 'prop-types';
import { expansionType, promoNameType } from 'lib/types';
import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import MultiCardInput from './MultiCardInput';

export default function KingdomSettings({ expansions, promos, toggle, blacklist, whitelist, setList }) {
  return (
    <>
      <SimpleGrid columns={{base: 1, md: 2}} spacingX="10vw" pb="30px">
        <SelectorList
          list={expansions}
          toggle={(name) => toggle(name, 'expansion')}
          options={EXPANSIONS}
          name="Expansions"
        />
        <SelectorList list={promos} toggle={(name) => toggle(name, 'promo')} options={PROMOS} name="Promos"/>
      </SimpleGrid>
      <Divider/>
      <Heading pt="30px" size="lg">Blacklist Cards:</Heading>
      <MultiCardInput list={blacklist} setList={(val) => setList(val, 'blacklist')}/>
      <Heading pt="30px" size="lg">Whitelist Cards:</Heading>
      <MultiCardInput list={whitelist} setList={(val) => setList(val, 'whitelist')}/>
    </>
  )
}

KingdomSettings.propTypes = {
  expansions: PropTypes.arrayOf(expansionType).isRequired,
  promos: PropTypes.arrayOf(promoNameType).isRequired,
  toggle: PropTypes.func.isRequired,
  blacklist: PropTypes.arrayOf(PropTypes.string).isRequired,
  whitelist: PropTypes.arrayOf(PropTypes.string).isRequired,
  setList: PropTypes.func.isRequired,
}
