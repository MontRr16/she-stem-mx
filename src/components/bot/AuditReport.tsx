import { useEffect, useState } from 'react';
import type { AuditLine, AuditReport as AuditReportData } from '@/lib/projectAuditor';

interface AuditReportProps {
  report: AuditReportData;
}

const REVEAL_INTERVAL_MS = 110;

export default function AuditReport({ report }: AuditReportProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const total = report.lines.length;

  useEffect(() => {
    if (visibleCount >= total) return;
    const timer = window.setTimeout(() => setVisibleCount((count) => count + 1), REVEAL_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [visibleCount, total]);

  const isComplete = visibleCount >= total;
  const visibleLines = report.lines.slice(0, visibleCount);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-ink shadow-lift">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pastel-rose" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-pastel-yellow" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-pastel-green" aria-hidden />
          <span className="ml-3 font-mono text-xs text-slate-300">informe_auditoria.log</span>
        </div>
        <span className="font-mono text-xs text-pastel-mint">{isComplete ? 'COMPLETO' : 'GENERANDO...'}</span>
      </div>

      <div className="p-5 font-mono text-sm leading-[1.5] md:p-7">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Viabilidad</span>
            <span>
              {report.score}/100 · {report.viability}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-pastel-mint transition-all duration-700"
              style={{ width: isComplete ? `${report.score}%` : '0%' }}
            />
          </div>
        </div>

        <ul className="space-y-2.5">
          {visibleLines.map((line, index) => (
            <li key={`${index}-${line.text}`} className={lineClass(line)}>
              {line.kind === 'item' && (
                <span className="text-pastel-cyan" aria-hidden>
                  &gt;
                </span>
              )}
              {line.text}
            </li>
          ))}
        </ul>
        {!isComplete && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-pastel-mint align-middle" aria-hidden />}
      </div>
    </div>
  );
}

function lineClass(line: AuditLine): string {
  if (line.kind === 'title') return 'mt-6 first:mt-0 font-bold text-pastel-mint';
  if (line.kind === 'item') return 'flex gap-2 text-slate-100';
  return 'text-slate-200';
}
