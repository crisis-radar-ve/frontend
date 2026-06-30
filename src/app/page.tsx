import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Crisis Radar VE
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Convertimos información pública dispersa en incidentes estructurados, revisados por
          humanos, para ayudar a coordinar respuesta ante la tragedia en Venezuela.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          href="/dashboard"
          className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-crisis-100 text-crisis-700 flex items-center justify-center text-xl mb-4 group-hover:bg-crisis-600 group-hover:text-white transition-colors">
            📊
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Dashboard público</h2>
          <p className="text-sm text-slate-600">
            Explora incidentes aprobados por categoría, zona y urgencia.
          </p>
        </Link>

        <Link
          href="/review"
          className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-crisis-100 text-crisis-700 flex items-center justify-center text-xl mb-4 group-hover:bg-crisis-600 group-hover:text-white transition-colors">
            ✅
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Revisar reportes</h2>
          <p className="text-sm text-slate-600">
            Revisa reportes generados por IA antes de publicarlos o descartarlos.
          </p>
        </Link>

        <Link
          href="/submit"
          className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-crisis-100 text-crisis-700 flex items-center justify-center text-xl mb-4 group-hover:bg-crisis-600 group-hover:text-white transition-colors">
            📤
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Enviar información</h2>
          <p className="text-sm text-slate-600">
            Comparte enlaces, texto o capturas de publicaciones públicas.
          </p>
        </Link>
      </div>

      <div className="bg-crisis-50 border border-crisis-100 rounded-xl p-6">
        <p className="text-sm text-crisis-900 text-center">
          <strong>Advertencia:</strong> esta plataforma agrega información pública y requiere
          revisión humana. No reemplaza canales oficiales de emergencia.
        </p>
      </div>
    </div>
  );
}
