"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  searchPlaceholder?: string;
  toolbar?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  searchPlaceholder = "Search...",
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Title + Search bar */}
      <div className="flex items-center justify-between gap-4">
        {title && <h1 className="text-2xl font-bold text-[#1A1A1A]">{title}</h1>}
        <div className="ml-auto flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-primary/30 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-[#838383]">
            <path d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0616C18.7932 13.091 19.0002 12.0506 19.0002 11C19.0002 9.94939 18.7932 8.90901 18.3912 7.93836C17.9891 6.96771 17.3998 6.08591 16.657 5.343C15.9141 4.60009 15.0322 4.01082 14.0616 3.60877C13.091 3.20673 12.0506 2.99976 11 2.99976C9.94939 2.99976 8.90901 3.20673 7.93836 3.60877C6.96771 4.01082 6.08591 4.60009 5.343 5.343C3.84296 6.84304 3 8.87773 3 11C3 13.1223 3.84296 15.157 5.343 16.657C6.84304 18.157 8.87773 19 11 19C13.1223 19 15.157 18.157 16.657 16.657Z" stroke="#838383" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="flex-1 text-sm text-[#1A1A1A] placeholder:text-[#838383] outline-none bg-transparent"
          />
        </div>
      </div>

      {toolbar && <div>{toolbar}</div>}

      {/* Table */}
      <div className="rounded-xl bg-[#F5F5F5] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-white border-b border-gray-100 last:border-0">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-[#838383]">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
