export type LevelId = 'secundaria' | 'preparatoria' | 'licenciatura' | 'posgrado';
export type ProgramLevelId = 'preparatoria' | 'licenciatura' | 'maestria' | 'doctorado';
export type MacroAreaId = 'science' | 'technology' | 'engineering' | 'mathematics';
export type AreaId = 'mecatronica' | 'electronica' | 'datos' | 'biotecnologia' | 'robotica' | 'ia';
export type DegreeLevel = 'licenciatura' | 'maestria' | 'doctorado';
export type InstitutionType = 'publica' | 'privada' | 'centro-investigacion' | 'tecnologico' | 'universidad-intercultural' | 'universidad-tecnologica' | 'universidad-politecnica';

export interface FilterState {
  stateId: string;
  municipalityId: string;
  level: LevelId | '';
  programLevel: ProgramLevelId | '';
  area: MacroAreaId | '';
  careerId: string;
}

export interface CareerInfo {
  id: string;
  areaId: MacroAreaId;
  name: string;
  description: string;
  aliases: string[];
  levels: ProgramLevelId[];
}

export interface AreaInfo {
  id: MacroAreaId;
  label: string;
  englishLabel: string;
  summary: string;
  subjects: string[];
  tools: string[];
  scholarships: string[];
  careers: CareerInfo[];
  colorToken: string;
}

export interface RegionOption {
  id: string;
  stateCode: string;
  stateName: string;
  municipalityCode: string | null;
  municipalityName: string | null;
}

export interface InstitutionInfo {
  id: string;
  name: string;
  shortName: string | null;
  institutionType: InstitutionType;
  officialUrl: string;
  campusName: string;
}

export interface ProgramOffering {
  id: string;
  careerId: string;
  levelId: ProgramLevelId;
  institutionId: string;
  regionId: string;
  institution: InstitutionInfo;
  programName: string;
  modality: 'escolarizada' | 'en-linea' | 'mixta' | 'ejecutiva';
  durationYears: number | null;
  officialProgramUrl: string;
}

export interface RouteStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  institutions: string[];
  tip: string;
}

export interface Mentor {
  id: string;
  name: string;
  state: string;
  city: string;
  lat: number;
  lon: number;
  institution: string;
  level: DegreeLevel;
  area: AreaId;
  specialty: string;
  bio: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  level: DegreeLevel | 'todos';
  category: 'Beca' | 'Verano' | 'Hackathon' | 'Concurso';
  deadline: string | null;
  requirements: string;
  benefit: string;
  officialUrl: string;
  applicationUrl: string | null;
  officialDomain: string;
  linkStatus: 'verified' | 'broken' | 'pending';
  lastVerifiedAt: string | null;
  status: 'abierta' | 'proxima' | 'cerrada' | 'por_confirmar';
}
