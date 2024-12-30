/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectLabel, SelectTrigger } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "./ui/select";

interface SelectContainerProps<T> {
  selectedValue?: string;
  label: string;
  options: T[];
  onValueChange?: (value: string) => void;
}

const SelectContainer = ({
  selectedValue,
  options,
  label,
  onValueChange,
}: SelectContainerProps<{ id: string; name: string }>) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="flex mt-1 w-full p-2 border border-gray-300 rounded-md">
        <SelectValue placeholder={selectedValue || label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectContainer;
