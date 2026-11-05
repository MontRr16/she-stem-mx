import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Loader2, Search, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import MexicoMap from '@/components/mentors/MexicoMap';
import MentorCard from '@/components/mentors/MentorCard';
import { MENTORS } from '@/data/mentors';
import { searchMentors } from '@/lib/mentorSearch';

const SUGGESTED_QUERIES = [
  'Quiero hablar con alguien que haya hecho un doctorado en robótica en el IPN',
  'Mentoras de datos con maestría',
  'Especialistas en biotecnología en Yucatán',
];

interface EllaIngeniaProps {
  preferredState: string;
}

export default function EllaIngenia({ preferredState }: EllaIngeniaProps) {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSearching) return;
    const timer = window.setTimeout(() => {
      setActiveQuery(query.trim());
      setIsSearching(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [isSearching, query]);

  const results = useMemo(() => searchMentors(activeQuery), [activeQuery]);
  const visibleMentors = results.mentors;
  const selectedMentor = visibleMentors.find((mentor) => mentor.id === selectedId) ?? null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setActiveQuery('');
      return;
    }
    setIsSearching(true);
  };

  const runSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsSearching(true);
  };

  return (
    <section id="ellaingenia" className="scroll-mt-20 bg-pastel-sky/10 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Módulo 2 · EllaIngenia"
          title="Mentoras y referentes"
          accent="de México"
          description="Encuentra ingenieras y científicas por especialidad, institución o estado. Los perfiles son ilustrativos."
        />

        <form onSubmit={handleSubmit} className="mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft md:p-5">
          <label htmlFor="buscador-mentoras" className="sr-only">
            Busca mentoras con IA
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
                id="buscador-mentoras"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Describe a la mentora que buscas..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-base text-ink placeholder:text-ink-muted focus:border-pastel-sky focus:outline-none focus:ring-4 focus:ring-pastel-turquoise/40"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-ink-soft disabled:cursor-wait disabled:opacity-80"
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4 text-pastel-mint" aria-hidden />}
              {isSearching ? 'Buscando...' : 'Buscar con IA'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => runSuggestion(suggestion)}
                className="rounded-full bg-slate-50 px-3.5 py-1.5 text-left text-xs font-medium text-ink-soft transition-colors hover:bg-pastel-yellow/70 hover:text-ink"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        <p className="mt-4 text-sm leading-[1.5] text-ink-soft" aria-live="polite">
          {activeQuery && results.interpretation.length > 0 && (
            <>
              Interpretación de la IA:{' '}
              <span className="font-mono text-ink">{results.interpretation.join(' · ')}</span>.{' '}
            </>
          )}
          {activeQuery && !results.hasExactMatches && 'No encontramos coincidencias exactas; te mostramos todo el directorio.'}
          {!activeQuery && `Mostrando ${MENTORS.length} perfiles.`}
          {activeQuery && results.hasExactMatches && `${visibleMentors.length} resultados.`}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MexicoMap mentors={visibleMentors} selectedId={selectedId} onSelect={setSelectedId} />
            {selectedMentor && (
              <p className="mt-4 text-center text-sm text-ink-soft">
                Perfil seleccionado: <span className="font-semibold text-ink">{selectedMentor.name}</span>
              </p>
            )}
          </div>

          <div className="grid content-start gap-5 sm:grid-cols-2 lg:col-span-7">
            {visibleMentors.map((mentor, index) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                index={index}
                isSelected={mentor.id === selectedId}
                isInState={Boolean(preferredState) && mentor.state === preferredState}
                onSelect={() => setSelectedId(mentor.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
