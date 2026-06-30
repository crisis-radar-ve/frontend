"use client";

import { useState } from 'react';
import MediaUploader from '@/components/MediaUploader';
import SourceUrlList from '@/components/SourceUrlList';
import { api, API_BASE } from '@/lib/api';
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
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      if (tab === 'text') {
        await api.submitText(form.summary);
      } else if (tab === 'link') {
        await api.submitLink(form.sourceUrls[0] || '', form.summary);
      } else if (tab === 'screenshot') {
        const data = new FormData();
        files.forEach((file) => data.append('files', file));
        if (form.summary) data.append('caption', form.summary);
        const res = await fetch(`${API_BASE}/submit/screenshot`, {
          method: 'POST',
          body: data,
        });
        if (!res.ok) throw new Error('Error subiendo capturas');
      }

      setMessage('Enviado a revisión. Gracias.');
      setForm({
        category: '',
        urgency: 'medium',
        title: '',
        summary: '',
        location: '',
        sourceUrls: [''],
        sourceHandle: '',
      });
      setFiles([]);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
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
              value={form.summary}
              onChange={(e) => update('summary', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
            />
          </div>
        )}

        {tab === 'screenshot' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fotos / capturas
            </label>
            <MediaUploader onFilesSelected={setFiles} />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resumen</label>
          <textarea
            rows={3}
            placeholder="Describe brevemente el reporte..."
            value={form.summary}
            onChange={(e) => update('summary', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-crisis-600 text-white font-medium py-2.5 rounded-lg hover:bg-crisis-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Enviando...' : 'Enviar a revisión'}
        </button>

        {message && (
          <p className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
