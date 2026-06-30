"use client";

import { useState } from 'react';

export default function SubmitPage() {
  const [tab, setTab] = useState<'link' | 'text' | 'screenshot'>('link');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Enviar información</h1>
      <p className="text-sm text-slate-500 mb-6">
        Comparte enlaces públicos, texto o capturas. Revisaremos el contenido antes de publicar.
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
            {t === 'link' ? 'Enlace' : t === 'text' ? 'Texto' : 'Captura'}
          </button>
        ))}
      </div>

      <form className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        {tab === 'link' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              URL pública
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/p/..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
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
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <p className="text-sm text-slate-500">
              Arrastra una captura aquí o haz clic para seleccionar
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-crisis-600 text-white font-medium py-2.5 rounded-lg hover:bg-crisis-700"
        >
          Enviar a revisión
        </button>
      </form>
    </div>
  );
}
