export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('crisisradar_token');
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('crisisradar_token', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('crisisradar_token');
}

export async function apiFetch(path: string, options?: RequestInit) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  submitLink: (url: string, rawText?: string) =>
    apiFetch('/submit/link', {
      method: 'POST',
      body: JSON.stringify({ url, raw_text: rawText }),
    }),

  submitText: (text: string) =>
    apiFetch('/submit/text', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),

  getReports: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return apiFetch(`/reports${query}`);
  },

  getIncidents: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return apiFetch(`/incidents${query}`);
  },

  reviewReport: (reportId: string, action: string, comment?: string) =>
    apiFetch(`/review/${reportId}`, {
      method: 'POST',
      body: JSON.stringify({ action, comment }),
    }),
};
