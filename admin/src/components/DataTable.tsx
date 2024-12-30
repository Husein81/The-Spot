import { ReactNode, useState } from "react";
import SelectContainer from "./SelectContainer";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  defaultRowsPerPage?: number;
};

type TableHeaderProps<T> = {
  columns: Column<T>[];
};
type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
};

type TableCellProps<T> = {
  value: T;
  render?: (value: T) => ReactNode;
};

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        {columns.map((column) => (
          <th key={String(column.key)} className="border p-2">
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableCell = <T,>({ value, render }: TableCellProps<T>) => {
  return (
    <td className="border p-2">{render ? render(value) : String(value)}</td>
  );
};

const TableRow = <T extends { id: number | string }>({
  columns,
  row,
}: TableRowProps<T>) => {
  return (
    <tr key={row.id}>
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
        />
      ))}
    </tr>
  );
};

const DataTable = <T extends { id: number | string }>({
  data,
  columns,
  defaultRowsPerPage = 10,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <TableHeader columns={columns} />
        <tbody>
          {currentData.map((row) => (
            <TableRow key={row.id} columns={columns} row={row} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center border-t-0 p-2 border">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <SelectContainer
          label="Rows per page"
          options={[
            { id: "2", name: "2" },
            { id: "10", name: "10" },
            { id: "20", name: "20" },
            { id: "50", name: "50" },
          ]}
        />
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
