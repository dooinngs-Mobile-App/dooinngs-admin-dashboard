"use client";

import { useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { ArtisanBusiness } from "@/api/client";

export type BusinessInfoPayload = {
  business_name: string;
  location: {
    street_address: string;
    city: string;
    state: string;
    country: string;
    gps_address: string;
  };
};

const COUNTRY_OPTIONS = ["Ghana", "Nigeria", "Kenya", "South Africa", "Uganda"];

type Props = {
  artisan: {
    service: string;
  };
  business?: ArtisanBusiness;
  formId?: string;
  isEditing?: boolean;
  isSaving?: boolean;
  onSubmit?: (payload: BusinessInfoPayload) => void;
  onCancel?: () => void;
};

/* ── Reusable floating-label outlined input ── */
function OutlinedInput({
  id,
  name,
  label,
  required,
  defaultValue,
  disabled,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <div className="relative">
      <div className="relative rounded-xl border border-gray-300 px-4 pt-5 pb-4 bg-white">
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3.5 px-1 bg-white text-xs text-[#9E9E9E] leading-none"
        >
          {label}
          {required && <span className="text-[#9E9E9E]"> *</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          className="w-full text-[#1A1A1A] text-lg font-normal outline-none bg-transparent placeholder:text-[#C4C4C4] disabled:text-[#9E9E9E] disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

/* ── Floating-label outlined select ── */
function OutlinedSelect({
  id,
  name,
  label,
  required,
  defaultValue,
  options,
  prefix,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  options: string[];
  prefix?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <div className="relative rounded-xl border border-gray-300 px-4 pt-5 pb-4 bg-white">
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3.5 px-1 bg-white text-xs text-[#9E9E9E] leading-none"
        >
          {label}
          {required && <span className="text-[#9E9E9E]"> *</span>}
        </label>
        <div className="flex items-center gap-2">
          {prefix && <span className="text-lg">{prefix}</span>}
          <select
            id={id}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            className="flex-1 text-[#1A1A1A] text-lg font-normal outline-none bg-transparent appearance-none cursor-pointer disabled:text-[#9E9E9E] disabled:cursor-not-allowed"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {/* Chevron */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function BusinessInformationTab({
  artisan,
  business,
  formId,
  isEditing = false,
  isSaving = false,
  onSubmit,
  onCancel,
}: Props) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const businessDetails = business?.business_details;
  const location = businessDetails?.location ?? {};
  const profession = business?.profession?.name ?? artisan.service;
  const logoUrl = businessDetails?.business_logo;
  const latitude = location.latitude ?? 5.6037;
  const longitude = location.longitude ?? -0.187;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onSubmit) return;
    const formData = new FormData(event.currentTarget);
    onSubmit({
      business_name: String(formData.get("business_name") ?? ""),
      location: {
        street_address: String(formData.get("street_address") ?? ""),
        city: String(formData.get("city") ?? ""),
        state: String(formData.get("state") ?? ""),
        country: String(formData.get("country") ?? ""),
        gps_address: String(formData.get("gps_address") ?? ""),
      },
    });
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-7 max-w-4xl"
    >
      {/* ── Business logo section ── */}
      <div className="flex flex-col gap-2">
        <div className="relative w-fit">
          {/* Circular logo */}
          <div className="w-24 h-24 rounded-full bg-[#F0EBE1] overflow-hidden flex items-center justify-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Business logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                  fill="#C4A882"
                />
                <path
                  d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM6 18C6 15.33 9.33 13 12 13C14.67 13 18 15.33 18 18H6Z"
                  fill="#C4A882"
                />
              </svg>
            )}
          </div>

          {/* Pink refresh icon */}
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => logoInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-lg bg-[#F82C5D] flex items-center justify-center shadow-sm hover:bg-[#d9254f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Change business logo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z"
                fill="white"
              />
            </svg>
          </button>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            aria-label="Upload business logo"
          />
        </div>

        <p className="text-sm text-[#9E9E9E]">Business Logo</p>

        <button
          type="button"
          disabled={!isEditing}
          id="delete-business-logo-btn"
          className="w-fit px-5 py-2 rounded-full border border-[#F82C5D] text-[#1A1A1A] text-sm font-medium hover:bg-[#fff0f3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete image
        </button>
      </div>

      {/* ── Two-column form layout ── */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-7 items-start">
        {/* ── LEFT column ── */}
        <div className="flex flex-col gap-7">
          <OutlinedSelect
            id="business-profession"
            name="profession"
            label="Choose your profession"
            required
            defaultValue={profession}
            disabled={!isEditing}
            options={[
              "Barber",
              "Plumber",
              "Electrician",
              "Carpenter",
              "Painter",
              "Cleaner",
              "Tailor",
              "Mechanic",
            ]}
          />

          <OutlinedInput
            id="business-name"
            name="business_name"
            label="Business name"
            required
            disabled={!isEditing}
            defaultValue={businessDetails?.business_name ?? ""}
          />

          <OutlinedInput
            id="business-address"
            name="street_address"
            label="Address of business"
            required
            disabled={!isEditing}
            defaultValue={location.street_address ?? ""}
          />

          <OutlinedInput
            id="business-city"
            name="city"
            label="City of business"
            required
            disabled={!isEditing}
            defaultValue={location.city ?? ""}
          />
        </div>

        {/* ── RIGHT column ── */}
        <div className="flex flex-col gap-7">
          <OutlinedInput
            id="business-state"
            name="state"
            label="State/region of business"
            required
            disabled={!isEditing}
            defaultValue={location.state ?? ""}
          />

          <OutlinedSelect
            id="business-country"
            name="country"
            label="Country of business"
            required
            defaultValue={
              COUNTRY_OPTIONS.find(
                (opt) => opt.toLowerCase() === location.country?.toLowerCase(),
              ) ?? "Ghana"
            }
            prefix="🇬🇭"
            disabled={!isEditing}
            options={COUNTRY_OPTIONS}
          />

          <OutlinedInput
            id="business-gps"
            name="gps_address"
            label="GPS Address of business"
            required
            disabled={!isEditing}
            defaultValue={location.gps_address ?? ""}
          />

          {/* ── Map ── */}
          <div className="relative rounded-2xl overflow-hidden h-56 w-full">
            <iframe
              title="Business location map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                longitude - 0.02
              }%2C${latitude - 0.015}%2C${longitude + 0.02}%2C${
                latitude + 0.015
              }&layer=mapnik&marker=${latitude}%2C${longitude}`}
              className="w-full h-full border-0"
              loading="lazy"
            />
            <button
              type="button"
              disabled={!isEditing}
              id="edit-map-btn"
              className="absolute bottom-4 left-4 px-5 py-2.5 rounded-full bg-[#F82C5D] text-white text-sm font-semibold shadow-md hover:bg-[#d9254f] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Edit map
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F82C5D] text-white text-sm font-semibold hover:bg-[#d9254f] active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving && <Spinner size={14} className="text-white" />}
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-[#3D3D3D] text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
