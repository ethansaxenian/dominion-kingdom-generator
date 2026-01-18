import { EXPANSIONS, type Expansion, PROMOS, type Promo } from "@/lib";
import { SelectorList } from "./SelectorList";
import { Separator } from "@/components/ui/separator";
import { MultiCardInput } from "./MultiCardInput";
import {
  addExpansion,
  addPromo,
  removeExpansion,
  removePromo,
  setBlacklist,
  setWhitelist,
} from "@/state";
import { useAppDispatch, useSettings } from "@/hooks";

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
      <span className="flex flex-col items-center md:flex-row justify-evenly pb-8">
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
      </span>
      <Separator />
      <span className="flex flex-col items-center md:items-start md:flex-row justify-evenly">
        <span>
          <h2 className="pt-8 text-2xl font-bold text-center">
            Blacklist Cards
          </h2>
          <MultiCardInput
            list={blacklist}
            setList={(val) => dispatch(setBlacklist(val))}
          />
        </span>
        <span>
          <h2 className="pt-8 text-2xl font-bold text-center">
            Whitelist Cards
          </h2>
          <MultiCardInput
            list={whitelist}
            setList={(val) => dispatch(setWhitelist(val))}
          />
        </span>
      </span>
    </>
  );
};
