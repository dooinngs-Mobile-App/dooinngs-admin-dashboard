"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AvatarInitials } from "@/components/ui/avatar-initials";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  bookings: number;
};

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <AvatarInitials name={row.getValue("name")} />
        <span className="font-medium text-[#1A1A1A]">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone number",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("phone")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email address",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "bookings",
    header: "Number of bookings",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("bookings")}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <button className="px-4 py-1.5 rounded-full bg-[#EBEBEB] text-[#3D3D3D] text-sm hover:bg-gray-200 transition-colors">
        •••
      </button>
    ),
  },
];
