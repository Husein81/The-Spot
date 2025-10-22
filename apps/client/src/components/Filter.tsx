import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "./Select";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const options = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "asc" },
    { label: "Price: High to Low", value: "desc" },
  ];

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-gray-500">Sort By:</span>
      <Select
        className={"w-44"}
        options={options}
        onValueChange={handleFilter}
      />
    </div>
  );
};
export default Filter;
