"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AvatarInitials } from "@/components/ui/avatar-initials";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in progress"
  | "completed"
  | "cancelled"
  | "rescheduled";

export type Booking = {
  id: string;
  customerName: string;
  artisanName: string;
  service: string;
  date: string;
  time: string;
  price: string;
  status: BookingStatus;
};

// Helper for status badge styling
export function getStatusStyles(status: BookingStatus) {
  switch (status) {
    case "pending":
      return "bg-[#FFF9E6] text-[#D4A017] border border-[#FFECA8]";
    case "confirmed":
      return "bg-[#E6F0FF] text-[#0066FF] border border-[#B3D1FF]";
    case "in progress":
      return "bg-[#F3E6FF] text-[#9933FF] border border-[#E1B3FF]";
    case "completed":
      return "bg-[#E6FFE6] text-[#00B300] border border-[#B3FFB3]";
    case "cancelled":
      return "bg-[#FFE6E6] text-[#FF3333] border border-[#FFB3B3]";
    case "rescheduled":
      return "bg-[#F0F0F0] text-[#666666] border border-[#D9D9D9]";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
}

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-[#3D3D3D]">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <AvatarInitials name={row.getValue("customerName")} className="!bg-[#0066FF]" />
        <span className="font-medium text-[#1A1A1A]">{row.getValue("customerName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "artisanName",
    header: "Artisan",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <AvatarInitials name={row.getValue("artisanName")} className="!bg-[#F82C5D]" />
        <span className="font-medium text-[#1A1A1A]">{row.getValue("artisanName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("service")}</span>,
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-[#1A1A1A] font-medium">{original.date}</span>
          <span className="text-xs text-[#838383]">{original.time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="font-semibold text-[#1A1A1A]">{row.getValue("price")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as BookingStatus;
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <button className="px-4 py-1.5 rounded-full bg-[#EBEBEB] text-[#3D3D3D] text-sm hover:bg-[#F82C5D] hover:text-white transition-all duration-150">
        View
      </button>
    ),
  },
];
