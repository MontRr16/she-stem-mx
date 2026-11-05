import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react';
import { FileUp, Loader2, ScanSearch } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AuditReport from '@/components/bot/AuditReport';
import { auditProject, type AuditReport as AuditReportData } from '@/lib/projectAuditor';

const MIN_DESCRIPTION_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 5000;
const TEXT_FILE_PATTERN = /\.(txt|md|csv)$/i;

export default function StemBotPro() {
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [report, setReport] = useState<AuditReportData | null>(null);
  const [reportId, setReportId] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = async (file: File) => {
    setFileName(file.name);
    setError(null);
    if (!TEXT_FILE_PATTERN.test(file.name)) {
      setError('Por ahora leemos archivos de texto (.txt, .md o .csv). Pega la descripción de tu proyecto en el campo de abajo.');
      return;
    }
    const text = await file.text();
    setDescription(text.slice(0, MAX_DESCRIPTION_LENGTH));
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void readFile(file);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void readFile(file);
  };

  const handleDropzoneKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const handleAudit = () => {
    if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
      setError(`Escribe al menos ${MIN_DESCRIPTION_LENGTH} caracteres para que la IA pueda auditar tu proyecto.`);
      return;
    }
    setError(null);
    setIsAuditing(true);
    window.setTimeout(() => {
      setReport(auditProject(description));
      setReportId((id) => id + 1);
      setIsAuditing(false);
    }, 900);
  };

  return (
    <section id="stem-bot" className="scroll-mt-20 border-t border-slate-100 bg-pastel-mint/10 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Módulo 4 · STEM-Bot Pro"
          title="Auditoría técnica"
          accent="de tu proyecto"
          description="Sube o pega la descripción de tu proyecto y recibe un diagnóstico de viabilidad, componentes recomendados y convocatorias donde postularlo."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={handleDropzoneKey}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              aria-label="Zona para arrastrar el archivo de tu proyecto"
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ${
                isDragging
                  ? 'scale-[1.01] border-pastel-turquoise bg-pastel-turquoise/20'
                  : 'border-slate-300 bg-slate-50/60 hover:border-pastel-cyan hover:bg-pastel-cyan/10'
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-yellow">
                <FileUp className="h-6 w-6 text-ink" aria-hidden />
              </span>
              <p className="max-w-sm font-medium leading-[1.5] text-ink">
                Arrastra aquí el resumen o archivo de tu proyecto de electrónica, software o mecatrónica
              </p>
              <p className="text-xs text-ink-muted">
                {fileName ? `Archivo: ${fileName}` : 'Formatos de texto: .txt, .md, .csv'}
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".txt,.md,.csv,text/plain,text/markdown,text/csv"
                onChange={handleFileInput}
                onClick={(event) => event.stopPropagation()}
                className="hidden"
                aria-hidden
                tabIndex={-1}
              />
            </div>

            <label htmlFor="descripcion-proyecto" className="mt-6 block text-sm font-medium text-ink-soft">
              Descripción del proyecto
            </label>
            <textarea
              id="descripcion-proyecto"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={7}
              placeholder="Ejemplo: Estación de monitoreo de agua con ESP32, sensores de pH y temperatura, objetivo de error menor al 5%, presupuesto de 3,000 MXN, pruebas en 8 semanas..."
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-[1.5] text-ink placeholder:text-ink-muted focus:border-pastel-sky focus:outline-none focus:ring-4 focus:ring-pastel-turquoise/40"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
              <span>Mínimo {MIN_DESCRIPTION_LENGTH} caracteres</span>
              <span>
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-pastel-rose/60 px-4 py-3 text-sm leading-[1.5] text-ink">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleAudit}
              disabled={isAuditing}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-md disabled:cursor-wait disabled:opacity-80"
            >
              {isAuditing ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <ScanSearch className="h-5 w-5 text-pastel-mint" aria-hidden />}
              {isAuditing ? 'Analizando tu proyecto...' : 'Auditar Proyecto con IA'}
            </button>
          </div>

          <div className="min-w-0">
            {report ? (
              <AuditReport key={reportId} report={report} />
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
                <p className="font-mono text-sm text-ink-soft">Esperando un proyecto para auditar...</p>
                <p className="max-w-sm text-sm leading-[1.5] text-ink-muted">
                  El informe incluirá diagnóstico de viabilidad, componentes recomendados y sugerencias de concursos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
