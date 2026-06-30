export type Category =
  | 'HELP_REQUESTED'
  | 'HELP_OFFERED'
  | 'MISSING_PERSON'
  | 'POSSIBLE_LOCATED'
  | 'HOSPITAL'
  | 'SHELTER'
  | 'ROAD_BLOCKED'
  | 'UTILITY_OUTAGE'
  | 'SEARCH_AND_RESCUE'
  | 'RUMOR';

export type Urgency = 'low' | 'medium' | 'high';
export type Visibility = 'public' | 'responders_only' | 'reviewer_only';

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl: string;
  caption?: string;
}

export interface Incident {
  id: string;
  title: string;
  category: Category;
  summary: string;
  location: string;
  urgency: Urgency;
  confidence: number;
  sourceCount: number;
  sourceUrls: string[];
  lastSeen: string;
  status: 'active' | 'resolved' | 'closed';
  visibility: Visibility;
  media: MediaItem[];
}

export interface Report {
  id: string;
  category: Category;
  summary: string;
  sourceUrl: string;
  sourceHandle: string;
  location: string;
  urgency: Urgency;
  confidence: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  media: MediaItem[];
}

export const categoryLabels: Record<Category, string> = {
  HELP_REQUESTED: 'Ayuda solicitada',
  HELP_OFFERED: 'Ayuda ofrecida',
  MISSING_PERSON: 'Persona desaparecida',
  POSSIBLE_LOCATED: 'Posible ubicación',
  HOSPITAL: 'Hospital',
  SHELTER: 'Refugio',
  ROAD_BLOCKED: 'Vía bloqueada',
  UTILITY_OUTAGE: 'Fallo de servicio',
  SEARCH_AND_RESCUE: 'Búsqueda y rescate',
  RUMOR: 'Rumor',
};

export const categoryColors: Record<Category, string> = {
  HELP_REQUESTED: 'bg-orange-100 text-orange-800',
  HELP_OFFERED: 'bg-emerald-100 text-emerald-800',
  MISSING_PERSON: 'bg-red-100 text-red-800',
  POSSIBLE_LOCATED: 'bg-blue-100 text-blue-800',
  HOSPITAL: 'bg-rose-100 text-rose-800',
  SHELTER: 'bg-teal-100 text-teal-800',
  ROAD_BLOCKED: 'bg-amber-100 text-amber-800',
  UTILITY_OUTAGE: 'bg-yellow-100 text-yellow-800',
  SEARCH_AND_RESCUE: 'bg-purple-100 text-purple-800',
  RUMOR: 'bg-slate-100 text-slate-800',
};

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Vía principal hacia La Guaira reportada como bloqueada',
    category: 'ROAD_BLOCKED',
    summary:
      'Múltiples usuarios reportan que la autopista tiene derrumbes y no es transitable en ambos sentidos cerca del peaje.',
    location: 'Autopista Caracas-La Guaira',
    urgency: 'high',
    confidence: 0.91,
    sourceCount: 4,
    sourceUrls: [
      'https://instagram.com/p/abc123',
      'https://twitter.com/user/status/xyz',
      'https://instagram.com/p/def456',
      'https://facebook.com/groups/xxx',
    ],
    lastSeen: 'Hace 25 min',
    status: 'active',
    visibility: 'public',
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=200&q=60',
        caption: 'Vía bloqueada',
      },
    ],
  },
  {
    id: '2',
    title: 'Persona mayor desaparecida en sector Macuto',
    category: 'MISSING_PERSON',
    summary:
      'Familia busca a adulto mayor de 78 años visto por última vez cerca de la avenida Principal de Macuto.',
    location: 'Macuto, Vargas',
    urgency: 'high',
    confidence: 0.84,
    sourceCount: 2,
    sourceUrls: [
      'https://instagram.com/p/missing1',
      'https://twitter.com/familia/status/123',
    ],
    lastSeen: 'Hace 1 h',
    status: 'active',
    visibility: 'public',
    media: [],
  },
  {
    id: '3',
    title: 'Hospital central recibiendo donaciones de insumos',
    category: 'HOSPITAL',
    summary:
      'Personal del hospital publica lista de insumos médicos urgentes y horario para recibir donaciones.',
    location: 'Caracas',
    urgency: 'medium',
    confidence: 0.88,
    sourceCount: 1,
    sourceUrls: ['https://instagram.com/p/hospital'],
    lastSeen: 'Hace 2 h',
    status: 'active',
    visibility: 'public',
    media: [
      {
        id: 'm2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1587351021759-3e566b2af12a?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b2af12a?w=200&q=60',
        caption: 'Lista de insumos',
      },
    ],
  },
  {
    id: '4',
    title: 'Refugio temporal habilitado en gimnasio municipal',
    category: 'SHELTER',
    summary:
      'Gimnasio municipal abre sus puertas como refugio temporal. Se necesitan colchonetas y agua embotellada.',
    location: 'La Guaira',
    urgency: 'medium',
    confidence: 0.79,
    sourceCount: 3,
    sourceUrls: [
      'https://instagram.com/p/refugio1',
      'https://twitter.com/voluntario/status/456',
      'https://facebook.com/groups/yyy',
    ],
    lastSeen: 'Hace 3 h',
    status: 'active',
    visibility: 'public',
    media: [
      {
        id: 'm3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&q=60',
        caption: 'Refugio',
      },
      {
        id: 'm4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=200&q=60',
        caption: 'Donaciones',
      },
    ],
  },
  {
    id: '5',
    title: 'Posible persona ubicada en refugio de Catia La Mar',
    category: 'POSSIBLE_LOCATED',
    summary:
      'Voluntario reporta ver a una persona coincidente con descripción de reporte de desaparecido.',
    location: 'Catia La Mar, Vargas',
    urgency: 'high',
    confidence: 0.62,
    sourceCount: 1,
    sourceUrls: ['https://instagram.com/p/ubicado'],
    lastSeen: 'Hace 30 min',
    status: 'active',
    visibility: 'responders_only',
    media: [
      {
        id: 'm5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&q=60',
        caption: 'Posible ubicación',
      },
    ],
  },
];

export const mockReports: Report[] = [
  {
    id: 'r1',
    category: 'ROAD_BLOCKED',
    summary: 'La autopista está cerrada por derrumbe, no hay paso.',
    sourceUrl: 'https://instagram.com/p/...',
    sourceHandle: '@usuario1',
    location: 'Autopista Caracas-La Guaira',
    urgency: 'high',
    confidence: 0.89,
    createdAt: 'Hace 25 min',
    status: 'pending',
    media: [
      {
        id: 'rm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=200&q=60',
      },
    ],
  },
  {
    id: 'r2',
    category: 'MISSING_PERSON',
    summary: 'Busco a mi abuelo, se perdió en Macuto durante la evacuación.',
    sourceUrl: 'https://instagram.com/p/...',
    sourceHandle: '@familia_macuto',
    location: 'Macuto, Vargas',
    urgency: 'high',
    confidence: 0.81,
    createdAt: 'Hace 1 h',
    status: 'pending',
    media: [],
  },
  {
    id: 'r3',
    category: 'RUMOR',
    summary: 'Dicen que se cayó otro puente pero no hay fotos ni fuentes oficiales.',
    sourceUrl: 'https://twitter.com/...',
    sourceHandle: '@anonimo',
    location: 'Caracas',
    urgency: 'low',
    confidence: 0.34,
    createdAt: 'Hace 2 h',
    status: 'pending',
    media: [],
  },
  {
    id: 'r4',
    category: 'HELP_OFFERED',
    summary: 'Tengo camioneta 4x4 disponible para transportar ayuda o evacuar familias.',
    sourceUrl: 'https://instagram.com/p/...',
    sourceHandle: '@voluntario_vargas',
    location: 'La Guaira',
    urgency: 'medium',
    confidence: 0.77,
    createdAt: 'Hace 3 h',
    status: 'pending',
    media: [
      {
        id: 'rm2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=60',
      },
    ],
  },
];
