import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { SortCardsBy } from "@/lib";
import type { FC } from "react";

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (string: string) => void;
  sortBy: SortCardsBy;
  setSortBy: (string: SortCardsBy) => void;
  displayed: Array<string>;
  toggleDisplayType: (string: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  displayed,
  toggleDisplayType,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 w-full md:w-3/4 p-8">
        <Input
          value={searchTerm}
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-64"
        />
        <div className="flex items-center gap-2 w-64">
          <span className="text-sm font-medium whitespace-nowrap">
            Sort by:
          </span>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortCardsBy)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="expansion">Expansion</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-5">
        {["Supply", "Non-supply", "Landscape"].map((type) => (
          <div key={type} className="flex items-center gap-2">
            <Switch
              checked={displayed.includes(type)}
              onCheckedChange={() => toggleDisplayType(type)}
            />
            <span className="pl-2">{type}</span>
          </div>
        ))}
      </div>
    </>
  );
};
