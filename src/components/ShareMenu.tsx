"use client";

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';
import { ShareIcon, DownloadIcon, XIcon, InstagramIcon } from '@/components/icons';

interface Props {
  incident: Incident;
}

export default function ShareMenu({ incident }: Props) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const download = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `crisis-radar-${incident.id}.png`;
    link.href = dataUrl;
    link.click();
    setOpen(false);
  };

  const shareX = () => {
    const text = encodeURIComponent(
      `${incident.title}\n📍 ${incident.location}\nMás info en Crisis Radar VE`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    setOpen(false);
  };

  const shareIG = async () => {
    await download();
    alert('Imagen descargada. Ábrela en Instagram para compartirla.');
    setOpen(false);
  };

  const urgencyText =
    incident.urgency === 'high' ? 'Alta' : incident.urgency === 'medium' ? 'Media' : 'Baja';

  return (
    <div ref={menuRef} className="relative">
      {/* Hidden card for image generation */}
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '400px',
          boxSizing: 'border-box',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: '#ef4444',
            }}
          />
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Crisis Radar VE</span>
        </div>

        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 600,
            marginBottom: '12px',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
          }}
        >
          {categoryLabels[incident.category]}
        </span>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: '8px',
            wordBreak: 'break-word',
          }}
        >
          {incident.title}
        </h3>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#cbd5e1',
            marginBottom: '16px',
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {incident.summary}
        </p>

        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '4px', wordBreak: 'break-word' }}>📍 {incident.location}</p>
          <p style={{ marginBottom: '4px' }}>🚨 Urgencia: {urgencyText}</p>
          <p>🔗 {incident.sourceCount} fuente{incident.sourceCount > 1 ? 's' : ''}</p>
        </div>

        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #334155',
            fontSize: '11px',
            color: '#64748b',
            wordBreak: 'break-word',
          }}
        >
          Información pública sujeta a revisión. Verifica con fuentes oficiales.
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="p-1.5 text-slate-400 hover:text-crisis-600 transition-colors rounded-md hover:bg-slate-100"
        aria-label="Compartir"
        title="Compartir"
      >
        <ShareIcon className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[140px] z-10">
          <button
            onClick={download}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <DownloadIcon className="w-4 h-4" />
            Descargar
          </button>
          <button
            onClick={shareX}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <XIcon className="w-4 h-4" />
            X
          </button>
          <button
            onClick={shareIG}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <InstagramIcon className="w-4 h-4" />
            Instagram
          </button>
        </div>
      )}
    </div>
  );
}
