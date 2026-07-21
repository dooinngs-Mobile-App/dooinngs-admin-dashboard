"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import type { BusinessHour } from "@/api/client";

type DayHours = {
  id?: string;
  enabled: boolean;
  open: string;
  close: string;
};

type BusinessHours = Record<string, DayHours>;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_DAY: DayHours = { enabled: false, open: "08:00", close: "17:00" };

function toApiHours(hours: BusinessHours): BusinessHour[] {
  return DAYS.map((day) => ({
    ...(hours[day].id ? { id: hours[day].id } : {}),
    day,
    is_available_for_booking: hours[day].enabled,
    open_time: hours[day].open,
    close_time: hours[day].close,
  }));
}

function fromApiHours(businessHours?: BusinessHour[]): BusinessHours {
  const byDay = new Map((businessHours ?? []).map((h) => [h.day, h]));
  return DAYS.reduce((acc, day) => {
    const entry = byDay.get(day);
    return {
      ...acc,
      [day]: entry
        ? {
            id: entry.id,
            enabled: entry.is_available_for_booking,
            open: entry.open_time.slice(0, 5),
            close: entry.close_time.slice(0, 5),
          }
        : { ...DEFAULT_DAY },
    };
  }, {} as BusinessHours);
}

/* ── Time pill selector ── */
function TimePill({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      id={id}
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#EBEBEB] rounded-lg px-4 py-2 text-[#1A1A1A] text-sm font-medium cursor-pointer hover:bg-[#E0E0E0] transition-colors outline-none scheme-light"
    />
  );
}

export function BusinessHoursTab({
  businessHours,
  isSaving = false,
  onSave,
}: {
  businessHours?: BusinessHour[];
  isSaving?: boolean;
  onSave?: (hours: BusinessHour[]) => void;
}) {
  const [hours, setHours] = useState<BusinessHours>(() =>
    fromApiHours(businessHours),
  );
  const [isDirty, setIsDirty] = useState(false);

  const toggleDay = (day: string) => {
    setIsDirty(true);
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateTime = (day: string, field: "open" | "close", value: string) => {
    setIsDirty(true);
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  function handleSave() {
    onSave?.(toApiHours(hours));
    setIsDirty(false);
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      {DAYS.map((day) => {
        const { enabled, open, close } = hours[day];
        return (
          <div
            key={day}
            className="bg-[#F5F5F5] rounded-2xl px-5 py-4 flex flex-col gap-3"
          >
            {/* Day name + toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[#838383] text-base font-normal">{day}</span>
              <Switch
                id={`${day}-toggle`}
                checked={enabled}
                onCheckedChange={() => toggleDay(day)}
                className="data-checked:bg-[#F82C5D] data-checked:border-[#F82C5D] data-unchecked:bg-[#D9D9D9] data-unchecked:border-[#D9D9D9]"
              />
            </div>

            {/* Time pickers — only visible when enabled */}
            {enabled && (
              <div className="flex items-center gap-3">
                <TimePill
                  id={`${day}-open`}
                  value={open}
                  onChange={(val) => updateTime(day, "open", val)}
                />
                <span className="text-[#838383] text-sm font-medium">-</span>
                <TimePill
                  id={`${day}-close`}
                  value={close}
                  onChange={(val) => updateTime(day, "close", val)}
                />
              </div>
            )}
          </div>
        );
      })}

      {onSave && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isDirty || isSaving}
            onClick={handleSave}
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
