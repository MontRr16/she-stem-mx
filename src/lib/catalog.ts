import { CAREERS } from '@/data/areas';
import { PROGRAM_OFFERINGS, REGIONS } from '@/data/catalog';
import { supabase } from '@/lib/supabase';
import type { MacroAreaId, ProgramLevelId, ProgramOffering, RegionOption } from '@/types/stem';

interface DbOffering {
  id: string;
  career_id: string;
  level_id: ProgramLevelId;
  institution_id: string;
  region_id: string;
  program_name: string;
  modality: ProgramOffering['modality'];
  duration_years: number | null;
  official_program_url: string;
  institutions: { id: string; name: string; short_name: string | null; institution_type: ProgramOffering['institution']['institutionType']; official_url: string }[] | null;
  institution_campuses: { campus_name: string }[] | null;
}

export function getRegions(): RegionOption[] {
  return REGIONS;
}

export function getCareersForArea(areaId: MacroAreaId | '') {
  return areaId ? CAREERS.filter((career) => career.areaId === areaId) : [];
}

export async function getProgramOfferings(filters: { areaId: MacroAreaId | ''; careerId: string; level: ProgramLevelId | ''; regionId: string }): Promise<ProgramOffering[]> {
  const fallback = PROGRAM_OFFERINGS.filter((item) => {
    const matchesCareer = !filters.careerId || item.careerId === filters.careerId;
    const matchesLevel = !filters.level || item.levelId === filters.level;
    const matchesRegion = !filters.regionId || filters.regionId === 'all' || item.regionId === filters.regionId;
    const career = CAREERS.find((candidate) => candidate.id === item.careerId);
    const matchesArea = !filters.areaId || career?.areaId === filters.areaId;
    return matchesCareer && matchesLevel && matchesRegion && matchesArea;
  });

  if (!supabase) return fallback;

  const query = supabase
    .from('program_offerings')
    .select('id, career_id, level_id, institution_id, region_id, program_name, modality, duration_years, official_program_url, institutions(id, name, short_name, institution_type, official_url), institution_campuses(campus_name)')
    .eq('is_active', true);
  if (filters.careerId) query.eq('career_id', filters.careerId);
  if (filters.level) query.eq('level_id', filters.level);
  if (filters.regionId && filters.regionId !== 'all') query.eq('region_id', filters.regionId);

  const { data, error } = await query;
  if (error || !data || data.length === 0) return fallback;

  return (data as DbOffering[]).map((item) => ({
    id: item.id,
    careerId: item.career_id,
    levelId: item.level_id,
    institutionId: item.institution_id,
    regionId: item.region_id,
    programName: item.program_name,
    modality: item.modality,
    durationYears: item.duration_years,
    officialProgramUrl: item.official_program_url,
    institution: {
      id: item.institutions?.[0]?.id ?? item.institution_id,
      name: item.institutions?.[0]?.name ?? 'Institución educativa',
      shortName: item.institutions?.[0]?.short_name ?? null,
      institutionType: item.institutions?.[0]?.institution_type ?? 'publica',
      officialUrl: item.institutions?.[0]?.official_url ?? item.official_program_url,
      campusName: item.institution_campuses?.[0]?.campus_name ?? 'Campus no especificado',
    },
  }));
}
