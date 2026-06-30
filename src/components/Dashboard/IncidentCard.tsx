import { Incident, categoryLabels, categoryColors } from '@/lib/mock';
import MediaGallery from '@/components/MediaGallery';
import ShareCard from '@/components/ShareCard';

interface Props {
  incident: Incident;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function IncidentCard({ incident, isExpanded, onToggle }: Props) {
  return (
    <div
      className={`bg-white rounded-lg border transition-all ${
        isExpanded ? 'border-crisis-300 shadow-md' : 'border-slate-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start justify-between gap-3"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
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

          <p className={`text-sm text-slate-600 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {incident.summary}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
            <span>📍 {incident.location}</span>
            <span>🕒 {incident.lastSeen}</span>
            <span>🔗 {incident.sourceCount} reporte{incident.sourceCount > 1 ? 's' : ''}</span>
            <span>✅ Confianza {Math.round(incident.confidence * 100)}%</span>
            {incident.media.length > 0 && <span>📷 {incident.media.length}</span>}
          </div>
        </div>

        <span className="text-slate-400 text-lg leading-none pt-1">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4">
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
              <span className="block text-xs text-slate-500">Confianza IA</span>
              <span className="text-sm font-medium text-slate-900">
                {Math.round(incident.confidence * 100)}%
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="block text-xs text-slate-500">Reportes</span>
              <span className="text-sm font-medium text-slate-900">{incident.sourceCount}</span>
            </div>
          </div>

          <ShareCard incident={incident} />

          <button
            onClick={onToggle}
            className="mt-4 w-full py-2 text-sm text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            Contraer
          </button>
        </div>
      )}
    </div>
  );
}
