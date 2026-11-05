import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import SelectField from '@/components/ui/SelectField';
import HeroIllustration from '@/components/hero/HeroIllustration';
import { BRAND_ACRONYM } from '@/data/brand';
import { AREAS, AREA_BY_ID } from '@/data/areas';
import { LEVEL_LABELS, LEVEL_OPTIONS, STATES } from '@/data/states';
import type { FilterState } from '@/types/stem';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (patch: Partial<FilterState>) => void;
}

const STATE_OPTIONS = [{ value: '', label: 'Todo México' }, ...STATES.map((state) => ({ value: state, label: state }))];

const AREA_OPTIONS = [{ value: '', label: 'Todas las áreas' }, ...AREAS.map((area) => ({ value: area.id, label: area.label }))];

function summarizeFilters({ stateId, level, area }: FilterState): string {
  if (!stateId && !level && !area) return 'Explorando todas las regiones, niveles y áreas.';
  const parts = [
    stateId || 'todo México',
    level ? LEVEL_LABELS[level] : 'todos los niveles',
    area ? AREA_BY_ID[area].label : 'todas las áreas',
  ];
  return `Tu búsqueda: ${parts.join(' · ')}.`;
}

export default function HeroSection({ filters, onFilterChange }: HeroSectionProps) {
  return (
    <section id="inicio" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 pt-12 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-ink-muted">
            Un futuro STEM hecho por ellas
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.2] text-ink sm:text-5xl lg:text-[3.4rem]">
            Empowering Mexican Women from Undergrad to PhD in STEM.
          </h1>

          <p className="mt-5 text-lg font-medium leading-[1.5] text-ink-soft">
            Empoderando a las mujeres mexicanas desde la licenciatura hasta el doctorado en STEM.
          </p>

          <details className="group mt-6 w-fit max-w-full">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm transition-colors hover:border-pastel-cyan hover:text-ink [&::-webkit-details-marker]:hidden">
              ¿Qué significa SHE-STEM MX?
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" aria-hidden />
            </summary>
            <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl border border-slate-200 bg-pastel-yellow/50 p-4 text-sm text-ink-soft sm:grid-cols-2">
              {BRAND_ACRONYM.map((item) => (
                <p key={item.letter} className="leading-[1.5]">
                  <strong className="font-mono text-ink">{item.letter}</strong> ({item.word})
                </p>
              ))}
            </div>
          </details>

          <a
            href="#ruta"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-pastel-mint px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            Comenzar a explorar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </a>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <HeroIllustration />
        </div>
      </div>

      <div id="filtros" className="scroll-mt-24 mt-16 animate-fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-soft [animation-delay:250ms] md:p-10">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-2xl text-ink md:text-3xl">Encuentra tu punto de partida</h2>
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">01 / Explorar</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <SelectField
            id="filtro-estado"
            label="Estado de México"
            value={filters.stateId}
            options={STATE_OPTIONS}
            onChange={(value) => onFilterChange({ stateId: value })}
          />
          <SelectField
            id="filtro-nivel"
            label="Nivel educativo"
            value={filters.level}
            options={LEVEL_OPTIONS}
            onChange={(value) => onFilterChange({ level: value as FilterState['level'] })}
          />
          <SelectField
            id="filtro-area"
            label="Área STEM"
            value={filters.area}
            options={AREA_OPTIONS}
            onChange={(value) => onFilterChange({ area: value as FilterState['area'] })}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-[1.5] text-ink-soft" aria-live="polite">
            {summarizeFilters(filters)}
          </p>
          <a
            href="#ruta"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 text-pastel-mint" aria-hidden />
            Generar mi Ruta con IA
          </a>
        </div>
      </div>
    </section>
  );
}
