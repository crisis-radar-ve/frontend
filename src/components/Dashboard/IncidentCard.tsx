import { motion, AnimatePresence } from 'framer-motion';
import { Incident, categoryLabels, categoryColors } from '@/lib/mock';
import MediaGallery from '@/components/MediaGallery';
import ShareMenu from '@/components/ShareMenu';

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
      <div className="flex items-start">
        <button
          onClick={onToggle}
          className="flex-1 text-left p-4"
        >
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

          {!isExpanded && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
              <span>📍 {incident.location}</span>
              <span>🕒 {incident.lastSeen}</span>
              <span>🔗 {incident.sourceCount} reporte{incident.sourceCount > 1 ? 's' : ''}</span>
              <span>✅ Confianza {Math.round(incident.confidence * 100)}%</span>
              {incident.media.length > 0 && <span>📷 {incident.media.length}</span>}
            </div>
          )}
        </button>

        <div className="flex items-start gap-1 pt-2 pr-2">
          <ShareMenu incident={incident} />
          <button
            onClick={onToggle}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-100"
            aria-label={isExpanded ? 'Contraer' : 'Expandir'}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="block text-lg leading-none"
            >
              ▼
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-slate-100 pt-4">
              <MediaGallery media={incident.media} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="block text-xs text-slate-500">Ubicación</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      incident.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-crisis-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {incident.location} ↗
                  </a>
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

              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Fuentes
                </h4>
                <ul className="space-y-1">
                  {incident.sourceUrls.map((url, idx) => (
                    <li key={idx}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-crisis-600 hover:underline break-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {url.length > 50 ? `${url.slice(0, 50)}...` : url} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
