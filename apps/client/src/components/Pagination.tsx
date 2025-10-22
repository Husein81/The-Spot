import { Button } from "@repo/ui";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo } from "react";
import type { Pagination as PaginationType } from "@repo/types";

type Props<T> = {
  pagination: PaginationType<T>;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
};

export default function Pagination<T>({
  pagination,
  onPageChange,
  maxPageButtons = 5,
}: Props<T>) {
  const { totalCount, currentPage, totalPages, data } = pagination;

  // 🔹 Generate visible page numbers
  const pages = useMemo(() => {
    if (totalPages <= 0) return [];

    const pagesArr: number[] = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) pagesArr.push(i);
      return pagesArr;
    }

    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxPageButtons - 1);

    // Adjust window if near the end
    if (end - start + 1 < maxPageButtons) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    for (let i = start; i <= end; i++) pagesArr.push(i);
    return pagesArr;
  }, [totalPages, currentPage, maxPageButtons]);

  const goto = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  if (totalPages <= 1) return null; // no pagination needed

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
      {/* Left summary */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{data.length}</span> of{" "}
        <span className="font-medium">{totalCount}</span> results
      </div>

      {/* Page buttons */}
      <nav
        className="flex items-center gap-1"
        aria-label="Pagination Navigation"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goto(1)}
          disabled={currentPage <= 1}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => goto(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Show first page + ellipsis */}
        {pages[0]! > 1 && (
          <>
            <Button
              size="sm"
              variant={currentPage === 1 ? "default" : "ghost"}
              onClick={() => goto(1)}
            >
              1
            </Button>
            {pages[0]! > 2 && <span className="px-1">…</span>}
          </>
        )}

        {/* Visible pages */}
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

        {/* Show last page + ellipsis */}
        {pages[pages.length - 1]! < totalPages && (
          <>
            {pages[pages.length - 1]! < totalPages - 1 && (
              <span className="px-1">…</span>
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

        <Button
          variant="ghost"
          size="sm"
          onClick={() => goto(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
