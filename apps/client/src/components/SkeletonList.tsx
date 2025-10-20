import { Skeleton } from "@repo/ui";

const SkeletonList = () => {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      }
    >
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col space-y-3 rounded-2xl border p-4 shadow-sm"
        >
          {/* Product Image */}
          <Skeleton className="h-48 w-full rounded-xl" />

          <div className="space-y-2">
            {/* Product Name */}
            <Skeleton className="h-4 w-3/4" />

            {/* Description */}
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />

            {/* Price */}
            <Skeleton className="h-5 w-1/3" />
          </div>

          {/* Add to Cart Button */}
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};
export default SkeletonList;
