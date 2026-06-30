import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-crisis-700">Crisis Radar VE</h1>
        <p className="text-slate-600 mt-2">
          Dashboard de inteligencia de crisis. Información pública, revisada por humanos.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/dashboard"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md border border-slate-200"
        >
          <h2 className="text-xl font-semibold mb-2">Dashboard público</h2>
          <p className="text-slate-600">Ver incidentes aprobados y filtros por categoría.</p>
        </Link>

        <Link
          href="/review"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md border border-slate-200"
        >
          <h2 className="text-xl font-semibold mb-2">Revisión</h2>
          <p className="text-slate-600">Revisar reportes generados por IA antes de publicar.</p>
        </Link>

        <Link
          href="/submit"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md border border-slate-200"
        >
          <h2 className="text-xl font-semibold mb-2">Enviar información</h2>
          <p className="text-slate-600">Compartir un enlace, texto o captura de pantalla.</p>
        </Link>
      </div>

      <section className="bg-crisis-50 border border-crisis-100 p-4 rounded-lg">
        <p className="text-sm text-crisis-900">
          <strong>Advertencia:</strong> esta plataforma agrega información pública y requiere
          revisión humana antes de publicar. No reemplaza canales oficiales de emergencia.
        </p>
      </section>
    </div>
  );
}
