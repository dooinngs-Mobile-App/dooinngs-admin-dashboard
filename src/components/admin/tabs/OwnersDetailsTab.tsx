"use client";

import { useRef } from "react";

type Props = {
  artisan: {
    name: string;
    phone: string;
    email: string;
  };
};

/* ── Floating-label outlined input ── */
function OutlinedInput({
  id,
  label,
  required,
  defaultValue,
  type = "text",
}: {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="relative">
      {/* Border container */}
      <div className="relative rounded-xl border border-gray-300 px-4 pt-5 pb-4 bg-white">
        {/* Floating label — sits on the top border line */}
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3.5 px-1 bg-white text-xs text-[#9E9E9E] leading-none"
        >
          {label}
          {required && <span className="text-[#9E9E9E]"> *</span>}
        </label>

        {/* Input */}
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          className="w-full text-[#1A1A1A] text-lg font-normal outline-none bg-transparent placeholder:text-[#C4C4C4]"
        />
      </div>
    </div>
  );
}

export function OwnersDetailsTab({ artisan }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, ...rest] = artisan.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="flex flex-col gap-7 max-w-2xl">
      {/* ── Profile image section ── */}
      <div className="flex flex-col gap-2">
        {/* Avatar with refresh icon */}
        <div className="relative w-fit">
          {/* Circular profile image placeholder */}
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C14.396 13 16.575 13.694 18.178 14.671C18.978 15.161 19.662 15.736 20.156 16.361C20.642 16.977 21 17.713 21 18.5C21 19.345 20.589 20.011 19.997 20.486C19.437 20.936 18.698 21.234 17.913 21.442C16.335 21.859 14.229 22 12 22C9.771 22 7.665 21.86 6.087 21.442C5.302 21.234 4.563 20.936 4.003 20.486C3.41 20.01 3 19.345 3 18.5C3 17.713 3.358 16.977 3.844 16.361C4.338 15.736 5.021 15.161 5.822 14.671C7.425 13.694 9.605 13 12 13Z"
                  fill="white"
                />
                <path
                  d="M12 2C15.848 2 18.255 6.167 16.33 9.5C15.891 10.26 15.26 10.891 14.5 11.33C13.74 11.769 12.877 12 12 12C8.151 12 5.745 7.833 7.67 4.5C8.109 3.74 8.74 3.109 9.5 2.67C10.26 2.231 11.123 2 12 2Z"
                  fill="rgba(255,255,255,0.7)"
                />
              </svg>
            </div>
          </div>

          {/* Pink refresh / change icon */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-lg bg-[#F82C5D] flex items-center justify-center shadow-sm hover:bg-[#d9254f] transition-colors"
            aria-label="Change profile image"
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

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            aria-label="Upload profile image"
          />
        </div>

        {/* Label */}
        <p className="text-sm text-[#9E9E9E]">Profile Image</p>

        {/* Delete image button */}
        <button
          id="delete-profile-image-btn"
          className="w-fit px-5 py-2 rounded-full border border-[#F82C5D] text-[#1A1A1A] text-sm font-medium hover:bg-[#fff0f3] transition-colors"
        >
          Delete image
        </button>
      </div>

      {/* ── Form fields ── */}
      <OutlinedInput
        id="owner-first-name"
        label="First name"
        required
        defaultValue={firstName}
      />

      <OutlinedInput
        id="owner-last-name"
        label="Last name"
        required
        defaultValue={lastName}
      />

      <OutlinedInput
        id="owner-email"
        label="Email address"
        type="email"
        defaultValue={artisan.email}
      />

      <OutlinedInput
        id="owner-phone"
        label="Phone number"
        type="tel"
        defaultValue={artisan.phone}
      />
    </div>
  );
}
