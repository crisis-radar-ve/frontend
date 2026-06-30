"use client";

import { useEffect } from 'react';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';
import MediaGallery from '@/components/MediaGallery';
import ShareCard from '@/components/ShareCard';

interface Props {
  incident: Incident;
  onClose: () => void;
}

export default function IncidentDetailModal({ incident, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  categoryColors[incident.category]
                }`}
              >
                {categoryLabels[incident.category]}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{incident.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">{incident.summary}</p>

          <MediaGallery media={incident.media} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="block text-xs text-slate-500">Ubicación</span>
              <span className="text-sm font-medium text-slate-900">{incident.location}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="block text-xs text-slate-500">Urgencia</span>
              <span
                className={`text-sm font-medium ${
                  incident.urgency === 'high'
                    ? 'text-red-600'
                    : incident.urgency === 'medium'
                    ? 'text-amber-600'
                    : 'text-slate-600'
                }`}
              >
                {incident.urgency === 'high' ? 'Alta' : incident.urgency === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="block text-xs text-slate-500">Confianza</span>
              <span className="text-sm font-medium text-slate-900">
                {Math.round(incident.confidence * 100)}%
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="block text-xs text-slate-500">Reportes</span>
              <span className="text-sm font-medium text-slate-900">{incident.sourceCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-6">
            <span>🕒 Último reporte: {incident.lastSeen}</span>
            <span>🔗 {incident.sourceCount} fuente{incident.sourceCount > 1 ? 's' : ''}</span>
          </div>

          <ShareCard incident={incident} />
        </div>
      </div>
    </div>
  );
}
