"use client";

import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';

interface Props {
  incident: Incident;
}

export default function ShareCard({ incident }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `crisis-radar-${incident.id}.png`;
    link.href = dataUrl;
    link.click();
  }, [incident.id]);

  const shareX = () => {
    const text = encodeURIComponent(
      `${incident.title}\n📍 ${incident.location}\nMás info en Crisis Radar VE`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareIG = () => {
    download();
    alert('Imagen descargada. Ábrela en Instagram para compartirla.');
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Compartir
      </h2>

      <div
        ref={cardRef}
        className="bg-slate-900 text-white p-6 rounded-xl max-w-md mx-auto mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-crisis-500 animate-pulse" />
          <span className="font-bold text-sm">Crisis Radar VE</span>
        </div>

        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${
            categoryColors[incident.category]
          }`}
        >
          {categoryLabels[incident.category]}
        </span>

        <h3 className="text-lg font-bold mb-2 leading-tight">{incident.title}</h3>
        <p className="text-sm text-slate-300 mb-4 line-clamp-3">{incident.summary}</p>

        <div className="space-y-1 text-xs text-slate-400">
          <p>📍 {incident.location}</p>
          <p>
            🚨 Urgencia:{' '}
            {incident.urgency === 'high' ? 'Alta' : incident.urgency === 'medium' ? 'Media' : 'Baja'}
          </p>
          <p>✅ Confianza: {Math.round(incident.confidence * 100)}%</p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
          Información pública sujeta a revisión. Verifica con fuentes oficiales.
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
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
