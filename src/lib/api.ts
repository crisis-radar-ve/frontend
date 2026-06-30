const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
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
