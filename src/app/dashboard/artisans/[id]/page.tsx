"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AvatarInitials } from "@/components/ui/avatar-initials";
import { ArtisanDetailTabs } from "@/components/admin/ArtisanDetailTabs";

// TODO: replace with real API fetch by id
const mockArtisans = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: "Kwame Mensah",
  phone: "+233 24 456 7890",
  email: "kwame.mensah@gmail.com",
  service: "Plumbing",
  bookings: 134,
  rating: 4.8,
  location: "Accra, Ghana",
  joined: "January 2024",
  verified: true,
}));

export default function ArtisanDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const artisan = mockArtisans.find((a) => a.id === id) ?? mockArtisans[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const button = document.getElementById("artisan-actions-dropdown-btn");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-[#F7F7F8] p-8">
      {/* ── Back arrow ── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#3D3D3D] hover:text-[#F82C5D] transition-colors mb-6 group"
        aria-label="Go back"
      >
        <span className="w-8 h-8 rounded-full flex items-center justify-center transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* ── Profile header card ── */}
      <div className="px-0 py-6 flex items-center gap-6 mb-6">
        {/* Avatar — large */}
        <AvatarInitials
          name={artisan.name}
          className="!w-20 !h-20 !text-2xl !font-bold shrink-0"
        />

        {/* Name / phone / email */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#1A1A1A] leading-tight">
              {artisan.name}
            </h1>
            
            {/* Dropdown Container */}
            <div className="relative">
              <button
                id="artisan-actions-dropdown-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-1 rounded-full hover:bg-gray-200/60 transition-colors text-[#838383] hover:text-[#1A1A1A] cursor-pointer"
                aria-label="Artisan actions"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <button
                    onClick={() => {
                      setIsDeactivated(!isDeactivated);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#3D3D3D] hover:bg-gray-50 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    {isDeactivated ? "Activate account" : "Deactivate account"}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this account?")) {
                        alert("Account deleted");
                        router.push("/dashboard/artisans");
                      }
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#F82C5D] hover:bg-red-50 hover:text-[#E41C4C] font-medium transition-colors cursor-pointer"
                  >
                    Delete account
                  </button>
                </div>
              )}
            </div>

            {/* Status Badge */}
            {isDeactivated && (
              <span className="bg-[#FFE6E6] text-[#FF3333] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Deactivated
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-[#3D3D3D]">
            {/* Phone */}
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.32 18.76 15.53 20 15.53C20.55 15.53 21 15.98 21 16.53V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.71 6.45 9.09 7.57C9.21 7.92 9.13 8.31 8.85 8.59L6.62 10.79Z"
                  fill="#838383"
                />
              </svg>
              <span>{artisan.phone}</span>
            </div>

            {/* Divider dot */}
            <span className="w-1 h-1 rounded-full bg-[#C4C4C4] shrink-0" />

            {/* Email */}
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                  fill="#838383"
                />
              </svg>
              <span>{artisan.email}</span>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Update details button */}
        <button
          id="update-artisan-details-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F82C5D] text-white text-sm font-semibold hover:bg-[#d9254f] active:scale-95 transition-all duration-150 shrink-0"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
              fill="white"
            />
          </svg>
          Update Details
        </button>
      </div>

      {/* ── Detail tabs ── */}
      <ArtisanDetailTabs artisan={artisan} />
    </div>
  );
}
