"use client";

import { useState } from 'react';
import ReportRow from '@/components/Review/ReportRow';
import { mockReports } from '@/lib/mock';

export default function ReviewPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const filtered = mockReports.filter((r) => (filter === 'all' ? true : r.status === filter));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Revisión de reportes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cada reporte generado por IA requiere aprobación humana antes de publicarse.
          </p>
        </div>

        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
          {(['pending', 'all', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-md capitalize ${
                filter === f
                  ? 'bg-crisis-100 text-crisis-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : f === 'approved' ? 'Aprobados' : 'Rechazados'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((report) => (
          <ReportRow key={report.id} report={report} />
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 text-center py-12">No hay reportes en este estado.</p>
        )}
      </div>
    </div>
  );
}
