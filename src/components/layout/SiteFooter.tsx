import { Atom } from 'lucide-react';
import { NAV_LINKS } from '@/data/brand';

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pastel-mint">
            <Atom className="h-5 w-5 text-ink" aria-hidden />
          </span>
          <div>
            <p className="font-serif text-lg text-ink">SHE-STEM MX</p>
            <p className="text-sm text-ink-muted">Empoderando a las mujeres mexicanas en STEM.</p>
          </div>
        </div>

        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="border-t border-slate-100 px-6 py-5 text-center text-xs text-ink-muted">
        Perfiles, convocatorias y auditorías son ilustrativos. Verifica la información en las fuentes oficiales.
      </p>
    </footer>
  );
}
