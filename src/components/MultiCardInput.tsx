import { Input } from "@/components/ui/input";
import { FaPlus, FaTimes } from "react-icons/fa";
import { type FC, useState, useMemo } from "react";
import { CARDS_TO_REMOVE } from "@/lib";
import { useCardPool } from "@/hooks";
import Fuse from "fuse.js";

export interface MultiCardInputProps {
  list: Array<string>;
  setList: (arr: Array<string>) => void;
}

export const MultiCardInput: FC<MultiCardInputProps> = ({ list, setList }) => {
  const cardPool = useCardPool();
  const cards = cardPool.filter(
    (card) => card.in_supply && !CARDS_TO_REMOVE.includes(card.name),
  );
  const cardNames = cards.map(({ name }) => name);

  const [text, setText] = useState("");

  const recommendations = useMemo<Array<string>>(() => {
    const fuse = new Fuse(cardNames);
    const recs = fuse.search(text).map(({ item }) => item);
    const filteredRecs = recs.filter((name) => !list.includes(name));
    return filteredRecs;
  }, [text, cardNames, list]);

  const updateList = (item: string, action: "add" | "remove") => {
    if (
      action === "add" &&
      !list.map((i) => i.toLowerCase()).includes(item.toLowerCase())
    ) {
      cardNames.forEach((name) => {
        if (name.toLowerCase() === item.toLowerCase()) {
          setList([...list, name]);
          setText("");
        }
      });
    }
    if (action === "remove") {
      setList(list.filter((i) => i !== item));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updateList(text, "add");
    }
  };

  return (
    <div className="pt-3.5 pb-7">
      <div className="flex flex-wrap gap-2 w-72 pb-3.5">
        {list.map((card) => (
          <button
            key={card}
            onClick={() => updateList(card, "remove")}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white cursor-pointer transition-colors"
          >
            <span>{card}</span>
            <FaTimes className="h-2.5 w-2.5" />
          </button>
        ))}
      </div>
      <div className="relative w-72">
        <Input
          placeholder="Enter card name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-20"
        />
        <button
          onClick={() => updateList(text, "add")}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Add
        </button>
      </div>
      {text !== "" && (
        <div className="flex flex-col items-start gap-2 w-72 pt-1.5">
          {recommendations.map((name) => (
            <button
              key={name}
              onClick={() => updateList(name, "add")}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 text-white cursor-pointer transition-colors"
            >
              <FaPlus className="h-3 w-3" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
