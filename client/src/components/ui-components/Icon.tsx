import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export const Icon = ({ name, color, size, className, onClick }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons];
  return (
    <div className={className} onClick={onClick}>
      <LucideIcon color={color} size={size} />
    </div>
  );
};
