"use client";

import type { BusinessPhoto } from "@/api/client";

export function BusinessImagesTab({ photos }: { photos?: BusinessPhoto[] }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#838383]">
        <p className="text-sm font-medium">No business images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photo.image_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F5]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.thumbnail_url || photo.image_url}
            alt="Business"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}
