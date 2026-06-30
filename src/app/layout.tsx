import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crisis Radar VE',
  description: 'Inteligencia de crisis asistida por IA para Venezuela',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
