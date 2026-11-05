import { useEffect, useState } from 'react';
import { Atom, Menu, X } from 'lucide-react';
import { BRAND_ACRONYM, NAV_LINKS } from '@/data/brand';

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'border-slate-200 shadow-soft' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="SHE-STEM MX, inicio">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-pastel-mint shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <Atom className="h-5 w-5 text-ink" aria-hidden />
          </span>
          <span className="font-serif text-xl tracking-tight text-ink">SHE-STEM MX</span>
          <span className="pointer-events-none absolute left-6 top-20 hidden w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-ink-soft opacity-0 shadow-lift transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
            {BRAND_ACRONYM.map((item) => (
              <span key={item.letter} className="block leading-[1.5]">
                <strong className="font-mono text-ink">{item.letter}</strong> {item.word}
              </span>
            ))}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 text-[15px] font-medium text-ink-soft transition-colors duration-200 hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-pastel-mint after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-ink md:hidden"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-slate-100 bg-white px-6 py-4 md:hidden" aria-label="Móvil">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-pastel-mint/40"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
