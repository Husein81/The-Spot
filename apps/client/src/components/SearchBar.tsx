"use client";
import { Input, Icon } from "@repo/ui";
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
    <div className="hidden w-1/2 sm:flex mx-auto items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
      <Input
        className="flex-grow pl-5 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none text-sm text-gray-600 shadow-none"
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(value);
          }
        }}
      />
      <Icon
        name="Search"
        className="bg-orange-400 cursor-pointer size-8 text-gray-50 p-2 mx-2 rounded-full"
      />
    </div>
  );
};

export default SearchBar;
