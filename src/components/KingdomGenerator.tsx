import { useEffect } from "react";
import { KingdomDisplay } from "./KingdomDisplay";
import { toast } from "sonner";
import { setAlert } from "@/state";
import { GenerateKingdomButton } from "./GenerateKingdomButton";
import { useAppDispatch, useKingdom, useSettings } from "@/hooks";

export const KingdomGenerator = () => {
  const { expansions, promos } = useSettings();
  const { alert } = useKingdom();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alert !== "") {
      toast.error(alert);
      dispatch(setAlert(""));
    }
  }, [alert, dispatch]);

  return (
    <>
      <div className="flex flex-col items-center w-full py-5 gap-5">
        <div className="flex gap-5 items-start">
          <span className="font-bold whitespace-nowrap">Available pool:</span>
          <span>{expansions.concat(promos).join(", ") || "None"}</span>
        </div>
        <GenerateKingdomButton />
      </div>
      <KingdomDisplay />
    </>
  );
};
