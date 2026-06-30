import { notFound } from 'next/navigation';
import { mockIncidents, categoryLabels, categoryColors } from '@/lib/mock';

interface Props {
  params: { id: string };
}

export default function IncidentDetailPage({ params }: Props) {
  const incident = mockIncidents.find((i) => i.id === params.id);
  if (!incident) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            categoryColors[incident.category]
          }`}
        >
          {categoryLabels[incident.category]}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-4">{incident.title}</h1>

      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Resumen
        </h2>
        <p className="text-slate-800 leading-relaxed">{incident.summary}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <span className="block text-xs text-slate-500">Ubicación</span>
          <span className="font-medium text-slate-900">{incident.location}</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <span className="block text-xs text-slate-500">Urgencia</span>
          <span
            className={`font-medium ${
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
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <span className="block text-xs text-slate-500">Confianza</span>
          <span className="font-medium text-slate-900">
            {Math.round(incident.confidence * 100)}%
          </span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <span className="block text-xs text-slate-500">Fuentes</span>
          <span className="font-medium text-slate-900">{incident.sourceCount}</span>
        </div>
      </div>

      <div className="bg-crisis-50 border border-crisis-100 p-4 rounded-lg">
        <p className="text-sm text-crisis-900">
          <strong>Información pública no verificada.</strong> Siempre confirma con canales
          oficiales antes de actuar.
        </p>
      </div>
    </div>
  );
}
