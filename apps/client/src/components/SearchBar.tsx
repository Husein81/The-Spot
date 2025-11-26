"use client";
import { Icon, Input, cn } from "@repo/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden h-12 w-1/3 sm:flex mx-auto items-center rounded-full py-2 shadow-sm">
      <Input
        className={cn(
          "pl-5 border-0 focus:bg-transparent dark:bg-transparent focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 text-sm text-gray-600 shadow-none"
        )}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSearch(value);
          }
        }}
      />
      <Icon
        name="Search"
        className="bg-amber-400 cursor-pointer size-8 text-gray-50 p-2 mx-1.5 rounded-full"
      />
    </div>
  );
};

export default SearchBar;
