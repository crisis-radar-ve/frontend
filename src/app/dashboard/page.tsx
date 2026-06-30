"use client";

import { useState, useMemo, useEffect } from 'react';
import IncidentCard from '@/components/Dashboard/IncidentCard';
import FilterBar from '@/components/Dashboard/FilterBar';
import { api } from '@/lib/api';
import { Category } from '@/lib/mock';

interface Incident {
  id: string;
  title: string;
  category: Category;
  summary: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  confidence: number;
  sourceCount: number;
  sourceUrls: string[];
  lastSeen: string;
  status: 'active' | 'resolved' | 'closed';
  visibility: 'public' | 'responders_only' | 'reviewer_only';
  media: { id: string; type: 'image' | 'video'; url: string; thumbnailUrl: string; caption?: string }[];
}

type SortKey = 'sourceCount' | 'confidence' | 'lastSeen' | 'urgency';

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortKey>('sourceCount');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    api
      .getIncidents({ visibility: 'public' })
      .then((data) => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          summary: item.public_summary || item.summary,
          location: item.location,
          urgency: item.urgency,
          confidence: item.confidence,
          sourceCount: item.report_count || 1,
          sourceUrls: item.source_urls || [],
          lastSeen: item.last_seen ? new Date(item.last_seen).toLocaleString('es-VE') : '',
          status: item.status,
          visibility: item.visibility,
          media: item.media || [],
        }));
        setIncidents(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list =
      selectedCategory === 'ALL'
        ? [...incidents]
        : incidents.filter((i) => i.category === selectedCategory);

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
  }, [incidents, selectedCategory, sortBy]);

  if (loading) return <p className="p-6 text-slate-500">Cargando incidentes...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard público</h1>
          <p className="text-sm text-slate-500 mt-1">
            Incidentes verificados y aprobados por revisores.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
            <span className="block text-xs text-slate-500">Activos</span>
            <span className="font-semibold text-slate-900">{incidents.length}</span>
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
              isExpanded={expandedId === incident.id}
              onToggle={() => setExpandedId(expandedId === incident.id ? null : incident.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-12">No hay incidentes públicos.</p>
          )}
        </div>

        <aside className="bg-white rounded-lg border border-slate-200 p-4 h-fit">
          <h2 className="font-semibold text-slate-900 mb-3">Mapa / Zonas</h2>
          <div className="aspect-square bg-slate-100 rounded flex items-center justify-center text-slate-400 text-sm">
            Mapa interactivo (próximamente)
          </div>
        </aside>
      </div>
    </div>
  );
}
