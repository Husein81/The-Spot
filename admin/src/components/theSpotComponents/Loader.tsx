import { cn } from "@/lib/utils";

const Loader = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className=" h-[calc(100vh-5rem-13vh)] flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-blue-500 border-opacity-50",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

export default Loader;
