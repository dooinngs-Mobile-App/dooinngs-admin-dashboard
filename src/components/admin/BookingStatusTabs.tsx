"use client";

import { cn } from "@/lib/utils";

export type BookingTabStatus =
  | "all"
  | "pending"
  | "confirmed"
  | "in progress"
  | "completed"
  | "cancelled"
  | "rescheduled";

type Tab = {
  id: BookingTabStatus;
  label: string;
  count?: number;
};

type Props = {
  activeTab: BookingTabStatus;
  onChange: (status: BookingTabStatus) => void;
  counts?: Record<BookingTabStatus, number>;
};

export function BookingStatusTabs({ activeTab, onChange, counts }: Props) {
  const tabs: Tab[] = [
    { id: "all", label: "All Bookings" },
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "in progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
    { id: "rescheduled", label: "Rescheduled" },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
      {tabs.map(({ id, label }) => {
        const isActive = activeTab === id;
        const count = counts?.[id] ?? 0;

        return (
          <button
            key={id}
            id={`booking-status-tab-${id}`}
            onClick={() => onChange(id)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer",
              isActive
                ? "bg-[#FCE8ED] text-[#F82C5D] font-semibold"
                : "text-[#3D3D3D] hover:bg-gray-100"
            )}
          >
            <span>{label}</span>
            {count > 0 && (
              <span
                className={cn(
                  "inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full min-w-[20px] transition-all",
                  isActive ? "bg-[#F82C5D] text-white" : "bg-gray-200 text-[#555]"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
