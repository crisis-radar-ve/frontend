export interface Reviewer {
  id: string;
  name: string;
  email: string;
  role: 'reviewer' | 'admin';
  organization: string;
  active: boolean;
  createdAt: string;
}

export const mockReviewers: Reviewer[] = [
  {
    id: 'u1',
    name: 'Mariana Rojas',
    email: 'mariana@voluntariosvargas.org',
    role: 'admin',
    organization: 'Voluntarios Vargas',
    active: true,
    createdAt: '2026-06-28',
  },
  {
    id: 'u2',
    name: 'Carlos Mendoza',
    email: 'carlos@proteccioncivil.ve',
    role: 'reviewer',
    organization: 'Protección Civil',
    active: true,
    createdAt: '2026-06-29',
  },
  {
    id: 'u3',
    name: 'Ana Bello',
    email: 'ana@redcross.ve',
    role: 'reviewer',
    organization: 'Cruz Roja',
    active: false,
    createdAt: '2026-06-29',
  },
];
