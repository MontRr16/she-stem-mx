import { MENTORS } from '@/data/mentors';
import { tokenize } from '@/lib/text';
import type { AreaId, DegreeLevel, Mentor } from '@/types/stem';

const LEVEL_TERMS: Record<DegreeLevel, { label: string; terms: string[] }> = {
  licenciatura: { label: 'Licenciatura', terms: ['licenciatura', 'licenciada', 'pregrado', 'ingenieria'] },
  maestria: { label: 'Maestría', terms: ['maestria', 'maestra', 'maestro', 'posgrado', 'master'] },
  doctorado: { label: 'Doctorado', terms: ['doctorado', 'doctora', 'doctor', 'phd'] },
};

const AREA_LABELS: Record<AreaId, string> = { mecatronica: 'Mecatrónica', electronica: 'Electrónica', datos: 'Datos', biotecnologia: 'Biotecnología', robotica: 'Robótica', ia: 'Inteligencia Artificial' };

const AREA_TERMS: Record<AreaId, string[]> = {
  mecatronica: ['mecatronica', 'mecatronico'],
  electronica: ['electronica', 'electronico', 'circuito', 'circuitos', 'pcb'],
  datos: ['datos', 'estadistica', 'analitica', 'data'],
  biotecnologia: ['biotecnologia', 'biotecnologica', 'biologia', 'bioinformatica'],
  robotica: ['robotica', 'robot', 'robots'],
  ia: ['ia', 'inteligencia', 'artificial', 'aprendizaje', 'neuronal'],
};

export interface MentorSearchResult {
  mentors: Mentor[];
  interpretation: string[];
  hasExactMatches: boolean;
}

export function searchMentors(query: string): MentorSearchResult {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return { mentors: MENTORS, interpretation: [], hasExactMatches: true };
  }

  const matchedLevel = (Object.keys(LEVEL_TERMS) as DegreeLevel[]).find((level) =>
    LEVEL_TERMS[level].terms.some((term) => tokens.includes(term))
  );
  const matchedArea = (Object.keys(AREA_TERMS) as AreaId[]).find((area) =>
    AREA_TERMS[area].some((term) => tokens.includes(term))
  );

  const scored = MENTORS.map((mentor) => {
    const institutionTokens = tokenize(mentor.institution);
    const stateTokens = tokenize(mentor.state);
    const specialtyTokens = tokenize(`${mentor.specialty} ${mentor.bio}`);

    let score = 0;
    if (matchedLevel && mentor.level === matchedLevel) score += 3;
    if (matchedArea && mentor.area === matchedArea) score += 3;
    if (tokens.some((token) => institutionTokens.includes(token))) score += 2;
    if (tokens.some((token) => stateTokens.includes(token))) score += 2;
    score += tokens.filter((token) => token.length > 3 && specialtyTokens.includes(token)).length;

    return { mentor, score };
  });

  const mentors = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.mentor);

  const interpretation: string[] = [];
  if (matchedLevel) interpretation.push(LEVEL_TERMS[matchedLevel].label);
  if (matchedArea) interpretation.push(AREA_LABELS[matchedArea]);
  const institutionHit = tokens.filter((token) =>
    MENTORS.some((mentor) => tokenize(mentor.institution).includes(token))
  );
  if (institutionHit.length > 0) interpretation.push(`Institución: ${institutionHit.map((token) => token.toUpperCase()).join(', ')}`);

  if (mentors.length === 0) {
    return { mentors: MENTORS, interpretation, hasExactMatches: false };
  }
  return { mentors, interpretation, hasExactMatches: true };
}
