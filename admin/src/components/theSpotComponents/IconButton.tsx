import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  icon?: JSX.Element;
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const IconButton = ({
  icon,
  label,
  className,
  children,
  onClick,
}: IconButtonProps) => {
  return (
    <Button
      className={cn(
        "flex  items-center gap-4 text-gray-100 py-2 px-4 hover:bg-gray-100 hover:text-gray-600  cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {label}
      {children}
    </Button>
  );
};
export default IconButton;
