import { SignUp } from "@clerk/nextjs";
import type { ReactNode } from "react";

export default function Page(): ReactNode {
  return (
    <div className="flex items-center justify-center mt-4">
      <SignUp />
    </div>
  );
}
