import { useEffect, useMemo, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import SelectField from '@/components/ui/SelectField';
import RouteTimeline from '@/components/route/RouteTimeline';
import { AreaDetails, AreaPlaceholder, StepDetail } from '@/components/route/AreaDetails';
import { AREA_BY_ID, LEVEL_TO_STEP, ROUTE_STEPS } from '@/data/areas';
import { REGIONS } from '@/data/catalog';
import { getCareersForArea, getProgramOfferings } from '@/lib/catalog';
import { LEVEL_LABELS } from '@/data/states';
import type { FilterState, MacroAreaId } from '@/types/stem';

interface StemMatchProps { filters: FilterState; onFilterChange: (patch: Partial<FilterState>) => void; }
const AREA_OPTIONS = Object.values(AREA_BY_ID).map((area) => ({ value: area.id, label: `${area.label} / ${area.englishLabel}` }));
const LEVEL_OPTIONS = [{ value: '', label: 'Todos los niveles' }, { value: 'licenciatura', label: 'Licenciatura / Ingeniería' }, { value: 'maestria', label: 'Maestría' }, { value: 'doctorado', label: 'Doctorado' }];
const CHIP_TONES = ['bg-pastel-yellow', 'bg-pastel-cyan', 'bg-pastel-peach', 'bg-pastel-lilac'];

export default function StemMatch({ filters, onFilterChange }: StemMatchProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [offerings, setOfferings] = useState<Awaited<ReturnType<typeof getProgramOfferings>>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (filters.programLevel === 'maestria') setActiveStep(3);
    else if (filters.programLevel === 'doctorado') setActiveStep(4);
    else if (filters.level) setActiveStep(LEVEL_TO_STEP[filters.level]);
  }, [filters.level, filters.programLevel]);

  const area = filters.area ? AREA_BY_ID[filters.area] : null;
  const careers = useMemo(() => getCareersForArea(filters.area), [filters.area]);
  const selectedRegion = REGIONS.find((region) => region.id === filters.municipalityId);
  const regionOptions = REGIONS.filter((region) => !filters.stateId || region.stateName === filters.stateId);
  const step = ROUTE_STEPS[activeStep];

  useEffect(() => {
    if (!filters.area || !filters.careerId) { setOfferings([]); return; }
    let cancelled = false;
    setIsLoading(true);
    void getProgramOfferings({ areaId: filters.area, careerId: filters.careerId, level: filters.programLevel || (filters.level === 'licenciatura' ? 'licenciatura' : ''), regionId: filters.municipalityId || 'all' })
      .then((data) => { if (!cancelled) setOfferings(data); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [filters.area, filters.careerId, filters.level, filters.programLevel, filters.municipalityId]);

  const aiMessage = area && filters.careerId
    ? `Para ${filters.level ? LEVEL_LABELS[filters.level] : 'tu nivel actual'} en ${careers.find((career) => career.id === filters.careerId)?.name}, revisa la oferta disponible ${selectedRegion?.municipalityName ? `en ${selectedRegion.municipalityName}` : 'en México'}.`
    : 'Selecciona una macro-área y después una carrera para consultar programas públicos y privados en tu región.';

  return (
    <section id="ruta" className="scroll-mt-20 border-t border-slate-100 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Módulo 1 · STEM-Match MX" title="Tu ruta profesional" accent="paso a paso" description="Elige una macro-área STEM, descubre carreras relacionadas y consulta la oferta académica disponible por estado y municipio." />

        <div className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-3 md:p-8">
          <SelectField id="ruta-area" label="Macro-área STEM" value={filters.area} options={[{ value: '', label: 'Selecciona un área' }, ...AREA_OPTIONS]} onChange={(value) => onFilterChange({ area: value as MacroAreaId | '', careerId: '' })} />
          <SelectField id="ruta-carrera" label="Carrera o posgrado" value={filters.careerId} options={[{ value: '', label: filters.area ? 'Selecciona una carrera' : 'Primero elige un área' }, ...careers.map((career) => ({ value: career.id, label: career.name }))]} onChange={(value) => onFilterChange({ careerId: value })} />
          <SelectField id="ruta-nivel" label="Nivel educativo" value={filters.programLevel} options={LEVEL_OPTIONS} onChange={(value) => onFilterChange({ programLevel: value as FilterState['programLevel'], level: value === 'maestria' || value === 'doctorado' ? 'posgrado' : value as FilterState['level'] })} />
          <SelectField id="ruta-estado" label="Estado" value={filters.stateId} options={[{ value: '', label: 'Todo México' }, ...Array.from(new Set(REGIONS.map((region) => region.stateName))).filter(Boolean).map((state) => ({ value: state, label: state }))]} onChange={(value) => onFilterChange({ stateId: value, municipalityId: '' })} />
          <SelectField id="ruta-municipio" label="Municipio" value={filters.municipalityId} options={[{ value: '', label: filters.stateId ? 'Todo el estado' : 'Todo México' }, ...regionOptions.filter((region) => region.id !== 'all').map((region) => ({ value: region.id, label: region.municipalityName ?? 'Municipio' }))]} onChange={(value) => onFilterChange({ municipalityId: value })} />
          <div className="flex items-end"><p className="w-full rounded-2xl bg-pastel-yellow/60 px-4 py-3 text-sm leading-[1.5] text-ink">{selectedRegion?.municipalityName ? `Consultando ${selectedRegion.municipalityName}, ${selectedRegion.stateName}.` : 'Consulta nacional o acota por municipio.'}</p></div>
        </div>

        <div className="mt-8 flex gap-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:p-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pastel-mint"><Sparkles className="h-5 w-5 text-ink" aria-hidden /></span><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">Recomendación de la IA</p><p className="mt-2 leading-[1.5] text-ink">{aiMessage}</p></div></div>

        <div className="mt-12 flex flex-wrap gap-3" role="group" aria-label="Macro-áreas STEM">
          {Object.values(AREA_BY_ID).map((item, index) => <button key={item.id} type="button" onClick={() => onFilterChange({ area: item.id, careerId: '' })} aria-pressed={item.id === filters.area} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${item.id === filters.area ? `${CHIP_TONES[index]} border-transparent text-ink shadow-md` : 'border-slate-200 bg-white text-ink-soft hover:border-slate-300 hover:text-ink'}`}>{item.label}</button>)}
        </div>

        <div className="mt-10"><RouteTimeline steps={ROUTE_STEPS} activeIndex={activeStep} onSelect={setActiveStep} /></div>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2"><StepDetail step={step} stepNumber={activeStep + 1} total={ROUTE_STEPS.length} stateName={filters.stateId || undefined} /><div className="min-w-0">{area ? <AreaDetails area={area} offerings={offerings} isLoading={isLoading} /> : <AreaPlaceholder />}</div></div>
        {isLoading && <p className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-soft"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Actualizando oferta regional...</p>}
      </div>
    </section>
  );
}
