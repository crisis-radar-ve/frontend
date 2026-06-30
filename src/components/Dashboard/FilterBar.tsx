import { Category, categoryLabels } from '@/lib/mock';

interface Props {
  selected: Category | 'ALL';
  onSelect: (category: Category | 'ALL') => void;
}

const options: (Category | 'ALL')[] = [
  'ALL',
  'MISSING_PERSON',
  'POSSIBLE_LOCATED',
  'ROAD_BLOCKED',
  'HOSPITAL',
  'SHELTER',
  'UTILITY_OUTAGE',
  'HELP_REQUESTED',
  'HELP_OFFERED',
  'RUMOR',
];

export default function FilterBar({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selected === opt
              ? 'bg-crisis-600 text-white border-crisis-600'
              : 'bg-white text-slate-600 border-slate-200 hover:border-crisis-300'
          }`}
        >
          {opt === 'ALL' ? 'Todas' : categoryLabels[opt]}
        </button>
      ))}
    </div>
  );
}
