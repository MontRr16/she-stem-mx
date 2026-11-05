import type { InstitutionInfo, ProgramOffering, RegionOption } from '@/types/stem';

const institution = (id: string, name: string, shortName: string, institutionType: InstitutionInfo['institutionType'], campusName: string, officialUrl: string): InstitutionInfo => ({ id, name, shortName, institutionType, campusName, officialUrl });

export const REGIONS: RegionOption[] = [
  { id: 'all', stateCode: '', stateName: 'Todo México', municipalityCode: null, municipalityName: null },
  { id: 'mx-cdmx-cuauhtemoc', stateCode: 'CDMX', stateName: 'Ciudad de México', municipalityCode: 'CUA', municipalityName: 'Cuauhtémoc' },
  { id: 'mx-jalisco-guadalajara', stateCode: 'JAL', stateName: 'Jalisco', municipalityCode: 'GDL', municipalityName: 'Guadalajara' },
  { id: 'mx-jalisco-zapopan', stateCode: 'JAL', stateName: 'Jalisco', municipalityCode: 'ZAP', municipalityName: 'Zapopan' },
  { id: 'mx-queretaro-queretaro', stateCode: 'QRO', stateName: 'Querétaro', municipalityCode: 'QRO', municipalityName: 'Querétaro' },
  { id: 'mx-nuevo-leon-monterrey', stateCode: 'NL', stateName: 'Nuevo León', municipalityCode: 'MTY', municipalityName: 'Monterrey' },
  { id: 'mx-yucatan-merida', stateCode: 'YUC', stateName: 'Yucatán', municipalityCode: 'MER', municipalityName: 'Mérida' },
];

export const PROGRAM_OFFERINGS: ProgramOffering[] = [
  { id: 'fallback-1', careerId: 'computer-science', levelId: 'licenciatura', institutionId: 'unam', regionId: 'mx-cdmx-cuauhtemoc', institution: institution('unam', 'Universidad Nacional Autónoma de México', 'UNAM', 'publica', 'Ciudad Universitaria', 'https://www.unam.mx'), programName: 'Licenciatura en Ciencias de la Computación', modality: 'escolarizada', durationYears: 4, officialProgramUrl: 'https://www.fciencias.unam.mx/estudiar-en-la-fc/licenciaturas/ciencias-de-la-computacion' },
  { id: 'fallback-2', careerId: 'electronic-engineering', levelId: 'licenciatura', institutionId: 'ipn', regionId: 'mx-cdmx-cuauhtemoc', institution: institution('ipn', 'Instituto Politécnico Nacional', 'IPN', 'publica', 'Zacatenco', 'https://www.ipn.mx'), programName: 'Ingeniería en Comunicaciones y Electrónica', modality: 'escolarizada', durationYears: 4.5, officialProgramUrl: 'https://www.esimez.ipn.mx' },
  { id: 'fallback-3', careerId: 'computer-science', levelId: 'licenciatura', institutionId: 'udg', regionId: 'mx-jalisco-zapopan', institution: institution('udg', 'Universidad de Guadalajara', 'UdeG', 'publica', 'CUCEI', 'https://www.udg.mx'), programName: 'Ingeniería en Computación', modality: 'escolarizada', durationYears: 4.5, officialProgramUrl: 'https://www.cucei.udg.mx' },
  { id: 'fallback-4', careerId: 'mechatronics-engineering', levelId: 'licenciatura', institutionId: 'uaq', regionId: 'mx-queretaro-queretaro', institution: institution('uaq', 'Universidad Autónoma de Querétaro', 'UAQ', 'publica', 'Campus Centro Universitario', 'https://www.uaq.mx'), programName: 'Ingeniería en Automatización', modality: 'escolarizada', durationYears: 4.5, officialProgramUrl: 'https://www.ingenieria.uaq.mx' },
  { id: 'fallback-5', careerId: 'artificial-intelligence', levelId: 'licenciatura', institutionId: 'itesm', regionId: 'mx-nuevo-leon-monterrey', institution: institution('itesm', 'Tecnológico de Monterrey', 'Tec de Monterrey', 'privada', 'Campus Monterrey', 'https://tec.mx'), programName: 'Ingeniería en Tecnologías Computacionales', modality: 'escolarizada', durationYears: 4, officialProgramUrl: 'https://tec.mx/es/ingenieria-y-ciencias' },
  { id: 'fallback-6', careerId: 'biotechnology', levelId: 'licenciatura', institutionId: 'uady', regionId: 'mx-yucatan-merida', institution: institution('uady', 'Universidad Autónoma de Yucatán', 'UADY', 'publica', 'Campus de Ciencias Exactas e Ingenierías', 'https://www.uady.mx'), programName: 'Ingeniería en Biotecnología', modality: 'escolarizada', durationYears: 4.5, officialProgramUrl: 'https://www.uady.mx' },
  { id: 'fallback-7', careerId: 'data-science', levelId: 'maestria', institutionId: 'unam', regionId: 'mx-cdmx-cuauhtemoc', institution: institution('unam', 'Universidad Nacional Autónoma de México', 'UNAM', 'publica', 'Ciudad Universitaria', 'https://www.unam.mx'), programName: 'Posgrado en Ciencia e Ingeniería de la Computación', modality: 'escolarizada', durationYears: 2, officialProgramUrl: 'https://www.posgrado.unam.mx' },
  { id: 'fallback-8', careerId: 'robotics-engineering', levelId: 'doctorado', institutionId: 'ipn', regionId: 'mx-cdmx-cuauhtemoc', institution: institution('ipn', 'Instituto Politécnico Nacional', 'IPN', 'publica', 'Zacatenco', 'https://www.ipn.mx'), programName: 'Doctorado en Ingeniería de Sistemas Robóticos y Mecatrónicos', modality: 'escolarizada', durationYears: 4, officialProgramUrl: 'https://www.ipn.mx/posgrado' },
];
