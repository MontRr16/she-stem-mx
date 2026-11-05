import { normalizeText } from '@/lib/text';

type Domain = 'electronica' | 'software' | 'mecatronica' | 'datos' | 'biotecnologia' | 'robotica' | 'general';

const DOMAIN_KEYWORDS: Record<Domain, string[]> = {
  electronica: ['arduino', 'esp32', 'pcb', 'sensor', 'circuito', 'voltaje', 'microcontrolador', 'raspberry', 'bateria'],
  software: ['app', 'web', 'api', 'react', 'backend', 'base de datos', 'usuarios', 'frontend'],
  mecatronica: ['motor', 'servo', 'pid', 'actuador', 'cad', 'impresion 3d', 'engranes', 'mecanico'],
  datos: ['modelo', 'dataset', 'machine learning', 'prediccion', 'regresion', 'clasificacion', 'red neuronal'],
  biotecnologia: ['cultivo', 'bioreactor', 'adn', 'proteina', 'microorganismo', 'biologico', 'laboratorio'],
  robotica: ['robot', 'ros', 'navegacion', 'trayectoria', 'manipulador', 'lidar', 'autonomo'],
  general: [],
};

const DOMAIN_LABELS: Record<Domain, string> = {
  electronica: 'Electrónica embebida',
  software: 'Desarrollo de software',
  mecatronica: 'Mecatrónica',
  datos: 'Ciencia de datos e IA',
  biotecnologia: 'Biotecnología',
  robotica: 'Robótica',
  general: 'Proyecto de ingeniería general',
};

const DOMAIN_NOTES: Record<Domain, string[]> = {
  electronica: [
    'Verifica la corriente máxima que demandarán los actuadores y dimensiona la fuente con 30% de margen.',
    'Separa la alimentación digital de la analógica y coloca capacitores de desacoplo cerca de cada circuito integrado.',
  ],
  software: [
    'Define el modelo de datos y la autenticación antes de diseñar la interfaz para evitar reescrituras.',
    'Agrega pruebas automatizadas a la lógica de negocio desde la primera versión.',
  ],
  mecatronica: [
    'Calcula el par y la velocidad requeridos con la carga real antes de elegir motores y reductores.',
    'Implementa el lazo de control primero en simulación y ajusta las ganancias del PID con datos medidos.',
  ],
  datos: [
    'Separa los conjuntos de entrenamiento, validación y prueba para evitar fuga de información.',
    'Reporta una línea base sencilla (por ejemplo, regresión logística) para medir la mejora real del modelo.',
  ],
  biotecnologia: [
    'Incluye controles positivos y negativos, y al menos tres réplicas biológicas por condición.',
    'Documenta el protocolo con parámetros exactos para que el experimento sea reproducible.',
  ],
  robotica: [
    'Valida la navegación en simulación antes de pasar a hardware físico para reducir riesgos.',
    'Mide la latencia del lazo de control y asegúrate de que sea menor al periodo del sensor.',
  ],
  general: [
    'Describe entradas, salidas y criterios de éxito en una tabla breve.',
    'Divide el proyecto en fases con un entregable verificable por fase.',
  ],
};

const DOMAIN_COMPONENTS: Record<Domain, string[]> = {
  electronica: ['ESP32 (Wi-Fi y BLE) o STM32 para control en tiempo real', 'Sensor de corriente INA219 para monitoreo energético', 'KiCad para diseño de PCB con revisión de reglas eléctricas', 'FreeRTOS para separar tareas de sensado y comunicación'],
  software: ['React con Vite para la interfaz', 'Supabase para base de datos, autenticación y políticas de acceso', 'Vitest o Playwright para pruebas automatizadas', 'Registro de errores con trazas estructuradas'],
  mecatronica: ['Arduino o STM32 con controlador PID en firmware', 'ROS 2 para integrar sensores y actuadores', 'FreeCAD o SolidWorks para diseño y análisis de esfuerzos', 'Impresión 3D en PLA o PETG para prototipos de bajo costo'],
  datos: ['pandas y scikit-learn para preparación y modelado', 'MLflow para registrar experimentos y métricas', 'SQL para consultas reproducibles sobre la fuente de datos', 'Validación cruzada estratificada para estimar el desempeño'],
  biotecnologia: ['Biopython para análisis de secuencias', 'R con Bioconductor para estadística ómica', 'Curvas estándar para cuantificación de proteínas', 'Cuaderno electrónico de laboratorio para trazabilidad'],
  robotica: ['ROS 2 con Nav2 para navegación autónoma', 'Gazebo para simulación previa al hardware', 'Micro-ROS para microcontroladores conectados al sistema', 'OpenCV para visión computacional con cámara'],
  general: ['Diagrama de bloques del sistema', 'Hoja de cálculo para costos y cronograma', 'Repositorio con control de versiones', 'Prototipo de baja fidelidad para validar el concepto'],
};

const DOMAIN_CONTESTS: Record<Domain, string[]> = {
  electronica: ['Concursos de prototipos y ferias de ciencia y tecnología de universidades públicas', 'Convocatorias de innovación en electrónica del IPN y la UNAM'],
  software: ['Hackathon Mujeres en Tech MX (equipos de 2 a 4 personas)', 'Concursos de emprendimiento tecnológico con demo funcional'],
  mecatronica: ['Competencias nacionales de robótica y mecatrónica para estudiantes', 'Concurso nacional de prototipos con documentación técnica'],
  datos: ['Competencias de análisis de datos y ciencia de datos en universidades', 'Becas de excelencia en IA y datos para posgrado'],
  biotecnologia: ['Premios de innovación en biotecnología de centros CINVESTAV', 'Ferias de ciencia con enfoque en salud y medio ambiente'],
  robotica: ['Competencias de robótica con robots autónomos', 'Concurso nacional de prototipos con video de demostración'],
  general: ['Concurso nacional de prototipos y ferias de ciencia', 'Hackathon Mujeres en Tech MX'],
};

const VIABILITY_CHECKS: { label: string; pattern: RegExp }[] = [
  { label: 'objetivo claro', pattern: /objetivo|meta|problema|resolver|busca/ },
  { label: 'métricas de éxito', pattern: /precisi|error|metric|tiempo|porcentaje|exactitud|latencia|sensibilidad|%/ },
  { label: 'presupuesto estimado', pattern: /presupuesto|costo|precio|mxn|pesos|\$/ },
  { label: 'plan de pruebas', pattern: /prueba|validaci|test|simulaci|prototipo/ },
  { label: 'cronograma por fases', pattern: /semana|mes|fase|cronograma|etapa|hito/ },
  { label: 'usuario o contexto de uso', pattern: /usuari|cliente|alumno|paciente|equipo|integrantes|comunidad/ },
];

export interface AuditLine {
  kind: 'title' | 'text' | 'item';
  text: string;
}

export interface AuditReport {
  score: number;
  viability: 'Alta' | 'Media' | 'Baja';
  lines: AuditLine[];
}

function detectDomain(text: string): Domain {
  let best: Domain = 'general';
  let bestCount = 0;
  (Object.keys(DOMAIN_KEYWORDS) as Domain[]).forEach((domain) => {
    const count = DOMAIN_KEYWORDS[domain].filter((keyword) => text.includes(keyword)).length;
    if (count > bestCount) {
      best = domain;
      bestCount = count;
    }
  });
  return best;
}

export function auditProject(description: string): AuditReport {
  const normalized = normalizeText(description);
  const domain = detectDomain(normalized);
  const passed = VIABILITY_CHECKS.filter((check) => check.pattern.test(normalized));
  const missing = VIABILITY_CHECKS.filter((check) => !check.pattern.test(normalized));
  const score = Math.round((passed.length / VIABILITY_CHECKS.length) * 100);
  const viability: AuditReport['viability'] = score >= 70 ? 'Alta' : score >= 40 ? 'Media' : 'Baja';

  const lines: AuditLine[] = [
    { kind: 'title', text: '1. DIAGNÓSTICO DE VIABILIDAD TÉCNICA' },
    { kind: 'text', text: `Dominio detectado: ${DOMAIN_LABELS[domain]}` },
    { kind: 'text', text: `Índice de viabilidad: ${score}/100 (${viability})` },
    ...DOMAIN_NOTES[domain].map((note) => ({ kind: 'item' as const, text: note })),
    {
      kind: 'text',
      text: missing.length > 0
        ? `Falta documentar: ${missing.map((check) => check.label).join(', ')}.`
        : 'Documentación completa: objetivo, métricas, presupuesto, pruebas, fases y usuarios.',
    },
    { kind: 'title', text: '2. COMPONENTES Y FRAMEWORKS RECOMENDADOS' },
    ...DOMAIN_COMPONENTS[domain].map((item) => ({ kind: 'item' as const, text: item })),
    { kind: 'title', text: '3. SUGERENCIAS PARA CONCURSOS Y CONVOCATORIAS' },
    ...DOMAIN_CONTESTS[domain].map((item) => ({ kind: 'item' as const, text: item })),
    { kind: 'text', text: 'Revisa las fechas y requisitos vigentes en STEM-Finder antes de postular.' },
  ];

  return { score, viability, lines };
}
