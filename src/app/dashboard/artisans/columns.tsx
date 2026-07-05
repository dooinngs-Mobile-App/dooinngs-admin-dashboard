"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { AvatarInitials } from "@/components/ui/avatar-initials";

export type Artisan = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  bookings: number;
};

function ViewButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      id={`view-artisan-${id}`}
      onClick={() => router.push(`/dashboard/artisans/${id}`)}
      className="px-4 py-1.5 rounded-full bg-[#EBEBEB] text-[#3D3D3D] text-sm font-medium hover:bg-[#F82C5D] hover:text-white transition-all duration-150"
    >
      View
    </button>
  );
}

export const artisanColumns: ColumnDef<Artisan>[] = [
  {
    accessorKey: "name",
    header: "Artisan Name",
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
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("service")}</span>,
  },
  {
    accessorKey: "bookings",
    header: "Number of bookings",
    cell: ({ row }) => <span className="text-[#3D3D3D]">{row.getValue("bookings")}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ViewButton id={row.original.id} />,
  },
];
