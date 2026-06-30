"use client";

import { useState, useMemo } from 'react';
import IncidentCard from '@/components/Dashboard/IncidentCard';
import IncidentDetailModal from '@/components/Dashboard/IncidentDetailModal';
import FilterBar from '@/components/Dashboard/FilterBar';
import { mockIncidents, Incident, Category } from '@/lib/mock';

type SortKey = 'sourceCount' | 'confidence' | 'lastSeen' | 'urgency';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortKey>('sourceCount');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const filtered = useMemo(() => {
    let list =
      selectedCategory === 'ALL'
        ? [...mockIncidents]
        : mockIncidents.filter((i) => i.category === selectedCategory);

    list.sort((a, b) => {
      if (sortBy === 'sourceCount') return b.sourceCount - a.sourceCount;
      if (sortBy === 'confidence') return b.confidence - a.confidence;
      if (sortBy === 'urgency') {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.urgency] - order[a.urgency];
      }
      return 0;
    });

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard público</h1>
          <p className="text-sm text-slate-500 mt-1">
            Incidentes verificados y aprobados por revisores. Información en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
            <span className="block text-xs text-slate-500">Activos</span>
            <span className="font-semibold text-slate-900">{mockIncidents.length}</span>
          </div>
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
            <span className="block text-xs text-slate-500">Pendientes</span>
            <span className="font-semibold text-crisis-600">12</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <FilterBar selected={selectedCategory} onSelect={setSelectedCategory} />

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-crisis-500"
          >
            <option value="sourceCount">Más reportes</option>
            <option value="confidence">Mayor confianza</option>
            <option value="urgency">Mayor urgencia</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={setSelectedIncident}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-12">
              No hay incidentes en esta categoría.
            </p>
          )}
        </div>

        <aside className="bg-white rounded-lg border border-slate-200 p-4 h-fit">
          <h2 className="font-semibold text-slate-900 mb-3">Mapa / Zonas</h2>
          <div className="aspect-square bg-slate-100 rounded flex items-center justify-center text-slate-400 text-sm">
            Mapa interactivo (próximamente)
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Vargas</span>
              <span className="font-medium">3 incidentes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Distrito Capital</span>
              <span className="font-medium">2 incidentes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">La Guaira</span>
              <span className="font-medium">2 incidentes</span>
            </div>
          </div>
        </aside>
      </div>

      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
}
