"use client";

import { useState } from "react";

type ServiceType = {
  id: string;
  label: string;
  emoji: string;
};

const SERVICE_TYPES: ServiceType[] = [
  { id: "home-service", label: "Home Service", emoji: "🏠" },
  { id: "walk-in",      label: "Walk in",      emoji: "🚶" },
];

export function ServiceTypeTab() {
  const [selected, setSelected] = useState<string>("home-service");

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-5">
        {SERVICE_TYPES.map((type) => {
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              id={`service-type-${type.id}`}
              onClick={() => setSelected(type.id)}
              className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl bg-white py-10 px-6 transition-all duration-200 cursor-pointer select-none
                ${
                  isSelected
                    ? "border-2 border-[#F82C5D] shadow-none"
                    : "border-2 border-transparent shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                }`}
            >
              {/* Checkmark badge — only when selected */}
              {isSelected && (
                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#F82C5D] flex items-center justify-center shadow-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              {/* Emoji icon */}
              <span className="text-6xl leading-none">{type.emoji}</span>

              {/* Label */}
              <span className="text-xl text-[#ADADAD] font-normal">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
