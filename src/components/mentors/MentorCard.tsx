import { useState } from 'react';
import { BookOpen, ExternalLink, GraduationCap, MapPin, Network } from 'lucide-react';
import type { Mentor } from '@/types/stem';

const LEVEL_BADGE: Record<Mentor['level'], string> = {
  licenciatura: 'Licenciatura',
  maestria: 'Maestría',
  doctorado: 'Doctorado',
};

const AVATAR_TONES = ['bg-pastel-rose', 'bg-pastel-cyan', 'bg-pastel-yellow', 'bg-pastel-lilac', 'bg-pastel-green', 'bg-pastel-peach'];
const MENTOR_AREA_LABELS: Record<Mentor['area'], string> = { mecatronica: 'Mecatrónica', electronica: 'Electrónica', datos: 'Datos', biotecnologia: 'Biotecnología', robotica: 'Robótica', ia: 'Inteligencia Artificial' };

function initialsOf(name: string): string {
  return name
    .replace(/^(Dra?\.|Mtra?\.|Ing\.)\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  isSelected: boolean;
  isInState: boolean;
  onSelect: () => void;
}

export default function MentorCard({ mentor, index, isSelected, isInState, onSelect }: MentorCardProps) {
  const [notice, setNotice] = useState<string | null>(null);

  const handleSimulatedLink = (label: string) => {
    setNotice(`Enlace simulado a ${label}. En la versión publicada abrirá el perfil.`);
  };

  return (
    <article
      onClick={onSelect}
      className={`group flex h-full min-h-fit cursor-pointer flex-col gap-4 rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        isSelected ? 'border-pastel-turquoise shadow-lift ring-4 ring-pastel-turquoise/25' : 'border-slate-200 shadow-soft'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-serif text-lg text-ink ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
            aria-hidden
          >
            {initialsOf(mentor.name)}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="break-words whitespace-normal font-serif text-base leading-[1.3] text-ink sm:text-lg">{mentor.name}</h3>
            <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-soft">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="whitespace-normal break-words">{mentor.city}, {mentor.state}</span>
            </p>
          </div>
        </div>
        {isInState && (
          <span className="shrink-0 rounded-full bg-pastel-green px-2.5 py-1 text-[11px] font-bold text-ink">En tu estado</span>
        )}
      </div>

      <p className="break-words whitespace-normal font-medium leading-[1.5] text-ink">{mentor.specialty}</p>
      <p className="break-words whitespace-normal text-sm leading-[1.5] text-ink-soft">{mentor.bio}</p>

      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-pastel-sky/40 px-3 py-1 text-xs font-semibold text-ink">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden />
          {LEVEL_BADGE[mentor.level]}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-pastel-peach/70 px-3 py-1 text-xs font-semibold text-ink">
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          {MENTOR_AREA_LABELS[mentor.area]}
        </span>
      </div>

      <p className="break-words whitespace-normal text-sm font-medium text-ink-soft">{mentor.institution}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleSimulatedLink('LinkedIn');
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-pastel-sky hover:bg-pastel-sky/30"
        >
          LinkedIn
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleSimulatedLink('ResearchGate');
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-pastel-mint hover:bg-pastel-mint/40"
        >
          <Network className="h-3.5 w-3.5" aria-hidden />
          ResearchGate
        </button>
      </div>

      {notice && (
        <p role="status" className="mt-3 rounded-xl bg-pastel-yellow/70 px-3 py-2 text-xs leading-[1.5] text-ink">
          {notice}
        </p>
      )}
    </article>
  );
}
