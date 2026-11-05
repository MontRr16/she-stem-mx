/*
# Create SHE-STEM MX catalog

1. Purpose
- Creates the public catalog that powers the professional route and STEM-Finder modules.
- Replaces hard-coded area labels, institutions and opportunity metadata with normalized records.

2. New tables
- `stem_areas`: the four STEM macro-areas.
- `stem_careers`: careers and postgraduate lines belonging to a macro-area.
- `education_levels`: route levels used by the timeline and program filters.
- `regions`: Mexican state and municipality combinations.
- `institutions`: public, private and research institutions with official domains.
- `institution_campuses`: campus locations associated with a region.
- `program_offerings`: the relationship between area, career, level, institution, campus and region.
- `opportunities`: scholarships and calls with official and application URLs.
- `opportunity_areas`: many-to-many relationship between opportunities and STEM areas.
- `opportunity_levels`: many-to-many relationship between opportunities and education levels.

3. Security
- Every table has Row Level Security enabled.
- The public browser can only SELECT catalog rows as `anon` or `authenticated`.
- No public INSERT, UPDATE or DELETE privileges are granted.
- Catalog writes must be performed through a controlled administrative process or server-side function.

4. Important notes
- URLs are stored with verification status and last verification timestamp.
- `program_offerings` supports both public and private institutions and multiple campuses per institution.
- This migration inserts a small verified starter catalog; the schema is designed for later expansion without changing the frontend contract.
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.stem_areas (
  id text PRIMARY KEY,
  name_es text NOT NULL,
  name_en text NOT NULL,
  description text NOT NULL,
  color_token text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.stem_careers (
  id text PRIMARY KEY,
  area_id text NOT NULL REFERENCES public.stem_areas(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text NOT NULL,
  aliases text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (area_id, name)
);

CREATE TABLE IF NOT EXISTS public.education_levels (
  id text PRIMARY KEY,
  name text NOT NULL UNIQUE,
  route_step integer NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.regions (
  id text PRIMARY KEY,
  state_code text NOT NULL,
  state_name text NOT NULL,
  municipality_code text,
  municipality_name text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  UNIQUE (state_code, municipality_code)
);

CREATE TABLE IF NOT EXISTS public.institutions (
  id text PRIMARY KEY,
  name text NOT NULL,
  short_name text,
  institution_type text NOT NULL CHECK (institution_type IN ('publica', 'privada', 'centro-investigacion', 'tecnologico', 'universidad-intercultural', 'universidad-tecnologica', 'universidad-politecnica')),
  official_url text NOT NULL,
  official_domain text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_verified_at timestamptz,
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.institution_campuses (
  id text PRIMARY KEY,
  institution_id text NOT NULL REFERENCES public.institutions(id) ON DELETE RESTRICT,
  region_id text NOT NULL REFERENCES public.regions(id) ON DELETE RESTRICT,
  campus_name text NOT NULL,
  official_url text NOT NULL,
  latitude numeric(9,6),
  longitude numeric(9,6),
  is_active boolean NOT NULL DEFAULT true,
  UNIQUE (institution_id, campus_name)
);

CREATE TABLE IF NOT EXISTS public.program_offerings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id text NOT NULL REFERENCES public.stem_careers(id) ON DELETE RESTRICT,
  level_id text NOT NULL REFERENCES public.education_levels(id) ON DELETE RESTRICT,
  institution_id text NOT NULL REFERENCES public.institutions(id) ON DELETE RESTRICT,
  campus_id text NOT NULL REFERENCES public.institution_campuses(id) ON DELETE RESTRICT,
  region_id text NOT NULL REFERENCES public.regions(id) ON DELETE RESTRICT,
  program_name text NOT NULL,
  modality text NOT NULL CHECK (modality IN ('escolarizada', 'en-linea', 'mixta', 'ejecutiva')),
  duration_years numeric(4,1),
  official_program_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_verified_at timestamptz,
  UNIQUE (career_id, level_id, campus_id, program_name)
);

CREATE TABLE IF NOT EXISTS public.opportunities (
  id text PRIMARY KEY,
  title text NOT NULL,
  organizer text NOT NULL,
  category text NOT NULL CHECK (category IN ('beca', 'verano', 'hackathon', 'concurso')),
  deadline date,
  requirements text[] NOT NULL DEFAULT '{}',
  benefit text NOT NULL,
  official_url text NOT NULL,
  application_url text,
  official_domain text NOT NULL,
  link_status text NOT NULL DEFAULT 'verified' CHECK (link_status IN ('verified', 'broken', 'pending')),
  last_verified_at timestamptz,
  status text NOT NULL DEFAULT 'por_confirmar' CHECK (status IN ('abierta', 'proxima', 'cerrada', 'por_confirmar')),
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.opportunity_areas (
  opportunity_id text NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  area_id text NOT NULL REFERENCES public.stem_areas(id) ON DELETE CASCADE,
  PRIMARY KEY (opportunity_id, area_id)
);

CREATE TABLE IF NOT EXISTS public.opportunity_levels (
  opportunity_id text NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  level_id text NOT NULL REFERENCES public.education_levels(id) ON DELETE CASCADE,
  PRIMARY KEY (opportunity_id, level_id)
);

CREATE INDEX IF NOT EXISTS stem_careers_area_idx ON public.stem_careers(area_id, is_active, sort_order);
CREATE INDEX IF NOT EXISTS regions_state_municipality_idx ON public.regions(state_code, municipality_code);
CREATE INDEX IF NOT EXISTS campuses_region_idx ON public.institution_campuses(region_id, is_active);
CREATE INDEX IF NOT EXISTS offerings_filter_idx ON public.program_offerings(career_id, level_id, region_id, is_active);
CREATE INDEX IF NOT EXISTS opportunities_status_deadline_idx ON public.opportunities(status, deadline, is_published);

INSERT INTO public.stem_areas (id, name_es, name_en, description, color_token, sort_order)
VALUES
  ('science', 'Ciencia', 'Science', 'Explora la materia, la vida, el planeta y los fenómenos que explican nuestro mundo.', 'pastel-yellow', 1),
  ('technology', 'Tecnología', 'Technology', 'Construye herramientas digitales y sistemas que conectan personas, datos y conocimiento.', 'pastel-cyan', 2),
  ('engineering', 'Ingeniería', 'Engineering', 'Diseña soluciones técnicas para resolver problemas sociales, industriales y ambientales.', 'pastel-peach', 3),
  ('mathematics', 'Matemáticas', 'Mathematics', 'Convierte patrones, modelos y datos en decisiones y descubrimientos.', 'pastel-lilac', 4)
ON CONFLICT (id) DO UPDATE SET name_es = EXCLUDED.name_es, name_en = EXCLUDED.name_en, description = EXCLUDED.description, color_token = EXCLUDED.color_token, sort_order = EXCLUDED.sort_order;

INSERT INTO public.stem_careers (id, area_id, name, description, aliases, sort_order)
VALUES
  ('biology', 'science', 'Biología', 'Estudia los seres vivos y sus sistemas.', ARRAY['Biología molecular', 'Ecología'], 1),
  ('chemistry', 'science', 'Química', 'Analiza la composición y transformación de la materia.', ARRAY['Química aplicada'], 2),
  ('physics', 'science', 'Física', 'Modela las leyes fundamentales de la naturaleza.', ARRAY['Física aplicada'], 3),
  ('biotechnology', 'science', 'Biotecnología', 'Usa organismos y procesos biológicos para crear soluciones.', ARRAY['Bioinformática'], 4),
  ('computer-science', 'technology', 'Ciencias de la Computación', 'Diseña algoritmos, software y sistemas computacionales.', ARRAY['Computación', 'Informática'], 1),
  ('artificial-intelligence', 'technology', 'Inteligencia Artificial', 'Desarrolla sistemas que aprenden de datos y patrones.', ARRAY['IA', 'Machine learning'], 2),
  ('data-science', 'technology', 'Ciencia de Datos', 'Transforma datos en modelos, visualizaciones y decisiones.', ARRAY['Datos', 'Analítica'], 3),
  ('cybersecurity', 'technology', 'Ciberseguridad', 'Protege sistemas, redes e información digital.', ARRAY['Seguridad informática'], 4),
  ('electronic-engineering', 'engineering', 'Ingeniería Electrónica', 'Diseña circuitos, sensores y sistemas electrónicos.', ARRAY['Electrónica'], 1),
  ('mechatronics-engineering', 'engineering', 'Ingeniería Mecatrónica', 'Integra mecánica, electrónica, control y software.', ARRAY['Mecatrónica', 'Automatización'], 2),
  ('robotics-engineering', 'engineering', 'Ingeniería Robótica', 'Construye robots autónomos y sistemas de control.', ARRAY['Robótica'], 3),
  ('environmental-engineering', 'engineering', 'Ingeniería Ambiental', 'Resuelve retos de agua, energía, residuos y clima.', ARRAY['Ambiental'], 4),
  ('mathematics', 'mathematics', 'Matemáticas', 'Investiga estructuras, patrones y fundamentos lógicos.', ARRAY['Matemática pura'], 1),
  ('applied-mathematics', 'mathematics', 'Matemáticas Aplicadas', 'Usa modelos matemáticos para resolver problemas reales.', ARRAY['Modelación'], 2),
  ('statistics', 'mathematics', 'Estadística', 'Analiza incertidumbre, datos y evidencia.', ARRAY['Estadística aplicada'], 3),
  ('actuarial-science', 'mathematics', 'Actuaría', 'Modela riesgos financieros, sociales y operativos.', ARRAY['Ciencias actuariales'], 4)
ON CONFLICT (id) DO UPDATE SET area_id = EXCLUDED.area_id, name = EXCLUDED.name, description = EXCLUDED.description, aliases = EXCLUDED.aliases, sort_order = EXCLUDED.sort_order;

INSERT INTO public.education_levels (id, name, route_step, sort_order)
VALUES
  ('preparatoria', 'Preparatoria', 1, 1),
  ('licenciatura', 'Licenciatura / Ingeniería', 2, 2),
  ('maestria', 'Maestría', 4, 3),
  ('doctorado', 'Doctorado', 5, 4)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, route_step = EXCLUDED.route_step, sort_order = EXCLUDED.sort_order;

INSERT INTO public.regions (id, state_code, state_name, municipality_code, municipality_name, latitude, longitude)
VALUES
  ('mx-cdmx-cuauhtemoc', 'CDMX', 'Ciudad de México', 'CUA', 'Cuauhtémoc', 19.432608, -99.133209),
  ('mx-jalisco-guadalajara', 'JAL', 'Jalisco', 'GDL', 'Guadalajara', 20.676667, -103.347500),
  ('mx-jalisco-zapopan', 'JAL', 'Jalisco', 'ZAP', 'Zapopan', 20.716667, -103.400000),
  ('mx-queretaro-queretaro', 'QRO', 'Querétaro', 'QRO', 'Querétaro', 20.588793, -100.389889),
  ('mx-nuevo-leon-monterrey', 'NL', 'Nuevo León', 'MTY', 'Monterrey', 25.686614, -100.316113),
  ('mx-yucatan-merida', 'YUC', 'Yucatán', 'MER', 'Mérida', 20.967370, -89.592586)
ON CONFLICT (id) DO UPDATE SET state_name = EXCLUDED.state_name, municipality_name = EXCLUDED.municipality_name, latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude;

INSERT INTO public.institutions (id, name, short_name, institution_type, official_url, official_domain, last_verified_at)
VALUES
  ('unam', 'Universidad Nacional Autónoma de México', 'UNAM', 'publica', 'https://www.unam.mx', 'unam.mx', now()),
  ('ipn', 'Instituto Politécnico Nacional', 'IPN', 'publica', 'https://www.ipn.mx', 'ipn.mx', now()),
  ('udg', 'Universidad de Guadalajara', 'UdeG', 'publica', 'https://www.udg.mx', 'udg.mx', now()),
  ('uaq', 'Universidad Autónoma de Querétaro', 'UAQ', 'publica', 'https://www.uaq.mx', 'uaq.mx', now()),
  ('uanl', 'Universidad Autónoma de Nuevo León', 'UANL', 'publica', 'https://www.uanl.mx', 'uanl.mx', now()),
  ('uady', 'Universidad Autónoma de Yucatán', 'UADY', 'publica', 'https://www.uady.mx', 'uady.mx', now()),
  ('itesm', 'Tecnológico de Monterrey', 'Tec de Monterrey', 'privada', 'https://tec.mx', 'tec.mx', now()),
  ('ibero', 'Universidad Iberoamericana', 'IBERO', 'privada', 'https://www.ibero.mx', 'ibero.mx', now())
ON CONFLICT (id) DO UPDATE SET official_url = EXCLUDED.official_url, official_domain = EXCLUDED.official_domain, last_verified_at = EXCLUDED.last_verified_at;

INSERT INTO public.institution_campuses (id, institution_id, region_id, campus_name, official_url)
VALUES
  ('unam-cu', 'unam', 'mx-cdmx-cuauhtemoc', 'Ciudad Universitaria', 'https://www.unam.mx'),
  ('ipn-zacatenco', 'ipn', 'mx-cdmx-cuauhtemoc', 'Zacatenco', 'https://www.ipn.mx'),
  ('udg-cucei', 'udg', 'mx-jalisco-zapopan', 'CUCEI', 'https://www.cucei.udg.mx'),
  ('uaq-campus', 'uaq', 'mx-queretaro-queretaro', 'Campus Centro Universitario', 'https://www.uaq.mx'),
  ('uanl-ciudad-universitaria', 'uanl', 'mx-nuevo-leon-monterrey', 'Ciudad Universitaria', 'https://www.uanl.mx'),
  ('uady-merida', 'uady', 'mx-yucatan-merida', 'Campus de Ciencias Exactas e Ingenierías', 'https://www.uady.mx'),
  ('itesm-monterrey', 'itesm', 'mx-nuevo-leon-monterrey', 'Campus Monterrey', 'https://tec.mx'),
  ('ibero-cdmx', 'ibero', 'mx-cdmx-cuauhtemoc', 'Campus Ciudad de México', 'https://www.ibero.mx')
ON CONFLICT (id) DO UPDATE SET official_url = EXCLUDED.official_url;

INSERT INTO public.program_offerings (career_id, level_id, institution_id, campus_id, region_id, program_name, modality, duration_years, official_program_url, last_verified_at)
VALUES
  ('computer-science', 'licenciatura', 'unam', 'unam-cu', 'mx-cdmx-cuauhtemoc', 'Licenciatura en Ciencias de la Computación', 'escolarizada', 4.0, 'https://www.fciencias.unam.mx/estudiar-en-la-fc/licenciaturas/ciencias-de-la-computacion', now()),
  ('electronic-engineering', 'licenciatura', 'ipn', 'ipn-zacatenco', 'mx-cdmx-cuauhtemoc', 'Ingeniería en Comunicaciones y Electrónica', 'escolarizada', 4.5, 'https://www.esimez.ipn.mx', now()),
  ('computer-science', 'licenciatura', 'udg', 'udg-cucei', 'mx-jalisco-zapopan', 'Ingeniería en Computación', 'escolarizada', 4.5, 'https://www.cucei.udg.mx', now()),
  ('mechatronics-engineering', 'licenciatura', 'uaq', 'uaq-campus', 'mx-queretaro-queretaro', 'Ingeniería en Automatización', 'escolarizada', 4.5, 'https://www.ingenieria.uaq.mx', now()),
  ('artificial-intelligence', 'licenciatura', 'itesm', 'itesm-monterrey', 'mx-nuevo-leon-monterrey', 'Ingeniería en Tecnologías Computacionales', 'escolarizada', 4.0, 'https://tec.mx/es/ingenieria-y-ciencias', now()),
  ('biotechnology', 'licenciatura', 'uady', 'uady-merida', 'mx-yucatan-merida', 'Licenciatura en Ingeniería en Biotecnología', 'escolarizada', 4.5, 'https://www.uady.mx', now()),
  ('data-science', 'maestria', 'unam', 'unam-cu', 'mx-cdmx-cuauhtemoc', 'Posgrado en Ciencia e Ingeniería de la Computación', 'escolarizada', 2.0, 'https://www.posgrado.unam.mx', now()),
  ('robotics-engineering', 'doctorado', 'ipn', 'ipn-zacatenco', 'mx-cdmx-cuauhtemoc', 'Doctorado en Ingeniería de Sistemas Robóticos y Mecatrónicos', 'escolarizada', 4.0, 'https://www.ipn.mx/posgrado', now())
ON CONFLICT (career_id, level_id, campus_id, program_name) DO UPDATE SET official_program_url = EXCLUDED.official_program_url, last_verified_at = EXCLUDED.last_verified_at;

INSERT INTO public.opportunities (id, title, organizer, category, deadline, requirements, benefit, official_url, application_url, official_domain, link_status, last_verified_at, status)
VALUES
  ('becas-nacionales-posgrado', 'Becas Nacionales de Posgrado', 'SECIHTI / CONAHCYT', 'beca', NULL, ARRAY['Admisión o inscripción en un programa de posgrado elegible.', 'Cumplir los requisitos de la convocatoria vigente.'], 'Apoyo económico de acuerdo con las reglas vigentes del programa.', 'https://conahcyt.mx/becas_posgrados/becas-nacionales', 'https://conahcyt.mx/servicios-en-linea', 'conahcyt.mx', 'verified', now(), 'por_confirmar'),
  ('programa-delfin', 'Programa Delfín', 'Programa Delfín', 'verano', NULL, ARRAY['Ser estudiante de licenciatura.', 'Presentar propuesta y documentación solicitada por la convocatoria.'], 'Estancia de investigación y apoyo conforme a la convocatoria vigente.', 'https://programadelfin.org.mx', 'https://programadelfin.org.mx/sitio/estudiantes-verano-convocatoria2026.php', 'programadelfin.org.mx', 'verified', now(), 'por_confirmar'),
  ('innovatecnm', 'InnovaTecNM', 'Tecnológico Nacional de México', 'concurso', NULL, ARRAY['Participar con un equipo y un prototipo o proyecto conforme a las bases.'], 'Participación en etapas regional y nacional, mentoría y exposición del proyecto.', 'https://innova.tecnm.mx', 'https://innova.tecnm.mx', 'innova.tecnm.mx', 'verified', now(), 'por_confirmar')
ON CONFLICT (id) DO UPDATE SET official_url = EXCLUDED.official_url, application_url = EXCLUDED.application_url, link_status = EXCLUDED.link_status, last_verified_at = EXCLUDED.last_verified_at;

INSERT INTO public.opportunity_areas (opportunity_id, area_id)
SELECT 'becas-nacionales-posgrado', id FROM public.stem_areas WHERE id IN ('science', 'technology', 'engineering', 'mathematics')
ON CONFLICT DO NOTHING;
INSERT INTO public.opportunity_areas (opportunity_id, area_id)
SELECT 'programa-delfin', id FROM public.stem_areas WHERE id IN ('science', 'technology', 'engineering', 'mathematics')
ON CONFLICT DO NOTHING;
INSERT INTO public.opportunity_areas (opportunity_id, area_id)
SELECT 'innovatecnm', id FROM public.stem_areas WHERE id IN ('technology', 'engineering')
ON CONFLICT DO NOTHING;

INSERT INTO public.opportunity_levels (opportunity_id, level_id)
VALUES
  ('becas-nacionales-posgrado', 'maestria'),
  ('becas-nacionales-posgrado', 'doctorado'),
  ('programa-delfin', 'licenciatura'),
  ('innovatecnm', 'licenciatura'),
  ('innovatecnm', 'maestria')
ON CONFLICT DO NOTHING;

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['stem_areas','stem_careers','education_levels','regions','institutions','institution_campuses','program_offerings','opportunities','opportunity_areas','opportunity_levels']
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "public_catalog_select" ON public.%I', table_name);
    EXECUTE format('CREATE POLICY "public_catalog_select" ON public.%I FOR SELECT TO anon, authenticated USING (true)', table_name);
  END LOOP;
END $$;
