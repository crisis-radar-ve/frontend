import { Incident, categoryLabels, categoryColors } from '@/lib/mock';

interface Props {
  incident: Incident;
  onClick: (incident: Incident) => void;
}

export default function IncidentCard({ incident, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(incident)}
      className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            categoryColors[incident.category]
          }`}
        >
          {categoryLabels[incident.category]}
        </span>
        <span
          className={`text-xs font-semibold uppercase ${
            incident.urgency === 'high'
              ? 'text-red-600'
              : incident.urgency === 'medium'
              ? 'text-amber-600'
              : 'text-slate-500'
          }`}
        >
          {incident.urgency === 'high' ? 'Alta' : incident.urgency === 'medium' ? 'Media' : 'Baja'}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 mb-1">{incident.title}</h3>

      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{incident.summary}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>📍 {incident.location}</span>
        <span>🕒 {incident.lastSeen}</span>
        <span>🔗 {incident.sourceCount} reporte{incident.sourceCount > 1 ? 's' : ''}</span>
        <span>✅ Confianza {Math.round(incident.confidence * 100)}%</span>
        {incident.media.length > 0 && <span>📷 {incident.media.length}</span>}
      </div>
    </div>
  );
}
