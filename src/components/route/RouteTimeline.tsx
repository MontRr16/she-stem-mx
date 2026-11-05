import { Check } from 'lucide-react';
import type { RouteStep } from '@/types/stem';

interface RouteTimelineProps {
  steps: RouteStep[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function RouteTimeline({ steps, activeIndex, onSelect }: RouteTimelineProps) {
  const progress = (activeIndex / (steps.length - 1)) * 100;

  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-2 [scrollbar-width:thin]">
      <div className="relative min-w-[640px] pt-2">
        <div className="absolute left-[8%] right-[8%] top-[22px] h-1 rounded-full bg-slate-100" />
        <div
          className="absolute left-[8%] top-[22px] h-1 rounded-full bg-pastel-mint transition-all duration-500"
          style={{ width: `${(progress * 84) / 100}%` }}
        />
        <ol className="relative grid grid-cols-6 gap-2">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isDone = index < activeIndex;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className="group flex w-full flex-col items-center gap-3 text-center"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-bold transition-all duration-300 group-hover:scale-110 ${
                      isActive
                        ? 'border-ink bg-ink text-white shadow-md'
                        : isDone
                          ? 'border-pastel-mint bg-pastel-mint text-ink'
                          : 'border-slate-200 bg-white text-ink-soft'
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4" aria-hidden /> : index + 1}
                  </span>
                  <span className={`text-sm font-semibold leading-[1.3] ${isActive ? 'text-ink' : 'text-ink-soft'}`}>{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
