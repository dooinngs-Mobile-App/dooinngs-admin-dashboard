"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

type DayHours = {
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

const DEFAULT_HOURS: BusinessHours = {
  Monday:    { enabled: true,  open: "8:00am", close: "5:00pm" },
  Tuesday:   { enabled: true,  open: "8:00am", close: "5:00pm" },
  Wednesday: { enabled: false, open: "8:00am", close: "5:00pm" },
  Thursday:  { enabled: false, open: "8:00am", close: "5:00pm" },
  Friday:    { enabled: false, open: "8:00am", close: "5:00pm" },
  Saturday:  { enabled: false, open: "8:00am", close: "5:00pm" },
  Sunday:    { enabled: false, open: "8:00am", close: "5:00pm" },
};

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
  // Convert "8:00am" → "08:00" for <input type="time">
  const toInputTime = (t: string) => {
    const match = t.match(/^(\d+):(\d+)(am|pm)$/i);
    if (!match) return "08:00";
    let [, h, m, period] = match;
    let hours = parseInt(h);
    if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (period.toLowerCase() === "am" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${m}`;
  };

  // Convert "08:00" → "8:00am"
  const toDisplay = (t: string) => {
    const [hStr, mStr] = t.split(":");
    let h = parseInt(hStr);
    const period = h >= 12 ? "pm" : "am";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h}:${mStr}${period}`;
  };

  return (
    <label
      htmlFor={id}
      className="relative bg-[#EBEBEB] rounded-lg px-4 py-2 text-[#1A1A1A] text-sm font-medium cursor-pointer hover:bg-[#E0E0E0] transition-colors"
    >
      {toDisplay(toInputTime(value))}
      <input
        id={id}
        type="time"
        value={toInputTime(value)}
        onChange={(e) => onChange(toDisplay(e.target.value))}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      />
    </label>
  );
}

export function BusinessHoursTab() {
  const [hours, setHours] = useState<BusinessHours>(DEFAULT_HOURS);

  const toggleDay = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateTime = (day: string, field: "open" | "close", value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div className="flex flex-col gap-3 max-w-2xl">
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
    </div>
  );
}
