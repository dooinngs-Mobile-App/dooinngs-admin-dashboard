"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type ServiceType = {
  id: string;
  label: string;
  emoji: string;
};

const SERVICE_TYPES: ServiceType[] = [
  { id: "home", label: "Home Service", emoji: "🏠" },
  { id: "walkin", label: "Walk in", emoji: "🚶" },
];

export function ServiceTypeTab({
  serviceTypes,
  isSaving = false,
  onSave,
}: {
  serviceTypes?: string[];
  isSaving?: boolean;
  onSave?: (serviceTypes: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(serviceTypes ?? []);
  const [isDirty, setIsDirty] = useState(false);

  function toggle(id: string) {
    setIsDirty(true);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-5">
        {SERVICE_TYPES.map((type) => {
          const isSelected = selected.includes(type.id);
          return (
            <button
              key={type.id}
              id={`service-type-${type.id}`}
              onClick={() => toggle(type.id)}
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

      {onSave && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isDirty || isSaving}
            onClick={() => {
              onSave(selected);
              setIsDirty(false);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F82C5D] text-white text-sm font-semibold hover:bg-[#d9254f] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving && <Spinner size={14} className="text-white" />}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
