import { EXPANSIONS, Expansion, PROMOS, Promo } from 'lib';
import { SelectorList } from './SelectorList';
import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { MultiCardInput } from './MultiCardInput';
import {
  addExpansion,
  addPromo,
  removeExpansion,
  removePromo,
  setBlacklist,
  setWhitelist,
} from 'state';
import { useAppDispatch, useSettings } from 'hooks';

export const KingdomSettings = () => {
  const { expansions, promos, blacklist, whitelist } = useSettings();
  const dispatch = useAppDispatch();

  const toggleExpansion = (name: Expansion) => {
    const action = expansions.includes(name) ? removeExpansion : addExpansion;
    dispatch(action(name));
  };

  const togglePromo = (name: Promo) => {
    const action = promos.includes(name) ? removePromo : addPromo;
    dispatch(action(name));
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10vw" pb="30px">
        <SelectorList
          list={expansions}
          toggle={toggleExpansion}
          options={EXPANSIONS}
          name="Expansions"
        />
        <SelectorList
          list={promos}
          toggle={togglePromo}
          options={PROMOS}
          name="Promos"
        />
      </SimpleGrid>
      <Divider />
      <Heading pt="30px" size="lg">
        Blacklist Cards:
      </Heading>
      <MultiCardInput
        list={blacklist}
        setList={(val) => dispatch(setBlacklist(val))}
      />
      <Heading pt="30px" size="lg">
        Whitelist Cards:
      </Heading>
      <MultiCardInput
        list={whitelist}
        setList={(val) => dispatch(setWhitelist(val))}
      />
    </>
  );
};
