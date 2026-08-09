"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { bookingColumns, type Booking, type BookingStatus } from "./columns";
import { BookingStatusTabs, type BookingTabStatus } from "@/components/admin/BookingStatusTabs";

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "BKG-001",
    customerName: "Joshua Gavu",
    artisanName: "Kwame Mensah",
    service: "Haircut",
    date: "July 6, 2026",
    time: "10:00 AM",
    price: "GHS 50",
    status: "pending",
  },
  {
    id: "BKG-002",
    customerName: "Ama Serwaa",
    artisanName: "Yaw Boateng",
    service: "Plumbing Repair",
    date: "July 5, 2026",
    time: "2:30 PM",
    price: "GHS 150",
    status: "confirmed",
  },
  {
    id: "BKG-003",
    customerName: "Kofi Owusu",
    artisanName: "Yaw Boateng",
    service: "Leak Fix",
    date: "July 5, 2026",
    time: "4:00 PM",
    price: "GHS 80",
    status: "in progress",
  },
  {
    id: "BKG-004",
    customerName: "Esi Boateng",
    artisanName: "Kwame Mensah",
    service: "Shaving & Lining",
    date: "July 4, 2026",
    time: "11:15 AM",
    price: "GHS 40",
    status: "completed",
  },
  {
    id: "BKG-005",
    customerName: "Adwoa Osei",
    artisanName: "Kofi Anan",
    service: "House Painting",
    date: "July 3, 2026",
    time: "9:00 AM",
    price: "GHS 450",
    status: "cancelled",
  },
  {
    id: "BKG-006",
    customerName: "Kwabena Appiah",
    artisanName: "Yaw Boateng",
    service: "Pipe Installation",
    date: "July 7, 2026",
    time: "1:00 PM",
    price: "GHS 200",
    status: "rescheduled",
  },
  {
    id: "BKG-007",
    customerName: "Joshua Gavu",
    artisanName: "Kofi Anan",
    service: "Wall Spraying",
    date: "July 8, 2026",
    time: "10:30 AM",
    price: "GHS 300",
    status: "confirmed",
  },
  {
    id: "BKG-008",
    customerName: "Abena Mansa",
    artisanName: "Kwame Mensah",
    service: "Hair Dyeing",
    date: "July 2, 2026",
    time: "3:00 PM",
    price: "GHS 75",
    status: "completed",
  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingTabStatus>("all");

  // Calculate status counts based on mock data
  const counts = useMemo(() => {
    const defaultCounts: Record<BookingTabStatus, number> = {
      all: mockBookings.length,
      pending: 0,
      confirmed: 0,
      "in progress": 0,
      completed: 0,
      cancelled: 0,
      rescheduled: 0,
    };

    mockBookings.forEach((b) => {
      if (b.status in defaultCounts) {
        defaultCounts[b.status as BookingTabStatus]++;
      }
    });

    return defaultCounts;
  }, []);

  // Filter bookings based on active status tab
  const filteredBookings = useMemo(() => {
    if (activeTab === "all") return mockBookings;
    return mockBookings.filter((b) => b.status === activeTab);
  }, [activeTab]);

  return (
    <div className="p-8">
      <DataTable
        columns={bookingColumns}
        data={filteredBookings}
        title="Bookings"
        searchPlaceholder="Search bookings..."
        toolbar={
          <BookingStatusTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            counts={counts}
          />
        }
      />
    </div>
  );
}
