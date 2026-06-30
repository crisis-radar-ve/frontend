"use client";

import { useState } from 'react';
import { MediaItem } from '@/lib/mock';

interface Props {
  media: MediaItem[];
}

export default function MediaGallery({ media }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  if (media.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Imágenes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {media.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.url)}
            className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnailUrl || item.url}
              alt={item.caption || 'Imagen del incidente'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected} alt="Vista ampliada" className="w-full rounded-lg" />
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
