"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { CategoryTabs } from "@/components/admin/CategoryTabs";
import { artisanColumns, type Artisan } from "./columns";

// TODO: replace with real API data
const mockArtisans: Artisan[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: "Kwame Mensah",
  phone: "+233 24 456 7890",
  email: "kwame.mensah@gmail.com",
  service: "Plumbing",
  bookings: 134,
}));

export default function ArtisansPage() {
  const [, setCategory] = useState("Barbers");

  return (
    <div className="p-8">
      <DataTable
        columns={artisanColumns}
        data={mockArtisans}
        title="Artisans"
        searchPlaceholder="Search artisans..."
        toolbar={<CategoryTabs onChange={setCategory} />}
      />
    </div>
  );
}
