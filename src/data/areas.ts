import type { AreaInfo, CareerInfo, MacroAreaId, ProgramLevelId, RouteStep } from '@/types/stem';

const levels: ProgramLevelId[] = ['licenciatura', 'maestria', 'doctorado'];

export const CAREERS: CareerInfo[] = [
  { id: 'biology', areaId: 'science', name: 'Biología', description: 'Estudia los seres vivos y sus sistemas.', aliases: ['Biología molecular', 'Ecología'], levels },
  { id: 'chemistry', areaId: 'science', name: 'Química', description: 'Analiza la composición y transformación de la materia.', aliases: ['Química aplicada'], levels },
  { id: 'physics', areaId: 'science', name: 'Física', description: 'Modela las leyes fundamentales de la naturaleza.', aliases: ['Física aplicada'], levels },
  { id: 'biotechnology', areaId: 'science', name: 'Biotecnología', description: 'Usa organismos y procesos biológicos para crear soluciones.', aliases: ['Bioinformática'], levels },
  { id: 'computer-science', areaId: 'technology', name: 'Ciencias de la Computación', description: 'Diseña algoritmos, software y sistemas computacionales.', aliases: ['Computación', 'Informática'], levels },
  { id: 'artificial-intelligence', areaId: 'technology', name: 'Inteligencia Artificial', description: 'Desarrolla sistemas que aprenden de datos y patrones.', aliases: ['IA', 'Machine learning'], levels },
  { id: 'data-science', areaId: 'technology', name: 'Ciencia de Datos', description: 'Transforma datos en modelos, visualizaciones y decisiones.', aliases: ['Datos', 'Analítica'], levels },
  { id: 'cybersecurity', areaId: 'technology', name: 'Ciberseguridad', description: 'Protege sistemas, redes e información digital.', aliases: ['Seguridad informática'], levels },
  { id: 'electronic-engineering', areaId: 'engineering', name: 'Ingeniería Electrónica', description: 'Diseña circuitos, sensores y sistemas electrónicos.', aliases: ['Electrónica'], levels },
  { id: 'mechatronics-engineering', areaId: 'engineering', name: 'Ingeniería Mecatrónica', description: 'Integra mecánica, electrónica, control y software.', aliases: ['Mecatrónica', 'Automatización'], levels },
  { id: 'robotics-engineering', areaId: 'engineering', name: 'Ingeniería Robótica', description: 'Construye robots autónomos y sistemas de control.', aliases: ['Robótica'], levels },
  { id: 'environmental-engineering', areaId: 'engineering', name: 'Ingeniería Ambiental', description: 'Resuelve retos de agua, energía, residuos y clima.', aliases: ['Ambiental'], levels },
  { id: 'mathematics', areaId: 'mathematics', name: 'Matemáticas', description: 'Investiga estructuras, patrones y fundamentos lógicos.', aliases: ['Matemática pura'], levels },
  { id: 'applied-mathematics', areaId: 'mathematics', name: 'Matemáticas Aplicadas', description: 'Usa modelos matemáticos para resolver problemas reales.', aliases: ['Modelación'], levels },
  { id: 'statistics', areaId: 'mathematics', name: 'Estadística', description: 'Analiza incertidumbre, datos y evidencia.', aliases: ['Estadística aplicada'], levels },
  { id: 'actuarial-science', areaId: 'mathematics', name: 'Actuaría', description: 'Modela riesgos financieros, sociales y operativos.', aliases: ['Ciencias actuariales'], levels },
];

const areaData: Omit<AreaInfo, 'careers'>[] = [
  { id: 'science', label: 'Ciencia', englishLabel: 'Science', summary: 'Explora la materia, la vida, el planeta y los fenómenos que explican nuestro mundo.', subjects: ['Método científico', 'Laboratorio', 'Análisis de datos', 'Comunicación científica'], tools: ['R', 'Python', 'Microscopía', 'Instrumentación'], scholarships: ['Becas nacionales de posgrado', 'Programa Delfín', 'Estancias en centros de investigación'], colorToken: 'pastel-yellow' },
  { id: 'technology', label: 'Tecnología', englishLabel: 'Technology', summary: 'Construye herramientas digitales y sistemas que conectan personas, datos y conocimiento.', subjects: ['Algoritmos', 'Bases de datos', 'Sistemas digitales', 'Ética tecnológica'], tools: ['Python', 'SQL', 'Git', 'Cloud'], scholarships: ['Becas nacionales de posgrado', 'Programa Delfín', 'Becas de excelencia en tecnología'], colorToken: 'pastel-cyan' },
  { id: 'engineering', label: 'Ingeniería', englishLabel: 'Engineering', summary: 'Diseña soluciones técnicas para resolver problemas sociales, industriales y ambientales.', subjects: ['Diseño', 'Control', 'Materiales', 'Prototipado'], tools: ['C++', 'CAD', 'MATLAB', 'Arduino'], scholarships: ['Becas nacionales de posgrado', 'Programa Delfín', 'Becas de innovación'], colorToken: 'pastel-peach' },
  { id: 'mathematics', label: 'Matemáticas', englishLabel: 'Mathematics', summary: 'Convierte patrones, modelos y datos en decisiones y descubrimientos.', subjects: ['Álgebra', 'Cálculo', 'Probabilidad', 'Modelación'], tools: ['R', 'Python', 'Julia', 'LaTeX'], scholarships: ['Becas nacionales de posgrado', 'Programa Delfín', 'Becas de excelencia académica'], colorToken: 'pastel-lilac' },
];

export const MACRO_AREAS: AreaInfo[] = areaData.map((area) => ({ ...area, careers: CAREERS.filter((career) => career.areaId === area.id) }));
export const AREAS = MACRO_AREAS;
export const AREA_BY_ID: Record<MacroAreaId, AreaInfo> = Object.fromEntries(MACRO_AREAS.map((area) => [area.id, area])) as Record<MacroAreaId, AreaInfo>;

export const ROUTE_STEPS: RouteStep[] = [
  { id: 'preparatoria', title: 'Preparatoria', duration: '3 años', description: 'Explora clubes, laboratorios y proyectos para identificar tus intereses STEM.', institutions: ['Bachilleratos públicos', 'Bachilleratos privados', 'CECyT y CETis'], tip: 'Participa en ferias de ciencia y concursos para construir tu portafolio.' },
  { id: 'licenciatura', title: 'Licenciatura / Ingeniería', duration: '4 a 5 años', description: 'Elige una carrera relacionada y desarrolla proyectos de aplicación con prácticas de laboratorio.', institutions: ['Universidades públicas', 'Universidades privadas', 'Institutos tecnológicos'], tip: 'Busca un grupo de investigación desde el segundo año.' },
  { id: 'verano', title: 'Verano de investigación', duration: '6 a 8 semanas', description: 'Conoce laboratorios y trabaja con una investigadora o investigador en un proyecto real.', institutions: ['Programa Delfín', 'Universidades estatales', 'Centros públicos'], tip: 'Prepara tu carta de motivación antes de que abran las convocatorias.' },
  { id: 'maestria', title: 'Maestría', duration: '2 años', description: 'Profundiza en una línea de investigación o especialización profesional.', institutions: ['Universidades públicas', 'Universidades privadas', 'Centros de investigación'], tip: 'Verifica el reconocimiento oficial y las opciones de beca.' },
  { id: 'doctorado', title: 'Doctorado', duration: '3 a 4 años', description: 'Realiza investigación original, publica resultados y fortalece tu red nacional e internacional.', institutions: ['Universidades públicas', 'Centros públicos', 'Universidades privadas'], tip: 'Elige una dirección de tesis con líneas activas de financiamiento.' },
  { id: 'snii', title: 'Investigadora', duration: 'Carrera continua', description: 'Lidera proyectos, forma nuevas generaciones y participa en redes científicas.', institutions: ['Universidades', 'Centros de investigación', 'Sector tecnológico'], tip: 'Documenta tus publicaciones, proyectos y mentorías desde el inicio.' },
];

export const LEVEL_TO_STEP = { secundaria: 0, preparatoria: 0, licenciatura: 1, posgrado: 3 } as const;
