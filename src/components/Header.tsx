import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-crisis-500 animate-pulse" />
          <span className="font-bold text-slate-900">Crisis Radar VE</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-slate-600 hover:text-crisis-600">
            Dashboard
          </Link>
          <Link href="/review" className="text-slate-600 hover:text-crisis-600">
            Revisar
          </Link>
          <Link href="/submit" className="text-slate-600 hover:text-crisis-600">
            Enviar
          </Link>
          <Link href="/admin" className="text-slate-600 hover:text-crisis-600">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
