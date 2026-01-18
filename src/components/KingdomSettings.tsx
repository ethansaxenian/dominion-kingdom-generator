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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[10vw] pb-8">
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
      </div>
      <Separator />
      <h2 className="pt-8 text-2xl font-bold">Blacklist Cards:</h2>
      <MultiCardInput
        list={blacklist}
        setList={(val) => dispatch(setBlacklist(val))}
      />
      <h2 className="pt-8 text-2xl font-bold">Whitelist Cards:</h2>
      <MultiCardInput
        list={whitelist}
        setList={(val) => dispatch(setWhitelist(val))}
      />
    </>
  );
};
