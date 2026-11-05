import { useState } from 'react';
import type { ReactNode } from 'react';
import { BookOpen, Building2, ChevronDown, ExternalLink, Lightbulb, Layers, MapPin, Wallet, Wrench } from 'lucide-react';
import type { AreaInfo, ProgramOffering, RouteStep } from '@/types/stem';
import { getSchoolExamples, type SchoolExample } from '@/data/schoolExamples';

interface AreaDetailsProps {
  area: AreaInfo;
  offerings: ProgramOffering[];
  isLoading: boolean;
}

function ListCard({ title, icon, items, tone }: { title: string; icon: ReactNode; items: string[]; tone: string }) {
  return (
    <div className={`rounded-2xl p-5 ${tone}`}>
      <div className="flex items-center gap-2 text-ink">{icon}<h4 className="text-sm font-bold">{title}</h4></div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => <li key={item} className="flex gap-2 text-sm leading-[1.5] text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/60" aria-hidden />{item}</li>)}
      </ul>
    </div>
  );
}

function ProgramCard({ offering }: { offering: ProgramOffering }) {
  const typeLabel = offering.institution.institutionType === 'privada' ? 'Privada' : 'Pública';
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${offering.institution.institutionType === 'privada' ? 'bg-pastel-orchid/60' : 'bg-pastel-green'}`}>{typeLabel}</span>
          <h4 className="mt-3 font-serif text-lg leading-[1.2] text-ink">{offering.programName}</h4>
        </div>
        <a href={offering.officialProgramUrl} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-ink-soft transition-colors hover:border-pastel-cyan hover:text-ink" aria-label={`Ver programa oficial de ${offering.programName}`}>
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">{offering.institution.name}</p>
      <p className="mt-1 text-sm text-ink-soft">{offering.institution.campusName} · {offering.modality.replace('-', ' ')}</p>
      {offering.durationYears && <p className="mt-1 text-sm text-ink-muted">Duración aproximada: {offering.durationYears} años</p>}
    </article>
  );
}

export function AreaDetails({ area, offerings, isLoading }: AreaDetailsProps) {
  const publicOfferings = offerings.filter((item) => item.institution.institutionType !== 'privada');
  const privateOfferings = offerings.filter((item) => item.institution.institutionType === 'privada');
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="Materias clave" icon={<BookOpen className="h-4 w-4" aria-hidden />} items={area.subjects} tone="bg-pastel-sky/30" />
        <ListCard title="Lenguajes y herramientas" icon={<Wrench className="h-4 w-4" aria-hidden />} items={area.tools} tone="bg-pastel-green/50" />
        <ListCard title="Becas recomendadas" icon={<Wallet className="h-4 w-4" aria-hidden />} items={area.scholarships} tone="bg-pastel-peach/60" />
        <ListCard title="Carreras relacionadas" icon={<Layers className="h-4 w-4" aria-hidden />} items={area.careers.map((career) => career.name)} tone="bg-pastel-lilac/40" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">Oferta regional</p><h3 className="mt-2 font-serif text-2xl text-ink">Dónde puedes estudiar</h3></div>
          <Building2 className="h-6 w-6 text-ink-soft" aria-hidden />
        </div>
        {isLoading ? <p className="mt-5 text-sm text-ink-soft">Consultando instituciones públicas y privadas...</p> : offerings.length === 0 ? <p className="mt-5 rounded-2xl bg-white p-4 text-sm leading-[1.5] text-ink-soft">No encontramos programas exactos con estos filtros. Prueba con todo México, otro nivel o una carrera relacionada.</p> : <div className="mt-5 space-y-5">
          {publicOfferings.length > 0 && <div><p className="mb-3 text-sm font-bold text-ink">Instituciones públicas</p><div className="grid gap-3">{publicOfferings.map((offering) => <ProgramCard key={offering.id} offering={offering} />)}</div></div>}
          {privateOfferings.length > 0 && <div><p className="mb-3 text-sm font-bold text-ink">Instituciones privadas</p><div className="grid gap-3">{privateOfferings.map((offering) => <ProgramCard key={offering.id} offering={offering} />)}</div></div>}
        </div>}
      </div>
    </div>
  );
}

interface StepDetailProps {
  step: RouteStep;
  stepNumber: number;
  total: number;
  stateName?: string;
}

function SchoolList({ schools }: { schools: SchoolExample[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {schools.map((schoolItem) => (
        <li key={schoolItem.name}>
          <a href={schoolItem.officialUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm leading-[1.5] text-ink-soft transition-all duration-200 hover:border-pastel-cyan hover:bg-pastel-cyan/10 hover:text-ink">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" aria-hidden />
            <span className="min-w-0">
              <span className="font-semibold text-ink">{schoolItem.shortName}</span>
              <span className="block text-xs text-ink-muted">{schoolItem.name}</span>
            </span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-ink-muted transition-colors group-hover:text-ink" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstitutionTypeChip({ label, stateName }: { label: string; stateName?: string }) {
  const [expanded, setExpanded] = useState(false);
  const schools = getSchoolExamples(label, stateName);
  const hasSchools = schools.length > 0;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => hasSchools && setExpanded((current) => !current)}
        aria-expanded={expanded}
        disabled={!hasSchools}
        className={`flex w-full items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
          expanded ? 'border-pastel-cyan bg-pastel-cyan/20 text-ink' : 'border-slate-200 text-ink-soft hover:border-slate-300 hover:text-ink'
        } ${hasSchools ? 'cursor-pointer' : 'cursor-default opacity-90'}`}
      >
        <span>{label}</span>
        {hasSchools && <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} aria-hidden />}
      </button>
      {expanded && hasSchools && (
        <div className="mt-2 max-w-xs rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {stateName ? `Planteles en ${stateName}` : 'Planteles en México'}
          </p>
          <SchoolList schools={schools} />
        </div>
      )}
    </div>
  );
}

export function StepDetail({ step, stepNumber, total, stateName }: StepDetailProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-pastel-yellow px-3 py-1 font-mono text-xs font-medium text-ink">Paso {stepNumber} de {total}</span>
        <span className="rounded-full bg-pastel-cyan/50 px-3 py-1 text-xs font-semibold text-ink">{step.duration}</span>
      </div>
      <h3 className="mt-4 font-serif text-2xl text-ink">{step.title}</h3>
      <p className="mt-3 leading-[1.5] text-ink-soft">{step.description}</p>
      <div className="mt-6">
        <p className="text-sm font-bold text-ink">Dónde estudiar</p>
        <p className="mt-1 text-xs text-ink-muted">Selecciona un tipo de institución para ver planteles reales {stateName ? `en ${stateName}` : 'en México'}.</p>
        <div className="mt-3 flex flex-col flex-wrap gap-2">
          {step.institutions.map((institution) => (
            <InstitutionTypeChip key={institution} label={institution} stateName={stateName} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl bg-pastel-turquoise/25 p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
        <p className="text-sm leading-[1.5] text-ink">{step.tip}</p>
      </div>
    </div>
  );
}

export function AreaPlaceholder() {
  return <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center"><Layers className="h-8 w-8 text-ink-soft" aria-hidden /><p className="max-w-md text-ink-soft">Elige una macro-área y una carrera para consultar la oferta educativa regional.</p></div>;
}
