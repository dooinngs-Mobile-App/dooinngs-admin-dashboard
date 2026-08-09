"use client";

import { useAuth } from "@/providers/AuthProvider";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

function getFormattedDate() {
  const now = new Date();
  const day = now.toLocaleDateString("en-GB", { weekday: "long" });
  const date = getOrdinal(now.getDate());
  const month = now.toLocaleDateString("en-GB", { month: "long" });
  const year = now.getFullYear();
  return `${day}, ${date} ${month}, ${year}`;
}

function getDisplayName(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "";
  if ("name" in user) return user.name;
  return `${user.first_name} ${user.last_name}`.trim();
}

export function DashboardGreeting() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A]">
        {getGreeting()}, {getDisplayName(user)} 👋
      </h1>
      <p className="text-sm text-[#838383] mt-1">{getFormattedDate()}</p>
    </div>
  );
}
