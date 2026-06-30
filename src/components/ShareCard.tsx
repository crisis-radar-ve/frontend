"use client";

import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';

interface Props {
  incident: Incident;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function ShareCard({ incident }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const generateCardDataUrl = useCallback(async () => {
    if (!cardRef.current) return '';
    return toPng(cardRef.current, { pixelRatio: 2 });
  }, []);

  const download = async () => {
    const dataUrl = await generateCardDataUrl();
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `crisis-radar-${incident.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const shareX = () => {
    const text = encodeURIComponent(
      `${incident.title}\n📍 ${incident.location}\nMás info en Crisis Radar VE`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareIG = async () => {
    await download();
    alert('Imagen descargada. Ábrela en Instagram para compartirla.');
  };

  const urgencyText =
    incident.urgency === 'high' ? 'Alta' : incident.urgency === 'medium' ? 'Media' : 'Baja';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Compartir
      </h2>

      {/* Hidden card used only for image generation */}
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

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={download}
          className="text-slate-500 hover:text-crisis-600 transition-colors"
          aria-label="Descargar imagen"
          title="Descargar imagen"
        >
          <DownloadIcon className="w-5 h-5" />
        </button>

        <button
          onClick={shareX}
          className="text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Compartir en X"
          title="Compartir en X"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <button
          onClick={shareIG}
          className="text-slate-500 hover:text-pink-600 transition-colors"
          aria-label="Compartir en Instagram"
          title="Compartir en Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
