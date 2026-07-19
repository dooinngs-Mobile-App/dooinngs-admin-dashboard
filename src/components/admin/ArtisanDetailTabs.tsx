"use client";

import { useState } from "react";
import { OwnersDetailsTab } from "@/components/admin/tabs/OwnersDetailsTab";
import { BusinessInformationTab } from "@/components/admin/tabs/BusinessInformationTab";
import { BusinessHoursTab } from "@/components/admin/tabs/BusinessHoursTab";
import { PriceListTab } from "@/components/admin/tabs/PriceListTab";
import { ServiceTypeTab } from "@/components/admin/tabs/ServiceTypeTab";

type Artisan = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  bookings: number;
};

type Tab = {
  id: string;
  label: string;
};

const TABS: Tab[] = [
  { id: "owners-details", label: "Owner's Details" },
  { id: "business-information", label: "Business Information" },
  { id: "business-hours", label: "Business Hours" },
  { id: "business-images", label: "Business Images" },
  { id: "price-list", label: "Price List" },
  { id: "service-type", label: "Service Type" },
  { id: "earnings", label: "Earnings" },
  { id: "all-bookings", label: "All Bookings" },
];

type OwnerDetailsPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export function ArtisanDetailTabs({
  artisan,
  isEditingDetails = false,
  ownerDetailsFormId,
  onSubmitOwnerDetails,
  onCancelEditingDetails,
  isSavingOwnerDetails = false,
}: {
  artisan: Artisan;
  isEditingDetails?: boolean;
  ownerDetailsFormId?: string;
  onSubmitOwnerDetails?: (payload: OwnerDetailsPayload) => void;
  onCancelEditingDetails?: () => void;
  isSavingOwnerDetails?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("owners-details");

  return (
    <div className="overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`artisan-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? "text-[#F82C5D]"
                  : "text-[#838383] hover:text-[#3D3D3D]"
              }`}
            >
              {tab.label}
              {/* Active underline */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F82C5D] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "owners-details" && (
          <OwnersDetailsTab
            artisan={artisan}
            formId={ownerDetailsFormId}
            isEditing={isEditingDetails}
            isSaving={isSavingOwnerDetails}
            onSubmit={onSubmitOwnerDetails}
            onCancel={onCancelEditingDetails}
          />
        )}
        {activeTab === "business-information" && (
          <BusinessInformationTab
            artisan={artisan}
            isEditing={isEditingDetails}
            onCancel={onCancelEditingDetails}
          />
        )}
        {activeTab === "business-hours" && <BusinessHoursTab />}
        {activeTab === "price-list" && <PriceListTab />}
        {activeTab === "service-type" && <ServiceTypeTab />}
        {activeTab !== "owners-details" && activeTab !== "business-information" && activeTab !== "business-hours" && activeTab !== "price-list" && activeTab !== "service-type" &&
          TABS.filter((t) => t.id === activeTab).map((tab) => (
            <ComingSoonTab key={tab.id} label={tab.label} />
          ))}
      </div>
    </div>
  );
}

/* ── Placeholder for tabs not yet built ── */
function ComingSoonTab({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#838383]">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-40"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
          fill="currentColor"
        />
      </svg>
      <p className="text-sm font-medium">{label} — coming soon</p>
    </div>
  );
}
