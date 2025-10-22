import StepsAction from "@/components/StepsAction";

export default function CartPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-14">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      <StepsAction />
    </div>
  );
}
