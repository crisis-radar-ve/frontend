"use client";

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import { MediaItem } from '@/lib/mock';

interface Props {
  media: MediaItem[];
}

export default function MediaGallery({ media }: Props) {
  const [index, setIndex] = useState<number>(-1);

  if (media.length === 0) return null;

  const slides = media.map((item) =>
    item.type === 'video'
      ? {
          type: 'video' as const,
          sources: [{ src: item.url, type: 'video/mp4' }],
          poster: item.thumbnailUrl,
        }
      : { type: 'image' as const, src: item.url }
  );

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Multimedia
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {media.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setIndex(idx)}
            className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group hover:border-crisis-300 transition-colors"
          >
            {item.type === 'video' && (
              <span className="absolute inset-0 flex items-center justify-center z-10">
                <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs">
                  ▶
                </span>
              </span>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnailUrl || item.url}
              alt={item.caption || 'Archivo del incidente'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Video]}
        render={{ buttonPrev: media.length > 1 ? undefined : () => null, buttonNext: media.length > 1 ? undefined : () => null }}
      />
    </div>
  );
}
