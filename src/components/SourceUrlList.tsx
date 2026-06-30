"use client";

interface Props {
  sources: string[];
  onChange: (sources: string[]) => void;
}

export default function SourceUrlList({ sources, onChange }: Props) {
  const update = (idx: number, value: string) => {
    const next = [...sources];
    next[idx] = value;
    onChange(next);
  };

  const add = () => onChange([...sources, '']);

  const remove = (idx: number) => {
    const next = sources.filter((_, i) => i !== idx);
    onChange(next.length ? next : ['']);
  };

  return (
    <div className="space-y-2">
      {sources.map((url, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="url"
            placeholder="https://instagram.com/p/..."
            value={url}
            onChange={(e) => update(idx, e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crisis-500"
          />
          {sources.length > 1 && (
            <button
              type="button"
              onClick={() => remove(idx)}
              className="px-3 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm text-crisis-600 font-medium hover:text-crisis-700"
      >
        + Agregar otra fuente
      </button>
    </div>
  );
}
