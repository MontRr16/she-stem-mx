import { Bookmark, CalendarDays, CheckCircle2, ClipboardCheck, ExternalLink, Sparkles, Wallet } from 'lucide-react';
import type { Opportunity } from '@/types/stem';

const LEVEL_NAMES: Record<Opportunity['level'], string> = { todos: 'Todos los niveles', licenciatura: 'Licenciatura', maestria: 'Maestría', doctorado: 'Doctorado' };
const CATEGORY_TONES: Record<Opportunity['category'], string> = { Beca: 'bg-pastel-green', Verano: 'bg-pastel-yellow', Hackathon: 'bg-pastel-orchid', Concurso: 'bg-pastel-cyan' };

export default function OpportunityCard({ opportunity, isSaved, onToggleSave }: { opportunity: Opportunity; isSaved: boolean; onToggleSave: () => void }) {
  const bullets = [
    { icon: CalendarDays, text: opportunity.deadline ? `Fecha límite: ${opportunity.deadline}` : 'Fecha límite: consulta la convocatoria vigente.' },
    { icon: ClipboardCheck, text: `Requisitos: ${opportunity.requirements}` },
    { icon: Wallet, text: `Beneficio: ${opportunity.benefit}` },
  ];
  const canOpenOfficial = opportunity.linkStatus === 'verified' && opportunity.officialUrl.startsWith('https://');
  const canApply = canOpenOfficial && Boolean(opportunity.applicationUrl);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4"><div className="flex flex-wrap gap-2"><span className={`rounded-full px-3 py-1 text-xs font-bold text-ink ${CATEGORY_TONES[opportunity.category]}`}>{opportunity.category}</span><span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-ink-soft">{LEVEL_NAMES[opportunity.level]}</span></div><button type="button" onClick={onToggleSave} aria-pressed={isSaved} aria-label={isSaved ? 'Quitar de guardadas' : 'Guardar convocatoria'} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${isSaved ? 'border-pastel-mint bg-pastel-mint text-ink' : 'border-slate-200 text-ink-soft hover:border-pastel-cyan hover:text-ink'}`}><Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} aria-hidden /></button></div>
      <h3 className="mt-5 font-serif text-xl leading-[1.2] text-ink">{opportunity.title}</h3><p className="mt-1 text-sm text-ink-muted">{opportunity.organizer}</p>
      <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"><Sparkles className="h-3.5 w-3.5" aria-hidden />Resumen IA</div>
      <ul className="mt-3 space-y-3 rounded-2xl bg-slate-50 p-4">{bullets.map(({ icon: Icon, text }) => <li key={text} className="flex gap-3 text-sm leading-[1.5] text-ink-soft"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden /><span>{text}</span></li>)}</ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {canOpenOfficial ? <a href={opportunity.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft">Ver convocatoria oficial <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a> : <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 text-sm font-semibold text-ink-muted"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden />Enlace en verificación</span>}
        {canApply && opportunity.applicationUrl !== opportunity.officialUrl && <a href={opportunity.applicationUrl ?? opportunity.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-pastel-mint hover:bg-pastel-mint/40">Postular <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>}
      </div>
      {opportunity.lastVerifiedAt && <p className="mt-3 text-[11px] text-ink-muted">Fuente verificada: {opportunity.lastVerifiedAt}</p>}
    </article>
  );
}
