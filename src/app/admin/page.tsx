"use client";

import { useState, useEffect } from 'react';
import { Reviewer, mockReviewers } from '@/lib/users';
import { Category, categoryLabels, Urgency } from '@/lib/mock';
import MediaUploader from '@/components/MediaUploader';
import SourceUrlList from '@/components/SourceUrlList';
import { api, setToken, clearToken } from '@/lib/api';

const categories: Category[] = [
  'HELP_REQUESTED',
  'HELP_OFFERED',
  'MISSING_PERSON',
  'POSSIBLE_LOCATED',
  'HOSPITAL',
  'SHELTER',
  'ROAD_BLOCKED',
  'UTILITY_OUTAGE',
  'SEARCH_AND_RESCUE',
  'RUMOR',
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reviewers' | 'publish'>('reviewers');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('crisisradar_token') : null;
    if (token) setIsLoggedIn(true);
  }, []);

  // Reviewers state
  const [reviewers, setReviewers] = useState<Reviewer[]>(mockReviewers);
  const [isEditing, setIsEditing] = useState<Reviewer | null>(null);
  const [reviewerForm, setReviewerForm] = useState<Partial<Reviewer>>({
    name: '',
    email: '',
    role: 'reviewer',
    organization: '',
    active: true,
  });

  // Publish report state
  const [reportForm, setReportForm] = useState({
    category: '' as Category | '',
    urgency: 'medium' as Urgency,
    title: '',
    summary: '',
    location: '',
    sourceUrls: [''],
    sourceHandle: '',
    publishImmediately: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await api.login(loginForm.email, loginForm.password);
      setToken(res.access_token);
      setIsLoggedIn(true);
    } catch (err) {
      setLoginError('Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-sm w-full">
          <h1 className="text-xl font-bold text-slate-900 mb-2 text-center">Administración</h1>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Acceso restringido a editores y administradores.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Correo</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-crisis-600 text-white font-medium py-2.5 rounded-lg hover:bg-crisis-700"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Reviewer handlers
  const resetReviewerForm = () => {
    setReviewerForm({ name: '', email: '', role: 'reviewer', organization: '', active: true });
    setIsEditing(null);
  };

  const handleReviewerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerForm.name || !reviewerForm.email) return;

    if (isEditing) {
      setReviewers((prev) =>
        prev.map((r) =>
          r.id === isEditing.id
            ? { ...r, ...(reviewerForm as Omit<Reviewer, 'id' | 'createdAt'>) }
            : r
        )
      );
    } else {
      const newReviewer: Reviewer = {
        id: `u${Date.now()}`,
        name: reviewerForm.name!,
        email: reviewerForm.email!,
        role: reviewerForm.role as 'reviewer' | 'admin',
        organization: reviewerForm.organization || '',
        active: reviewerForm.active ?? true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setReviewers((prev) => [...prev, newReviewer]);
    }
    resetReviewerForm();
  };

  const handleEditReviewer = (reviewer: Reviewer) => {
    setIsEditing(reviewer);
    setReviewerForm({ ...reviewer });
  };

  const handleDeleteReviewer = (id: string) => {
    if (confirm('¿Seguro que quieres eliminar este revisor?')) {
      setReviewers((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Publish handler
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const action = reportForm.publishImmediately ? 'publicado' : 'enviado a revisión';
    alert(`Reporte ${action} (modo prototipo)`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Administración</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona revisores y publica reportes.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-600 hover:text-crisis-600"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('reviewers')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'reviewers'
              ? 'border-crisis-600 text-crisis-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Revisores
        </button>
        <button
          onClick={() => setActiveTab('publish')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'publish'
              ? 'border-crisis-600 text-crisis-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Publicar reporte
        </button>
      </div>

      {activeTab === 'reviewers' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h2 className="font-semibold text-slate-900 mb-4">
              {isEditing ? 'Editar revisor' : 'Agregar revisor'}
            </h2>

            <form onSubmit={handleReviewerSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={reviewerForm.name || ''}
                  onChange={(e) => setReviewerForm({ ...reviewerForm, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Correo</label>
                <input
                  type="email"
                  value={reviewerForm.email || ''}
                  onChange={(e) => setReviewerForm({ ...reviewerForm, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Organización
                </label>
                <input
                  type="text"
                  value={reviewerForm.organization || ''}
                  onChange={(e) =>
                    setReviewerForm({ ...reviewerForm, organization: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Rol</label>
                <select
                  value={reviewerForm.role}
                  onChange={(e) =>
                    setReviewerForm({ ...reviewerForm, role: e.target.value as 'reviewer' | 'admin' })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                >
                  <option value="reviewer">Revisor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={reviewerForm.active}
                  onChange={(e) => setReviewerForm({ ...reviewerForm, active: e.target.checked })}
                  className="rounded border-slate-300 text-crisis-600 focus:ring-crisis-500"
                />
                Activo
              </label>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-crisis-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-crisis-700"
                >
                  {isEditing ? 'Guardar cambios' : 'Agregar'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetReviewerForm}
                    className="px-3 py-2 text-sm text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">
                  Revisores ({reviewers.length})
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {reviewers.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{reviewer.name}</span>
                        <span
                          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                            reviewer.role === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {reviewer.role}
                        </span>
                        {!reviewer.active && (
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Inactivo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{reviewer.email}</p>
                      {reviewer.organization && (
                        <p className="text-xs text-slate-400">{reviewer.organization}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditReviewer(reviewer)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteReviewer(reviewer.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                ))}
                {reviewers.length === 0 && (
                  <p className="p-8 text-center text-slate-500">No hay revisores registrados.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Publicar reporte manualmente</h2>

          <form onSubmit={handlePublish} className="space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Categoría *
                </label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value as Category })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                  required
                >
                  <option value="">Selecciona...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {categoryLabels[c]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Urgencia *</label>
                <select
                  value={reportForm.urgency}
                  onChange={(e) => setReportForm({ ...reportForm, urgency: e.target.value as Urgency })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
              <input
                type="text"
                placeholder="Ej: Vía principal hacia La Guaira bloqueada"
                value={reportForm.title}
                onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Resumen *</label>
              <textarea
                rows={4}
                placeholder="Describe lo que reportas..."
                value={reportForm.summary}
                onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ubicación *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Autopista Caracas-La Guaira"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  URLs fuente
                </label>
                <SourceUrlList
                  sources={reportForm.sourceUrls}
                  onChange={(urls) => setReportForm({ ...reportForm, sourceUrls: urls })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Autor / cuenta fuente
              </label>
              <input
                type="text"
                placeholder="@usuario"
                value={reportForm.sourceHandle}
                onChange={(e) => setReportForm({ ...reportForm, sourceHandle: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fotos / capturas
              </label>
              <MediaUploader />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={reportForm.publishImmediately}
                onChange={(e) =>
                  setReportForm({ ...reportForm, publishImmediately: e.target.checked })
                }
                className="rounded border-slate-300 text-crisis-600 focus:ring-crisis-500"
              />
              Publicar inmediatamente (sin pasar por revisión)
            </label>

            <button
              type="submit"
              className="w-full bg-crisis-600 text-white font-medium py-2.5 rounded-lg hover:bg-crisis-700 transition-colors"
            >
              {reportForm.publishImmediately ? 'Publicar ahora' : 'Enviar a revisión'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
