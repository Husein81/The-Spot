import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input, Shad } from "@repo/ui";

// Generic pagination props shape
export type PaginationData<T> = {
  data: T[];
  totalCount: number;
  currentPage: number; // 1-based
  totalPages: number;
};

type Props<T> = {
  pagination: PaginationData<T>;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[]; // optional page size selector values (if you want it)
  onPageSizeChange?: (size: number) => void; // if using server-side page size
  maxPageButtons?: number; // how many page number buttons to show in the middle
};

/**
 * Shadcn-compatible Pagination component
 * - Accepts a pagination object of shape { data, totalCount, currentPage, totalPages }
 * - Emits onPageChange(pageNumber)
 * - Optionally supports pageSize selection via pageSizeOptions + onPageSizeChange
 */

export default function Pagination<T>({
  pagination,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  maxPageButtons = 5,
}: Props<T>) {
  const { totalCount, currentPage, totalPages } = pagination;
  const [jumpValue, setJumpValue] = useState<string>("");

  // Build an array of page numbers to display using a sliding window strategy
  const pages = useMemo(() => {
    const pagesArr: number[] = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) pagesArr.push(i);
      return pagesArr;
    }

    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPageButtons - 1);

    // if we are at the end, shift window to the left
    if (end - start + 1 < maxPageButtons) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    for (let i = start; i <= end; i++) pagesArr.push(i);
    return pagesArr;
  }, [totalPages, currentPage, maxPageButtons]);

  const goto = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    if (page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {/* Left: summary */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{pagination.data.length}</span> of{" "}
        <span className="font-medium">{totalCount}</span> results
      </div>

      {/* Middle: page buttons */}
      <nav className="inline-flex items-center gap-2" aria-label="Pagination">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goto(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* first page + ellipsis if needed */}
        {pages[0]! > 1 && (
          <>
            <Button
              size="sm"
              variant={currentPage === 1 ? "default" : "ghost"}
              onClick={() => goto(1)}
            >
              1
            </Button>
            {pages[0]! > 2 && <span className="px-2">…</span>}
          </>
        )}

        {pages.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === currentPage ? "default" : "ghost"}
            onClick={() => goto(p)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Button>
        ))}

        {/* last page + ellipsis if needed */}
        {pages[pages.length - 1]! < totalPages && (
          <>
            {pages[pages.length - 1]! < totalPages - 1 && (
              <span className="px-2">…</span>
            )}
            <Button
              size="sm"
              variant={currentPage === totalPages ? "default" : "ghost"}
              onClick={() => goto(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => goto(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
