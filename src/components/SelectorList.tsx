import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { Expansion, Promo } from "@/lib";
import { type FC, Fragment } from "react";

export interface SelectorListProps {
  list: Array<Expansion | Promo>;
  toggle: (name: Expansion | Promo) => void;
  options: Array<Expansion | Promo>;
  name: string;
}

export const SelectorList: FC<SelectorListProps> = ({
  list,
  toggle,
  options,
  name,
}) => {
  return (
    <Accordion type="single" collapsible className="w-64 mt-8">
      <AccordionItem
        value="item-1"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800"
      >
        <AccordionTrigger className="px-4 py-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-t-lg data-[state=closed]:rounded-b-lg">
          <span>Select {name}</span>
        </AccordionTrigger>
        <AccordionContent className="py-4">
          <div className="flex flex-col items-start mx-auto w-fit gap-2">
            {options.map((option) => (
              <Fragment key={option}>
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold pr-4">{option}</span>
                  <Switch
                    checked={list.includes(option)}
                    onCheckedChange={() => toggle(option)}
                    className="ml-auto"
                  />
                </div>
                <Separator />
              </Fragment>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
