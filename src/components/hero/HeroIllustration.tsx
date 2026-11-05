import { Activity, Sparkles } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f5fbfa] to-[#f2f8fc]" aria-hidden>
      <div className="absolute left-[24%] top-[16%] h-[46%] w-[46%] rounded-full bg-pastel-yellow opacity-90 blur-[2px]" />
      <div className="absolute right-[12%] top-[20%] h-[44%] w-[44%] rounded-full bg-pastel-orchid opacity-80 blur-[2px]" />
      <div className="absolute bottom-[10%] left-[38%] h-[44%] w-[40%] rounded-full bg-pastel-sky opacity-80 blur-[2px]" />

      <div className="absolute inset-x-[8%] top-[22%] h-[56%] rotate-[-14deg] rounded-[50%] border border-slate-300/70" />
      <div className="absolute inset-x-[6%] top-[18%] h-[62%] rotate-[8deg] rounded-[50%] border border-slate-300/50" />

      <div className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white shadow-lift">
        <Activity className="h-10 w-10 text-pastel-turquoise" strokeWidth={1.75} />
      </div>

      <div className="absolute left-[8%] top-[10%] animate-float rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft">
        STEM
      </div>
      <div className="absolute right-[6%] top-[18%] animate-float rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft [animation-delay:1.2s]">
        01 / 04
      </div>
      <div className="absolute bottom-[14%] left-[6%] animate-float rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft [animation-delay:2.4s]">
        MX · futuro
      </div>
      <div className="absolute bottom-[12%] right-[4%] flex animate-float items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft [animation-delay:3.2s]">
        <Sparkles className="h-3.5 w-3.5 text-ink-soft" />
        ideas
      </div>
    </div>
  );
}
