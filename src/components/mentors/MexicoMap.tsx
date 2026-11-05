import { useMemo } from 'react';
import type { AreaId, Mentor } from '@/types/stem';

const MAP_WIDTH = 400;
const MAP_HEIGHT = 370;

const project = (lon: number, lat: number) => ({
  x: ((lon + 118) / 32) * MAP_WIDTH,
  y: ((33 - lat) / 19) * MAP_HEIGHT,
});

const MAINLAND: [number, number][] = [
  [-117.1, 32.5], [-114.7, 32.5], [-111.0, 31.3], [-108.2, 31.3], [-108.2, 31.8], [-106.5, 31.8],
  [-104.9, 30.6], [-104.5, 29.6], [-103.1, 29.0], [-102.3, 29.8], [-101.4, 29.8], [-100.3, 28.3],
  [-99.5, 27.5], [-97.7, 25.9], [-97.8, 22.5], [-97.7, 20.6], [-96.3, 19.0], [-94.5, 18.2],
  [-93.2, 18.5], [-91.0, 18.7], [-90.4, 19.9], [-90.5, 21.0], [-87.0, 21.5], [-87.6, 18.5],
  [-88.3, 16.0], [-89.2, 15.9], [-91.0, 17.2], [-92.2, 14.5], [-93.8, 16.1], [-95.5, 15.9],
  [-97.5, 15.9], [-99.0, 16.9], [-101.0, 17.5], [-103.5, 18.3], [-105.5, 19.9], [-105.7, 22.5],
  [-108.0, 25.0], [-109.4, 26.0], [-111.0, 28.0], [-112.9, 31.2], [-114.7, 31.7], [-114.7, 32.7],
];

const BAJA: [number, number][] = [
  [-117.1, 32.5], [-114.7, 32.7], [-114.1, 28.0], [-112.2, 25.0], [-110.2, 23.0], [-109.4, 23.3],
  [-111.2, 24.6], [-112.9, 27.5], [-114.5, 30.5], [-116.3, 31.0],
];

const toPath = (points: [number, number][]) =>
  points
    .map(([lon, lat], index) => {
      const { x, y } = project(lon, lat);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';

const MENTOR_AREA_LABELS: Record<AreaId, string> = { mecatronica: 'Mecatrónica', electronica: 'Electrónica', datos: 'Datos', biotecnologia: 'Biotecnología', robotica: 'Robótica', ia: 'Inteligencia Artificial' };

const PIN_COLORS: Record<AreaId, string> = {
  mecatronica: 'bg-pastel-peach',
  electronica: 'bg-pastel-yellow',
  datos: 'bg-pastel-sky',
  biotecnologia: 'bg-pastel-green',
  robotica: 'bg-pastel-orchid',
  ia: 'bg-pastel-turquoise',
};

interface MexicoMapProps {
  mentors: Mentor[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MexicoMap({ mentors, selectedId, onSelect }: MexicoMapProps) {
  const mainlandPath = useMemo(() => toPath(MAINLAND), []);
  const bajaPath = useMemo(() => toPath(BAJA), []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#f7fcfb] to-[#f4f9fd] p-4 shadow-soft md:p-6">
      <div className="relative mx-auto aspect-[400/370] w-full max-w-md">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <path d={mainlandPath} fill="#ffffff" stroke="#cbd9dc" strokeWidth="1.5" strokeLinejoin="round" />
          <path d={bajaPath} fill="#ffffff" stroke="#cbd9dc" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {mentors.map((mentor) => {
          const { x, y } = project(mentor.lon, mentor.lat);
          const isSelected = mentor.id === selectedId;
          return (
            <button
              key={mentor.id}
              type="button"
              onClick={() => onSelect(mentor.id)}
              aria-label={`Ver perfil de ${mentor.name}, ${mentor.city}`}
              aria-pressed={isSelected}
              style={{ left: `${(x / MAP_WIDTH) * 100}%`, top: `${(y / MAP_HEIGHT) * 100}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
            >
              <span
                className={`block h-4 w-4 rounded-full border-2 border-white shadow-md ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-125 ${PIN_COLORS[mentor.area]} ${
                  isSelected ? 'scale-150 ring-4 ring-pastel-turquoise/50' : ''
                }`}
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {mentor.city}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium text-ink-soft">
        {(Object.keys(PIN_COLORS) as AreaId[]).map((area) => (
          <span key={area} className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${PIN_COLORS[area]}`} aria-hidden />
            {MENTOR_AREA_LABELS[area]}
          </span>
        ))}
      </div>
    </div>
  );
}
