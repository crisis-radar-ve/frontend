import { categoryLabels, categoryColors } from '@/lib/mock';

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
  status: string;
  media: { id: string; url: string; thumbnailUrl: string }[];
}

interface Props {
  report: Report;
  onAction: (reportId: string, action: string) => void;
}

export default function ReportRow({ report, onAction }: Props) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                categoryColors[report.category as keyof typeof categoryColors] || 'bg-slate-100 text-slate-800'
              }`}
            >
              {categoryLabels[report.category as keyof typeof categoryLabels] || report.category}
            </span>
            <span
              className={`text-xs font-semibold uppercase ${
                report.urgency === 'high'
                  ? 'text-red-600'
                  : report.urgency === 'medium'
                  ? 'text-amber-600'
                  : 'text-slate-500'
              }`}
            >
              {report.urgency === 'high' ? 'Alta' : report.urgency === 'medium' ? 'Media' : 'Baja'}
            </span>
            <span className="text-xs text-slate-400">{report.createdAt}</span>
          </div>

          <p className="text-slate-900 font-medium mb-1">{report.summary}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-2">
            <span>📍 {report.location}</span>
            <span>
              🔗{' '}
              <a
                href={report.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crisis-600 hover:underline"
              >
                {report.sourceHandle}
              </a>
            </span>
            <span>✅ Confianza {Math.round(report.confidence * 100)}%</span>
          </div>

          {report.media.length > 0 && (
            <div className="flex gap-2">
              {report.media.map((m) => (
                <div key={m.id} className="w-16 h-16 rounded overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.thumbnailUrl || m.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex md:flex-col gap-2">
          <button
            onClick={() => onAction(report.id, 'approve')}
            className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700"
          >
            Aprobar
          </button>
          <button
            onClick={() => onAction(report.id, 'duplicate')}
            className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200"
          >
            Duplicado
          </button>
          <button
            onClick={() => onAction(report.id, 'reject')}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
