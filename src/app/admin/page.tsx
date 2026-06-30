"use client";

import { useState } from 'react';
import { Reviewer, mockReviewers } from '@/lib/users';

export default function AdminPage() {
  const [reviewers, setReviewers] = useState<Reviewer[]>(mockReviewers);
  const [isEditing, setIsEditing] = useState<Reviewer | null>(null);
  const [form, setForm] = useState<Partial<Reviewer>>({
    name: '',
    email: '',
    role: 'reviewer',
    organization: '',
    active: true,
  });

  const resetForm = () => {
    setForm({ name: '', email: '', role: 'reviewer', organization: '', active: true });
    setIsEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (isEditing) {
      setReviewers((prev) =>
        prev.map((r) =>
          r.id === isEditing.id
            ? { ...r, ...(form as Omit<Reviewer, 'id' | 'createdAt'>) }
            : r
        )
      );
    } else {
      const newReviewer: Reviewer = {
        id: `u${Date.now()}`,
        name: form.name!,
        email: form.email!,
        role: form.role as 'reviewer' | 'admin',
        organization: form.organization || '',
        active: form.active ?? true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setReviewers((prev) => [...prev, newReviewer]);
    }
    resetForm();
  };

  const handleEdit = (reviewer: Reviewer) => {
    setIsEditing(reviewer);
    setForm({ ...reviewer });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Seguro que quieres eliminar este revisor?')) {
      setReviewers((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Administración</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gestiona revisores y administradores del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h2 className="font-semibold text-slate-900 mb-4">
            {isEditing ? 'Editar revisor' : 'Agregar revisor'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nombre</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Correo</label>
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Organización</label>
              <input
                type="text"
                value={form.organization || ''}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Rol</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as 'reviewer' | 'admin' })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
              >
                <option value="reviewer">Revisor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
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
                  onClick={resetForm}
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
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Revisores ({reviewers.length})</h2>
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
                      onClick={() => handleEdit(reviewer)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(reviewer.id)}
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
    </div>
  );
}
