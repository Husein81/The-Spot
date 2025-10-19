import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ name, color, size, className, onClick }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react icons.`);
    return null;
  }

  return (
    <LucideIcon
      className={className}
      color={color}
      size={size}
      onClick={onClick}
    />
  );
};

export default Icon;
