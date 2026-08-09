"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Sidebar from "@/components/admin/Sidebar";
import { DashboardGreeting } from "@/components/admin/DashboardGreeting";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="flex h-screen bg-[#F9F9F9]">
      <div className="sticky top-0 h-screen shrink-0 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-8 pt-8">
          <DashboardGreeting />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
