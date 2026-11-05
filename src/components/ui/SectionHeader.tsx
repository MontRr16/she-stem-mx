import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, accent, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl leading-[1.2] text-ink md:text-4xl">
          {title}
          {accent && <span className="ml-2 font-accent text-4xl text-ink-soft md:text-5xl">{accent}</span>}
        </h2>
        {description && <p className="mt-3 text-base leading-[1.5] text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  );
}
