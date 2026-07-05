"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Category = {
  label: string;
  icon: string;
};

const categories: Category[] = [
  { label: "Barbers", icon: "💈" },
  { label: "Carpenters", icon: "🔨" },
  { label: "Cleaners", icon: "🧹" },
  { label: "Electricians", icon: "⚡" },
  { label: "Hairstylists", icon: "💇" },
  { label: "Painters", icon: "🎨" },
  { label: "Lash Technicians", icon: "👁️" },
  { label: "Make-up Artists", icon: "💄" },
  { label: "Mechanics", icon: "🔧" },
  { label: "Nail Technicians", icon: "💅" },
];

type Props = {
  onChange?: (category: string) => void;
};

export function CategoryTabs({ onChange }: Props) {
  const [active, setActive] = useState(categories[0].label);

  function handleSelect(label: string) {
    setActive(label);
    onChange?.(label);
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
      {categories.map(({ label, icon }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => handleSelect(label)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
              isActive
                ? "bg-[#FCE8ED] text-[#F82C5D]"
                : "text-[#3D3D3D] hover:bg-gray-100"
            )}
          >
            <span>{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
