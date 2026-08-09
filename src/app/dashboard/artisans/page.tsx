"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { CategoryTabs } from "@/components/admin/CategoryTabs";
import { PageLoader } from "@/components/ui/spinner";
import { artisanColumns, type Artisan } from "./columns";
import { listArtisans } from "@/api/client";

export default function ArtisansPage() {
  const [, setCategory] = useState("Barbers");

  const { data, isLoading, isError } = useQuery({
    queryKey: listArtisans.key,
    queryFn: listArtisans.fn,
  });

  const artisans: Artisan[] =
    data?.results.map((artisan) => ({
      id: artisan.id,
      name: `${artisan.first_name} ${artisan.last_name}`.trim(),
      phone: artisan.phone_number ?? "-",
      email: artisan.email,
      service: artisan.professions.join(", ") || "-",
      bookings: artisan.business_count,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <PageLoader label="Loading artisans..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 flex items-center justify-center text-[#F82C5D]">
        Failed to load artisans.
      </div>
    );
  }

  return (
    <div className="p-8">
      <DataTable
        columns={artisanColumns}
        data={artisans}
        title="Artisans"
        searchPlaceholder="Search artisans..."
        toolbar={<CategoryTabs onChange={setCategory} />}
      />
    </div>
  );
}
