import { useMemo, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import OpportunityCard from '@/components/finder/OpportunityCard';
import { OPPORTUNITIES } from '@/data/opportunities';
import type { DegreeLevel } from '@/types/stem';

type LevelFilter = 'todos' | DegreeLevel;

const LEVEL_CHIPS: { value: LevelFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'licenciatura', label: 'Licenciatura' },
  { value: 'maestria', label: 'Maestría' },
  { value: 'doctorado', label: 'Doctorado' },
];

export default function StemFinder() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('todos');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const visibleOpportunities = useMemo(
    () =>
      levelFilter === 'todos'
        ? OPPORTUNITIES
        : OPPORTUNITIES.filter((item) => item.level === levelFilter || item.level === 'todos'),
    [levelFilter]
  );

  const toggleSaved = (id: string) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <section id="stem-finder" className="scroll-mt-20 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Módulo 3 · STEM-Finder"
          title="Convocatorias y becas"
          accent="a tu alcance"
          description="Becas, veranos científicos, hackathons y concursos, resumidos por la IA en tres puntos clave."
          action={
            <p className="rounded-full bg-pastel-green/70 px-4 py-2 text-sm font-semibold text-ink">
              Guardadas: {savedIds.length}
            </p>
          }
        />

        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por nivel">
          {LEVEL_CHIPS.map((chip) => {
            const isActive = chip.value === levelFilter;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => setLevelFilter(chip.value)}
                aria-pressed={isActive}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'bg-ink text-white shadow-md' : 'bg-slate-100 text-ink-soft hover:bg-pastel-cyan/40 hover:text-ink'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          <span className="ml-auto text-sm text-ink-muted">{visibleOpportunities.length} convocatorias</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              isSaved={savedIds.includes(opportunity.id)}
              onToggleSave={() => toggleSaved(opportunity.id)}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">
          Las tarjetas enlazan a fuentes oficiales verificadas. Confirma fechas y requisitos vigentes antes de postular.
        </p>
      </div>
    </section>
  );
}
