"use client";

import { useState } from 'react';
import MediaUploader from '@/components/MediaUploader';
import SourceUrlList from '@/components/SourceUrlList';
import { Category, categoryLabels, Urgency } from '@/lib/mock';

const categories: Category[] = [
  'HELP_REQUESTED',
  'HELP_OFFERED',
  'MISSING_PERSON',
  'POSSIBLE_LOCATED',
  'HOSPITAL',
  'SHELTER',
  'ROAD_BLOCKED',
  'UTILITY_OUTAGE',
  'SEARCH_AND_RESCUE',
  'RUMOR',
];

export default function SubmitPage() {
  const [tab, setTab] = useState<'link' | 'text' | 'screenshot'>('link');
  const [form, setForm] = useState({
    category: '' as Category | '',
    urgency: 'medium' as Urgency,
    title: '',
    summary: '',
    location: '',
    sourceUrls: [''],
    sourceHandle: '',
  });

  const update = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Reporte enviado a revisión (modo prototipo)');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Enviar información</h1>
      <p className="text-sm text-slate-500 mb-6">
        Completa los datos del reporte. Pega un enlace, texto o sube capturas.
      </p>

      <div className="flex items-center gap-2 mb-6">
        {(['link', 'text', 'screenshot'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              tab === t
                ? 'bg-crisis-600 text-white border-crisis-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-crisis-300'
            }`}
          >
            {t === 'link' ? 'Enlace' : t === 'text' ? 'Texto' : 'Capturas'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        {tab === 'link' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              URLs públicas <span className="text-slate-400">(Instagram, X, noticia...)</span>
            </label>
            <SourceUrlList
              sources={form.sourceUrls}
              onChange={(urls) => setForm((prev) => ({ ...prev, sourceUrls: urls }))}
            />
          </div>
        )}

        {tab === 'text' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Texto del reporte
            </label>
            <textarea
              rows={5}
              placeholder="Pega aquí el texto de la publicación..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            />
          </div>
        )}

        {tab === 'screenshot' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fotos / capturas
            </label>
            <MediaUploader />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría *</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value as Category)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
              required
            >
              <option value="">Selecciona...</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Urgencia *</label>
            <select
              value={form.urgency}
              onChange={(e) => update('urgency', e.target.value as Urgency)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
          <input
            type="text"
            placeholder="Ej: Vía principal hacia La Guaira bloqueada"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resumen *</label>
          <textarea
            rows={4}
            placeholder="Describe lo que reportas..."
            value={form.summary}
            onChange={(e) => update('summary', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ubicación *</label>
            <input
              type="text"
              placeholder="Ej: Autopista Caracas-La Guaira"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Autor / cuenta fuente
            </label>
            <input
              type="text"
              placeholder="@usuario"
              value={form.sourceHandle}
              onChange={(e) => update('sourceHandle', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-crisis-600 text-white font-medium py-2.5 rounded-lg hover:bg-crisis-700 transition-colors"
        >
          Enviar a revisión
        </button>
      </form>
    </div>
  );
}
