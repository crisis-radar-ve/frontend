"use client";

import { useEffect, useState } from 'react';
import ReportRow from '@/components/Review/ReportRow';
import { api } from '@/lib/api';

interface Report {
  id: string;
  category: string;
  summary: string;
  sourceUrl: string;
  sourceHandle: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  confidence: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  media: { id: string; url: string; thumbnailUrl: string }[];
}

export default function ReviewPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = filter === 'all' ? {} : { review_status: filter };
      const data = await api.getReports(params);
      const mapped = data.map((r: any) => ({
        id: r.id,
        category: r.category,
        summary: r.summary,
        sourceUrl: r.source_url || '',
        sourceHandle: r.original_author_handle || 'Anónimo',
        location: r.location_text || 'Desconocida',
        urgency: r.urgency,
        confidence: r.confidence,
        createdAt: new Date(r.created_at).toLocaleString('es-VE'),
        status: r.review_status,
        media: r.media || [],
      }));
      setReports(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const handleAction = async (reportId: string, action: string) => {
    try {
      await api.reviewReport(reportId, action);
      fetchReports();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-6 text-slate-500">Cargando reportes...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Revisión de reportes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cada reporte generado requiere aprobación humana antes de publicarse.
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
        {reports.map((report) => (
          <ReportRow
            key={report.id}
            report={report}
            onAction={handleAction}
          />
        ))}
        {reports.length === 0 && (
          <p className="text-slate-500 text-center py-12">No hay reportes en este estado.</p>
        )}
      </div>
    </div>
  );
}
