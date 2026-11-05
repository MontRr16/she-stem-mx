import { useState } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HeroSection from '@/components/hero/HeroSection';
import StemMatch from '@/components/route/StemMatch';
import EllaIngenia from '@/components/mentors/EllaIngenia';
import StemFinder from '@/components/finder/StemFinder';
import StemBotPro from '@/components/bot/StemBotPro';
import type { FilterState } from '@/types/stem';

const INITIAL_FILTERS: FilterState = { stateId: '', municipalityId: '', level: '', programLevel: '', area: '', careerId: '' };

function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const updateFilters = (patch: Partial<FilterState>) => setFilters((current) => ({ ...current, ...patch }));

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection filters={filters} onFilterChange={updateFilters} />
        <StemMatch filters={filters} onFilterChange={updateFilters} />
        <EllaIngenia preferredState={filters.stateId} />
        <StemFinder />
        <StemBotPro />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
