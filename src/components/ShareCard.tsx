"use client";

import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';

interface Props {
  incident: Incident;
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

      {/* Hidden card used only for image generation. Rendered off-screen to keep dimensions. */}
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
          <p style={{ marginBottom: '4px', wordBreak: 'break-word' }}>
            📍 {incident.location}
          </p>
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

      <div className="flex flex-wrap gap-2">
        <button
          onClick={download}
          className="px-4 py-2 text-sm font-medium text-white bg-crisis-600 rounded-lg hover:bg-crisis-700"
        >
          Descargar imagen
        </button>
        <button
          onClick={shareX}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          Compartir en X
        </button>
        <button
          onClick={shareIG}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          Compartir en Instagram
        </button>
      </div>
    </div>
  );
}
