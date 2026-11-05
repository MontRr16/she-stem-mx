export interface SchoolExample {
  name: string;
  shortName: string;
  officialUrl: string;
}

export type InstitutionCategoryKey =
  | 'bachilleratos-publicos'
  | 'bachilleratos-privados'
  | 'cecyt-cetis'
  | 'universidades-publicas'
  | 'universidades-privadas'
  | 'institutos-tecnologicos'
  | 'centros-investigacion'
  | 'centros-publicos'
  | 'universidades-estatales'
  | 'programa-delfin'
  | 'universidades'
  | 'sector-tecnologico';

export interface InstitutionCategory {
  key: InstitutionCategoryKey;
  label: string;
  description: string;
}

export const INSTITUTION_CATEGORIES: InstitutionCategory[] = [
  { key: 'bachilleratos-publicos', label: 'Bachilleratos públicos', description: 'Preparatorias y bachilleratos oficiales gratuitos.' },
  { key: 'bachilleratos-privados', label: 'Bachilleratos privados', description: 'Preparatorias e institutos particulares con costo.' },
  { key: 'cecyt-cetis', label: 'CECyT y CETis', description: 'Planteles de nivel medio superior del IPN y DGB.' },
  { key: 'universidades-publicas', label: 'Universidades públicas', description: 'Universidades federales, estatales y autónomas.' },
  { key: 'universidades-privadas', label: 'Universidades privadas', description: 'Instituciones particulares de educación superior.' },
  { key: 'institutos-tecnologicos', label: 'Institutos tecnológicos', description: 'Planteles del TecNM y universidades politécnicas.' },
  { key: 'centros-investigacion', label: 'Centros de investigación', description: 'Centros públicos de investigación científica.' },
  { key: 'centros-publicos', label: 'Centros públicos', description: 'Centros y laboratorios de investigación pública.' },
  { key: 'universidades-estatales', label: 'Universidades estatales', description: 'Universidades autónomas de cada estado.' },
  { key: 'programa-delfin', label: 'Programa Delfín', description: 'Movilidad de investigación en instituciones afiliadas.' },
  { key: 'universidades', label: 'Universidades', description: 'Universidades públicas y privadas en general.' },
  { key: 'sector-tecnologico', label: 'Sector tecnológico', description: 'Empresas y centros de I+D en industria tecnológica.' },
];

const school = (name: string, shortName: string, officialUrl: string): SchoolExample => ({ name, shortName, officialUrl });

const NATIONAL_SCHOOLS: Record<InstitutionCategoryKey, SchoolExample[]> = {
  'bachilleratos-publicos': [
    school('Colegio de Bachilleres (Plantel El Rosario)', 'COBACH', 'https://www.cbachilleres.edu.mx'),
    school('Escuela Nacional Preparatoria (Plantel 1 "Gabino Barreda")', 'ENP-UNAM', 'https://www.enp.unam.mx'),
    school('Colegio de Ciencias y Humanidades (Plantel Sur)', 'CCH-UNAM', 'https://www.cch.unam.mx'),
    school('Bachillerato Universitario de la UANL', 'UANL-BU', 'https://www.uanl.mx'),
    school('Colegio de Estudios Científicos y Tecnológicos del Estado de México', 'CECyTEM', 'https://www.cecytem.edomex.gob.mx'),
  ],
  'bachilleratos-privados': [
    school('Preparatoria del Tecnológico de Monterrey (Campus CCM)', 'PrepaTec CCM', 'https://prepa.tec.mx'),
    school('Bachillerato Anáhuac (Campus Norte)', 'Anáhuac', 'https://www.anahuac.mx'),
    school('Preparatoria Universidad Iberoamericana', 'Prepa Ibero', 'https://www.ibero.mx'),
    school('Instituto Miguel Ángel de Querétaro', 'IMA', 'https://www.imag.edu.mx'),
    school('Westhill Institute (Preparatoria)', 'Westhill', 'https://www.westhill.edu.mx'),
  ],
  'cecyt-cetis': [
    school('CECyT 1 "Gonzalo Vázquez Yela" (IPN)', 'CECyT 1', 'https://www.cecyt1.ipn.mx'),
    school('CECyT 9 "Juan de Dios Bátiz" (IPN)', 'CECyT 9', 'https://www.cecyt9.ipn.mx'),
    school('CETis 38 "Leona Vicario" (DGB)', 'CETis 38', 'https://www.dgb.sep.gob.mx'),
    school('CETis 44 "Guillermo Massieu Helguera" (DGB)', 'CETis 44', 'https://www.dgb.sep.gob.mx'),
    school('CECyT 14 "Luis Enrique Erro Soler" (IPN)', 'CECyT 14', 'https://www.cecyt14.ipn.mx'),
  ],
  'universidades-publicas': [
    school('Universidad Nacional Autónoma de México', 'UNAM', 'https://www.unam.mx'),
    school('Instituto Politécnico Nacional', 'IPN', 'https://www.ipn.mx'),
    school('Universidad Autónoma Metropolitana', 'UAM', 'https://www.uam.mx'),
    school('Universidad de Guadalajara', 'UdeG', 'https://www.udg.mx'),
    school('Benemérita Universidad Autónoma de Puebla', 'BUAP', 'https://www.buap.mx'),
  ],
  'universidades-privadas': [
    school('Tecnológico de Monterrey', 'Tec de Monterrey', 'https://tec.mx'),
    school('Universidad Iberoamericana', 'IBERO', 'https://www.ibero.mx'),
    school('Universidad Anáhuac México', 'Anáhuac', 'https://www.anahuac.mx'),
    school('Universidad La Salle', 'La Salle', 'https://www.ulsa.edu.mx'),
    school('Universidad del Valle de México', 'UVM', 'https://www.uvm.mx'),
  ],
  'institutos-tecnologicos': [
    school('Instituto Tecnológico de Ciudad Madero (TecNM)', 'ITCM', 'https://www.cdmadero.tecnm.mx'),
    school('Instituto Tecnológico de Orizaba (TecNM)', 'ITOR', 'https://www.orizaba.tecnm.mx'),
    school('Instituto Tecnológico de Tuxtla Gutiérrez (TecNM)', 'ITTG', 'https://www.tuxtla.tecnm.mx'),
    school('Universidad Politécnica de Querétaro', 'UPQ', 'https://www.upq.edu.mx'),
    school('Universidad Tecnológica de México (UNITEC)', 'UNITEC', 'https://www.unitec.edu.mx'),
  ],
  'centros-investigacion': [
    school('Centro de Investigación y de Estudios Avanzados (CINVESTAV)', 'CINVESTAV', 'https://www.cinvestav.mx'),
    school('Centro de Investigación en Matemáticas (CIMAT)', 'CIMAT', 'https://www.cimat.mx'),
    school('El Colegio de México', 'COLMEX', 'https://www.colmex.mx'),
    school('Instituto Nacional de Astrofísica, Óptica y Electrónica', 'INAOE', 'https://www.inaoep.mx'),
    school('Centro de Investigación Científica y de Educación Superior de Ensenada', 'CICESE', 'https://www.cicese.mx'),
  ],
  'centros-publicos': [
    school('CINVESTAV Unidad Zacatenco', 'CINVESTAV-ZAC', 'https://www.zacatenco.cinvestav.mx'),
    school('Instituto Potosino de Investigación Científica y Tecnológica', 'IPICyT', 'https://www.ipicyt.edu.mx'),
    school('Centro de Investigación en Alimentación y Desarrollo', 'CIAD', 'https://www.ciad.mx'),
    school('Centro de Investigación y Desarrollo Tecnológico en Electroquímica', 'CIDETEQ', 'https://www.cideteq.mx'),
    school('Centro de Investigación en Biotecnología (UAEM)', 'CEIB-UAEM', 'https://www.uaem.mx'),
  ],
  'universidades-estatales': [
    school('Universidad Autónoma de Nuevo León', 'UANL', 'https://www.uanl.mx'),
    school('Universidad Autónoma de Yucatán', 'UADY', 'https://www.uady.mx'),
    school('Universidad Autónoma de Querétaro', 'UAQ', 'https://www.uaq.mx'),
    school('Universidad Autónoma de Baja California', 'UABC', 'https://www.uabc.mx'),
    school('Universidad Autónoma de Sinaloa', 'UAS', 'https://www.uas.edu.mx'),
  ],
  'programa-delfin': [
    school('Universidad de Guadalajara (Coordinación Delfín)', 'UdeG-Delfín', 'https://programadelfin.org.mx'),
    school('Universidad Autónoma de Guerrero', 'UAGro-Delfín', 'https://programadelfin.org.mx'),
    school('Universidad Autónoma de Nayarit', 'UAN-Delfín', 'https://programadelfin.org.mx'),
    school('Universidad Autónoma de Sinaloa', 'UAS-Delfín', 'https://programadelfin.org.mx'),
    school('Benemérita Universidad Autónoma de Puebla', 'BUAP-Delfín', 'https://programadelfin.org.mx'),
  ],
  'universidades': [
    school('Universidad Nacional Autónoma de México', 'UNAM', 'https://www.unam.mx'),
    school('Instituto Politécnico Nacional', 'IPN', 'https://www.ipn.mx'),
    school('Tecnológico de Monterrey', 'Tec de Monterrey', 'https://tec.mx'),
    school('Universidad de Guadalajara', 'UdeG', 'https://www.udg.mx'),
    school('Universidad Autónoma de Nuevo León', 'UANL', 'https://www.uanl.mx'),
  ],
  'sector-tecnologico': [
    school('IBM Research México', 'IBM Research', 'https://research.ibm.com/mexico'),
    school('Centro de Inteligencia Artificial de México (IA Center)', 'IA Center', 'https://www.iacenter.mx'),
    school('Google México (Engineering Hub)', 'Google México', 'https://www.google.com.mx'),
    school('Microsoft México (Innovation Center)', 'Microsoft MX', 'https://www.microsoft.com/es-mx'),
    school('Amazon Web Services México', 'AWS México', 'https://aws.amazon.com/es/mx'),
  ],
};

const STATE_SCHOOLS: Record<string, Partial<Record<InstitutionCategoryKey, SchoolExample[]>>> = {
  'Ciudad de México': {
    'bachilleratos-publicos': [
      school('Escuela Nacional Preparatoria Plantel 1 "Gabino Barreda"', 'ENP 1', 'https://www.enp.unam.mx'),
      school('Colegio de Ciencias y Humanidades Plantel Azcapotzalco', 'CCH Azcapotzalco', 'https://www.cch.unam.mx'),
      school('Colegio de Bachilleres Plantel 1 "El Rosario"', 'COBACH 1', 'https://www.cbachilleres.edu.mx'),
      school('Escuela Superior de Física y Matemáticas (IPN)', 'ESFM-IPN', 'https://www.esfm.ipn.mx'),
      school('Centro de Estudios Científicos y Tecnológicos No. 1 (IPN)', 'CECyT 1', 'https://www.cecyt1.ipn.mx'),
    ],
    'universidades-publicas': [
      school('Universidad Nacional Autónoma de México', 'UNAM', 'https://www.unam.mx'),
      school('Instituto Politécnico Nacional', 'IPN', 'https://www.ipn.mx'),
      school('Universidad Autónoma Metropolitana Iztapalapa', 'UAM-I', 'https://www.izt.uam.mx'),
      school('Universidad Autónoma de la Ciudad de México', 'UACM', 'https://www.uacm.edu.mx'),
      school('Escuela Normal Superior de México', 'ENS México', 'https://www.ensmexico.sep.gob.mx'),
    ],
    'universidades-privadas': [
      school('Tecnológico de Monterrey Campus CDMX', 'Tec CDMX', 'https://tec.mx'),
      school('Universidad Iberoamericana Ciudad de México', 'IBERO', 'https://www.ibero.mx'),
      school('Universidad Anáhuac México Norte', 'Anáhuac Norte', 'https://www.anahuac.mx'),
      school('Universidad La Salle Benjamín Franklin', 'La Salle', 'https://www.ulsa.edu.mx'),
      school('Universidad del Valle de México Campus Lomas Verdes', 'UVM', 'https://www.uvm.mx'),
    ],
    'centros-investigacion': [
      school('CINVESTAV Unidad Zacatenco', 'CINVESTAV', 'https://www.cinvestav.mx'),
      school('Instituto Nacional de Astrofísica, Óptica y Electrónica (sede Tonantzintla)', 'INAOE', 'https://www.inaoep.mx'),
      school('Instituto de Física UNAM', 'IF-UNAM', 'https://www.fisica.unam.mx'),
      school('Instituto de Matemáticas UNAM', 'IMATE-UNAM', 'https://www.matem.unam.mx'),
      school('Instituto de Biotecnología UNAM', 'IBt-UNAM', 'https://www.ibt.unam.mx'),
    ],
  },
  'Jalisco': {
    'bachilleratos-publicos': [
      school('Preparatoria 2 de la UdeG', 'Prepa 2', 'https://www.prepa2.udg.mx'),
      school('Preparatoria 5 de la UdeG', 'Prepa 5', 'https://www.prepa5.udg.mx'),
      school('Bachillerato General del Estado de Jalisco', 'BGE Jalisco', 'https://www.jalisco.gob.mx'),
      school('CONALEP Jalisco Plantel Guadalajara', 'CONALEP GDL', 'https://www.conalep.jalisco.gob.mx'),
      school('Escuela Preparatoria de Jalisco', 'Prepa Jalisco', 'https://www.jalisco.gob.mx'),
    ],
    'universidades-publicas': [
      school('Universidad de Guadalajara', 'UdeG', 'https://www.udg.mx'),
      school('Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)', 'CUCEI', 'https://www.cucei.udg.mx'),
      school('Centro Universitario de Ciencias Biológicas y Agropecuarias (CUCBA)', 'CUCBA', 'https://www.cucba.udg.mx'),
      school('Universidad Autónoma de Guadalajara', 'UAG', 'https://www.uag.mx'),
      school('Instituto Tecnológico Superior de Zapopan', 'ITSZ', 'https://www.itszapopan.edu.mx'),
    ],
    'universidades-privadas': [
      school('Tecnológico de Monterrey Campus Guadalajara', 'Tec GDL', 'https://tec.mx'),
      school('Universidad Autónoma de Guadalajara', 'UAG', 'https://www.uag.mx'),
      school('Universidad del Valle de Atemajac', 'UNIVA', 'https://www.univa.mx'),
      school('ITESO Universidad Jesuita de Guadalajara', 'ITESO', 'https://www.iteso.mx'),
      school('Universidad Panamericana Campus Guadalajara', 'UP GDL', 'https://www.up.edu.mx'),
    ],
    'institutos-tecnologicos': [
      school('Instituto Tecnológico de Zapopan (TecNM)', 'ITZ', 'https://www.zapopan.tecnm.mx'),
      school('Instituto Tecnológico de Tlajomulco (TecNM)', 'ITT', 'https://www.tlajomulco.tecnm.mx'),
      school('Universidad Politécnica de Jalisco', 'UPJ', 'https://www.upj.edu.mx'),
      school('Universidad Tecnológica de Jalisco', 'UTJ', 'https://www.utj.edu.mx'),
      school('Instituto Tecnológico Superior de Zapopan', 'ITSZ', 'https://www.itszapopan.edu.mx'),
    ],
  },
  'Querétaro': {
    'bachilleratos-publicos': [
      school('Preparatoria de la UAQ Plantel Norte', 'Prepa UAQ Norte', 'https://www.uaq.mx'),
      school('COBACH Querétaro Plantel 1', 'COBACH QRO', 'https://www.queretaro.gob.mx'),
      school('CONALEP Querétaro Plantel 1', 'CONALEP QRO', 'https://www.conalep.edu.mx'),
      school('Bachillerato Tecnológico del Estado de Querétaro', 'BTEQ', 'https://www.queretaro.gob.mx'),
      school('Escuela Preparatoria Oficial "Andrés Molina Enríquez"', 'Prepa AME', 'https://www.queretaro.gob.mx'),
    ],
    'universidades-publicas': [
      school('Universidad Autónoma de Querétaro', 'UAQ', 'https://www.uaq.mx'),
      school('Universidad Politécnica de Querétaro', 'UPQ', 'https://www.upq.edu.mx'),
      school('Universidad Tecnológica de Querétaro', 'UTQ', 'https://www.utq.edu.mx'),
      school('Instituto Tecnológico de Querétaro (TecNM)', 'ITQ', 'https://www.itq.edu.mx'),
      school('Centro de Ingeniería y Desarrollo Industrial (CIDESI)', 'CIDESI', 'https://www.cidesi.mx'),
    ],
    'universidades-privadas': [
      school('Tecnológico de Monterrey Campus Querétaro', 'Tec QRO', 'https://tec.mx'),
      school('Universidad Anáhuac Querétaro', 'Anáhuac QRO', 'https://www.anahuac.mx/queretaro'),
      school('Universidad del Valle de México Campus Querétaro', 'UVM QRO', 'https://www.uvm.mx'),
      school('Universidad Contemporánea de las Américas', 'UNICO', 'https://www.unico.edu.mx'),
      school('Instituto de Estudios Superiores de Monterrey (Campus QRO)', 'IESM QRO', 'https://tec.mx'),
    ],
    'institutos-tecnologicos': [
      school('Instituto Tecnológico de Querétaro (TecNM)', 'ITQ', 'https://www.itq.edu.mx'),
      school('Universidad Politécnica de Querétaro', 'UPQ', 'https://www.upq.edu.mx'),
      school('Universidad Tecnológica de Querétaro', 'UTQ', 'https://www.utq.edu.mx'),
      school('Instituto Tecnológico de San Juan del Río (TecNM)', 'ITSJR', 'https://www.sanjuandelrio.tecnm.mx'),
      school('Universidad Tecnológica de San Juan del Río', 'UTSJdR', 'https://www.utsjdr.edu.mx'),
    ],
  },
  'Nuevo León': {
    'bachilleratos-publicos': [
      school('Preparatoria 1 de la UANL', 'Prepa 1 UANL', 'https://www.uanl.mx'),
      school('Preparatoria 3 de la UANL', 'Prepa 3 UANL', 'https://www.uanl.mx'),
      school('Preparatoria 7 de la UANL', 'Prepa 7 UANL', 'https://www.uanl.mx'),
      school('COBACH Nuevo León', 'COBACH NL', 'https://www.nl.gob.mx'),
      school('CONALEP Nuevo León Plantel Monterrey', 'CONALEP MTY', 'https://www.conalep.edu.mx'),
    ],
    'universidades-publicas': [
      school('Universidad Autónoma de Nuevo León', 'UANL', 'https://www.uanl.mx'),
      school('Facultad de Ingeniería Mecánica y Eléctrica (UANL)', 'FIME-UANL', 'https://www.fime.uanl.mx'),
      school('Facultad de Ciencias Físico Matemáticas (UANL)', 'FCFM-UANL', 'https://www.fcfm.uanl.mx'),
      school('Universidad Autónoma de Nuevo León Facultad de Ciencias Químicas', 'FCQ-UANL', 'https://www.fcq.uanl.mx'),
      school('Instituto Tecnológico de Nuevo Laredo (TecNM)', 'ITNL', 'https://www.nuevolaredo.tecnm.mx'),
    ],
    'universidades-privadas': [
      school('Tecnológico de Monterrey Campus Monterrey', 'Tec MTY', 'https://tec.mx'),
      school('Universidad de Monterrey', 'UDEM', 'https://www.udem.edu.mx'),
      school('Universidad Regiomontana', 'UR', 'https://www.ur.mx'),
      school('Universidad del Norte de México', 'UNEM', 'https://www.unem.edu.mx'),
      school('Centro de Estudios Universitarios de Monterrey', 'CEUM', 'https://www.ceum.edu.mx'),
    ],
  },
  'Yucatán': {
    'bachilleratos-publicos': [
      school('Preparatoria Uno de la UADY', 'Prepa 1 UADY', 'https://www.uady.mx'),
      school('Preparatoria Dos de la UADY', 'Prepa 2 UADY', 'https://www.uady.mx'),
      school('COBACH Yucatán Plantel Mérida', 'COBACH YUC', 'https://www.yucatan.gob.mx'),
      school('CONALEP Yucatán Plantel Mérida I', 'CONALEP YUC', 'https://www.conalep.edu.mx'),
      school('Bachillerato Tecnológico Agropecuario de Yucatán', 'BTA YUC', 'https://www.yucatan.gob.mx'),
    ],
    'universidades-publicas': [
      school('Universidad Autónoma de Yucatán', 'UADY', 'https://www.uady.mx'),
      school('Facultad de Ingeniería de la UADY', 'FI-UADY', 'https://www.ingenieria.uady.mx'),
      school('Facultad de Matemáticas de la UADY', 'FMAT-UADY', 'https://www.matematicas.uady.mx'),
      school('Universidad Tecnológica del Poniente', 'UTP', 'https://www.utponiente.edu.mx'),
      school('Instituto Tecnológico de Mérida (TecNM)', 'ITM', 'https://www.merida.tecnm.mx'),
    ],
    'universidades-privadas': [
      school('Universidad Marista de Mérida', 'Marista', 'https://www.marista.edu.mx'),
      school('Universidad Modelo', 'Modelo', 'https://www.modelo.edu.mx'),
      school('Universidad Mesoamericana de San Agustín', 'UMSA', 'https://www.umsa.edu.mx'),
      school('Tecnológico de Monterrey Campus Mérida', 'Tec Mérida', 'https://tec.mx'),
      school('Universidad Vizcaya de las Américas Mérida', 'Vizcaya', 'https://www.univizcaya.edu.mx'),
    ],
  },
};

const LABEL_TO_KEY: Record<string, InstitutionCategoryKey> = {
  'Bachilleratos públicos': 'bachilleratos-publicos',
  'Bachilleratos privados': 'bachilleratos-privados',
  'CECyT y CETis': 'cecyt-cetis',
  'Universidades públicas': 'universidades-publicas',
  'Universidades privadas': 'universidades-privadas',
  'Institutos tecnológicos': 'institutos-tecnologicos',
  'Centros de investigación': 'centros-investigacion',
  'Centros públicos': 'centros-publicos',
  'Universidades estatales': 'universidades-estatales',
  'Programa Delfín': 'programa-delfin',
  'Universidades': 'universidades',
  'Sector tecnológico': 'sector-tecnologico',
};

export function resolveCategoryKey(label: string): InstitutionCategoryKey | null {
  return LABEL_TO_KEY[label] ?? null;
}

export function getSchoolExamples(label: string, stateName?: string): SchoolExample[] {
  const key = resolveCategoryKey(label);
  if (!key) return [];
  if (stateName && STATE_SCHOOLS[stateName]?.[key]) {
    return STATE_SCHOOLS[stateName][key] as SchoolExample[];
  }
  return NATIONAL_SCHOOLS[key] ?? [];
}
