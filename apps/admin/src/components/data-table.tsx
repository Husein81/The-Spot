"use client";

import { Button, Icon, Input, Shad } from "@repo/ui";
import { Activity } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    page: string;
    limit: string;
    total: string;
    onPageChange: (page: string) => void;
    onSizeChange: (size: string) => void;
  };
  onSearch?: (value: string) => void;
};

const DataTable = <TData, TValue>({
  columns,
  data,
  pagination,
  onSearch,
}: Props<TData, TValue>) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSizeChange = (size: string) => {
    if (pagination) {
      pagination.onSizeChange(size);
    }
  };

  const handlePageChange = (newPage: string) => {
    if (pagination) {
      pagination.onPageChange(newPage);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center">
        <Input
          value={search}
          placeholder="Search..."
          className="max-w-sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Shad.Table>
          <Shad.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <Shad.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Shad.TableHead key={header.id}>
                    {header.isPlaceholder
                      ? undefined
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Shad.TableHead>
                ))}
              </Shad.TableRow>
            ))}
          </Shad.TableHeader>
          <Shad.TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Shad.TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Shad.TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Shad.TableCell>
                  ))}
                </Shad.TableRow>
              ))
            ) : (
              <Shad.TableRow>
                <Shad.TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Shad.TableCell>
              </Shad.TableRow>
            )}
          </Shad.TableBody>
        </Shad.Table>
      </div>
      <Activity mode={pagination ? "visible" : "hidden"}>
        <Shad.Pagination className="flex items-center gap-4">
          <Button
            variant={"ghost"}
            disabled={pagination ? parseInt(pagination.page) <= 1 : true}
            onClick={() =>
              handlePageChange((Number(pagination?.page) - 1).toString())
            }
          >
            <Icon name="ChevronLeft" />
            Previous
          </Button>

          <Shad.Select
            value={pagination?.limit}
            onValueChange={(value) => handleSizeChange(value)}
          >
            <Shad.SelectTrigger className="w-[70px]">
              <Shad.SelectValue placeholder={pagination?.limit || "10"} />
            </Shad.SelectTrigger>
            <Shad.SelectContent>
              {[10, 20, 30, 40, 50].map((size) => (
                <Shad.SelectItem key={size} value={size.toString()}>
                  {size}
                </Shad.SelectItem>
              ))}
            </Shad.SelectContent>
          </Shad.Select>

          <span className="flex items-center gap-1">
            Page {pagination?.page} of{" "}
            {pagination
              ? Math.ceil(
                  parseInt(pagination.total) / parseInt(pagination.limit)
                )
              : 1}
          </span>

          <Button
            variant={"ghost"}
            disabled={
              pagination
                ? parseInt(pagination.page) >=
                  Math.ceil(
                    parseInt(pagination.total) / parseInt(pagination.limit)
                  )
                : false
            }
            onClick={() =>
              handlePageChange((Number(pagination?.page) + 1).toString())
            }
          >
            <Icon name="ChevronRight" />
            Next
          </Button>
        </Shad.Pagination>
      </Activity>
    </div>
  );
};
export default DataTable;
