import { cn, Shad } from "@repo/ui";
type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
  size?: "default" | "sm";
  onValueChange: (value: string) => void;
};

const Select = ({
  options,
  label,
  placeholder,
  className,
  size = "default",
  onValueChange,
}: Props) => {
  return (
    <Shad.Select onValueChange={onValueChange}>
      <Shad.SelectTrigger className={cn(className)} size={size}>
        <Shad.SelectValue placeholder={placeholder ?? "Select an option"} />
      </Shad.SelectTrigger>
      <Shad.SelectContent>
        <Shad.SelectGroup>
          {label && <Shad.SelectLabel>{label}</Shad.SelectLabel>}
          {options.map(({ value, label }) => (
            <Shad.SelectItem key={value} value={value}>
              {label}
            </Shad.SelectItem>
          ))}
        </Shad.SelectGroup>
      </Shad.SelectContent>
    </Shad.Select>
  );
};

export default Select;
