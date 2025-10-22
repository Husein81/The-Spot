"use client";
import { cn, Separator } from "@repo/ui";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import StepsDetails from "./StepsDetails";

const StepsAction = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const steps = [
    { id: "1", label: "Shopping Cart" },
    { id: "2", label: "Shipping Address" },
    { id: "3", label: "Payment Method" },
  ];

  const handleSteps = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const selectedStep = searchParams.get("step") || "1";

  return (
    <div className="flex flex-col gap-4 w-full mb-8">
      {/* Steps */}
      <div className="flex items-center justify-center gap-12">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn("flex flex-col gap-2 opacity-30 cursor-pointer", {
              "opacity-100": step.id === selectedStep,
            })}
            onClick={() => handleSteps(step.id)}
          >
            <div className="flex items-center gap-2">
              <div
                className={
                  "bg-primary text-white rounded-full size-6 p-3 flex items-center justify-center"
                }
              >
                {step.id}
              </div>
              <span className="text-primary text-sm">{step.label}</span>
            </div>
            <Separator className="h-1 border border-primary" />
          </div>
        ))}
      </div>

      {/* Steps Details */}
      <StepsDetails selectedStep={Number(selectedStep)} />
    </div>
  );
};

export default StepsAction;
