"use client";

import { useState } from "react";

/* ── Types ── */
type ServiceItem = {
  id: string;
  name: string;
  price: string;
  duration: string;
};

type Category = {
  id: string;
  name: string;
  services: ServiceItem[];
};

const DURATION_OPTIONS = [
  "15mins",
  "30mins",
  "45mins",
  "1hr",
  "1hr 30mins",
  "2hrs",
  "2hrs 30mins",
  "3hrs",
];

const makeService = (): ServiceItem => ({
  id: Math.random().toString(36).slice(2),
  name: "",
  price: "",
  duration: "",
});

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Barbering services",
    services: [
      { id: "svc-1", name: "Haircut", price: "GHS 50", duration: "45mins" },
      makeService(),
      makeService(),
      makeService(),
      makeService(),
      makeService(),
    ],
  },
];

/* ── Single service row ── */
function ServiceRow({
  service,
  onChange,
}: {
  service: ServiceItem;
  onChange: (updated: ServiceItem) => void;
}) {
  const isEmpty = !service.name && !service.price;

  return (
    <div className="flex flex-col gap-2">
      {/* Name + Price */}
      <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-4 py-3">
        <input
          type="text"
          value={service.name}
          onChange={(e) => onChange({ ...service, name: e.target.value })}
          placeholder="Eg. Regular haircut"
          className={`flex-1 bg-transparent outline-none text-sm min-w-0 ${
            isEmpty ? "text-[#ADADAD]" : "text-[#1A1A1A] font-medium"
          } placeholder:text-[#ADADAD]`}
        />
        <span className="text-[#ADADAD] text-sm shrink-0">-</span>
        <input
          type="text"
          value={service.price}
          onChange={(e) => onChange({ ...service, price: e.target.value })}
          placeholder="Eg. GHS 50"
          className={`w-24 bg-transparent outline-none text-sm text-right min-w-0 ${
            isEmpty ? "text-[#ADADAD]" : "text-[#1A1A1A] font-medium"
          } placeholder:text-[#ADADAD]`}
        />
      </div>

      {/* Duration dropdown */}
      <div className="relative bg-[#F5F5F5] rounded-xl px-4 py-3 flex items-center">
        <select
          value={service.duration}
          onChange={(e) => onChange({ ...service, duration: e.target.value })}
          className={`flex-1 bg-transparent outline-none appearance-none text-sm cursor-pointer ${
            service.duration ? "text-[#1A1A1A] font-medium" : "text-[#ADADAD]"
          }`}
        >
          <option value="" disabled hidden>
            Duration of service. Eg 30mins
          </option>
          {DURATION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <div className="pointer-events-none shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#ADADAD"
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

/* ── Category block ── */
function CategoryBlock({
  category,
  onChange,
}: {
  category: Category;
  onChange: (updated: Category) => void;
}) {
  const addService = () => {
    onChange({ ...category, services: [...category.services, makeService()] });
  };

  const updateService = (index: number, updated: ServiceItem) => {
    const services = [...category.services];
    services[index] = updated;
    onChange({ ...category, services });
  };

  // Split services into left (even indices) and right (odd indices)
  const leftServices = category.services.filter((_, i) => i % 2 === 0);
  const rightServices = category.services.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-start">
      {/* ── LEFT column ── */}
      <div className="flex flex-col gap-4">
        {/* Category name */}
        <div className="bg-[#F5F5F5] rounded-xl px-4 py-3">
          <input
            type="text"
            value={category.name}
            onChange={(e) =>
              onChange({ ...category, name: e.target.value })
            }
            placeholder="Category name"
            className="w-full bg-transparent outline-none text-sm font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]"
          />
        </div>

        {leftServices.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            service={svc}
            onChange={(updated) => updateService(i * 2, updated)}
          />
        ))}
      </div>

      {/* ── RIGHT column ── */}
      <div className="flex flex-col gap-4">
        {rightServices.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            service={svc}
            onChange={(updated) => updateService(i * 2 + 1, updated)}
          />
        ))}

        {/* Add more services */}
        <button
          onClick={addService}
          className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-[#838383] text-sm font-medium hover:border-[#F82C5D] hover:text-[#F82C5D] transition-colors"
        >
          Add more services
        </button>
      </div>
    </div>
  );
}

/* ── Main tab ── */
export function PriceListTab() {
  const [categories, setCategories] =
    useState<Category[]>(DEFAULT_CATEGORIES);

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        name: "",
        services: [makeService(), makeService()],
      },
    ]);
  };

  const updateCategory = (index: number, updated: Category) => {
    const next = [...categories];
    next[index] = updated;
    setCategories(next);
  };

  return (
    <div className="flex flex-col gap-8">
      {categories.map((cat, i) => (
        <CategoryBlock
          key={cat.id}
          category={cat}
          onChange={(updated) => updateCategory(i, updated)}
        />
      ))}

      {/* Add a new category */}
      <div className="flex justify-end">
        <button
          id="add-new-category-btn"
          onClick={addCategory}
          className="px-6 py-3 rounded-full bg-[#F82C5D] text-white text-sm font-semibold hover:bg-[#d9254f] active:scale-95 transition-all duration-150 shadow-sm"
        >
          Add a new category
        </button>
      </div>
    </div>
  );
}
