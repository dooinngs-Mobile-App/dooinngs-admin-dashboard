import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

export function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-200 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#F0F0F0] px-5 py-5">
        <span className="text-2xl leading-none">{icon}</span>
        <span className="text-lg font-medium text-[#1A1A1A]">{title}</span>
      </div>

      {/* Value */}
      <div className="px-5 py-10">
        <p className="text-4xl font-semibold text-[#1A1A1A] tracking-tight">{value}</p>
      </div>
    </div>
  );
}
