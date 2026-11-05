# SHE-STEM MX 🇲🇽👩‍💻

> **Empowering Mexican Women from Undergrad to PhD in STEM.**  
> Plataforma web interactiva orientada a guiar, conectar y empoderar a estudiantes e investigadoras mexicanas en las áreas de Ciencia, Tecnología, Ingeniería y Matemáticas.

## Enlace al Sitio Web
 **Demo en vivo:** [https://she-stem-mx-web-app-dbgn.bolt.host](https://she-stem-mx-web-app-dbgn.bolt.host)

##  Acerca del Proyecto
**SHE-STEM MX** es un ecosistema digital diseñado para resolver la dispersión de información sobre becas, convocatorias y oportunidades académicas en México. A través de herramientas impulsadas por inteligencia artificial simulada e interfaces dinámicas, la plataforma acompaña la trayectoria de las mujeres desde la educación media superior hasta estudios de posgrado.
### Acrónimo de la marca
* **S**cience
* **H**igher Education
* **E**ngineering  
* **STEM** (Space, Tech, Electronics, Math)  
* **MX** (Mexican eXcellence)

## Módulos y Funcionalidades Principales
1. **Header & Hero Section (Filtro Inteligente):** Buscador y generador de rutas académicas configurables por estado de la República Mexicana, nivel educativo y área STEM de interés.
2. **Módulo 1 · STEM-Match MX:** Generador interactivo de rutas profesionales paso a paso que muestra materias clave, lenguajes/herramientas técnicas (VHDL, C++, Python, PCBs) e instituciones educativas.
3. **Módulo 2 · EllaIngenia:** Mapa visual y directorio semántico de mentoras y referentes mexicanas en áreas STEM con búsqueda en lenguaje natural.
4. **Módulo 3 · STEM-Finder:** Agregador nacional de becas, hackathons y veranos de investigación organizados con resúmenes de tres puntos (requisitos, fechas y beneficios).
5. **Módulo 4 · STEM-Bot Pro:** Evaluador y auditor técnico de proyectos de ingeniería (mecatrónica, software y electrónica) que ofrece diagnósticos de viabilidad, sugerencias de componentes y convocatorias recomendadas.

##  Herramientas y Tecnologías Utilizadas

* **Generación e Ideación:** Bolt.new (Asistente de desarrollo acelerado e inteligencia artificial).
* **Frontend Framework:** [React.js](https://react.dev/)
* **Estilos y UI:** [Tailwind CSS](https://tailwindcss.com/) (Paleta de colores pastel personalizados y diseño responsive).
* **Tipografías (Google Fonts):** *Playfair Display*, *Quicksand*, *Inconsolata* y *Tangerine*.
* **Iconografía:** [Lucide React](https://lucide.dev/)
* **Control de Versiones y Hosting:** GitHub / Git.

## Prompts Utilizados para el Desarrollo

El proyecto fue estructurado y desarrollado a partir de la siguiente instrucción principal (*System Prompt / Master Prompt*):

<details>
<summary><b>Haz clic aquí para desplegar el Prompt Principal de la aplicación</b></summary>

```text
Actúa como un Senior Full-Stack Engineer y Lead UI/UX Designer. Construye una aplicación web interactiva, moderna y completamente funcional llamada "SHE-STEM MX", replicando fielmente la estructura visual, colores y distribución de la imagen adjunta.

1. ESTÉTICA VISUAL & ESTILOS (Tailwind CSS + Google Fonts)
- Fondo General: Blanco puro (#FFFFFF) para una apariencia extremadamente limpia y minimalista.
- Paleta Pastel Exacta (Usar en tarjetas, botones, insignias, bordes y acentos):
  - #fbf8cc (Amarillo claro)
  - #fde4cf (Durazno)
  - #ffcfd2 (Rosa suave)
  - #f1c0e8 (Orquídea)
  - #cfbaf0 (Lila)
  - #a3c4f3 (Azul cielo)
  - #90dbf4 (Cian claro)
  - #8eecf5 (Turquesa)
  - #98f5e1 (Menta)
  - #b9fbc0 (Verde menta)
- Tipografías (Importar vía Google Fonts):
  - Títulos principales y marca: 'Playfair Display' o 'DM Serif Display'.
  - Detalles especiales / acentos: 'Tangerine' / 'Limelight' / 'Englebert'.
  - Cuerpo de texto y controles UI: 'Quicksand'.
  - Módulos de código, datos e interfaz técnica de IA: 'Inconsolata'.
- Sombras y Bordes: Bordes redondeados modernos (rounded-2xl / rounded-3xl), sombras suaves (shadow-sm, shadow-md con opacidad baja) e íconos minimalistas (Lucide React: circuitos, microscopio, código, mapa, estrellas).

2. ARQUITECTURA DE LA LANDING PAGE & FUNCIONALIDADES INTERACTIVAS
Crea la página dividida en las siguientes secciones secuenciales e interactivas:

A. HEADER Y HERO SECTION
- Logo destacado: "SHE-STEM MX"
- Acrónimo explicativo en tooltip/banner: S (Science), H (Higher Education), E (Engineering) - STEM (Space, Tech, Electronics, Math) - MX (Mexican eXcellence).
- Eslogan principal: "Empowering Mexican Women from Undergrad to PhD in STEM."
- Subtítulo: "Empoderando a las mujeres mexicanas desde la licenciatura hasta el doctorado en STEM."
- Formulario / Filtro Interactivo Inteligente: Select 1 (Estado de México), Select 2 (Nivel Educativo), Select 3 (Área STEM) y Botón "Generar mi Ruta con IA".

B. MÓDULO 1: "STEM-Match MX" (Generador de Rutas Profesionales con IA)
- Componente interactivo tipo Chatbot / Recomendador de rutas.
- Muestra una línea de tiempo horizontal interactiva con pasos desde Preparatoria/Licenciatura hasta Maestría y Doctorado en México (IPN, UNAM, CINVESTAV, TecNM).
- Muestra dinámicamente: Materias clave, Lenguajes y herramientas (C++, VHDL, PCBs, Python) y Becas recomendadas (CONAHCYT, Programa Delfín).

C. MÓDULO 2: "EllaIngenia" (Visualizador de Mentoras y Role Models Mexicanas)
- Visualización de un mapa conceptual/interactivo de México con pines pastel.
- Buscador semántico por IA para consultas en lenguaje natural.
- Galería de tarjetas (Cards) flotantes con perfiles de ingenieras y científicas mexicanas.

D. MÓDULO 3: "STEM-Finder" (Hub Nacional de Convocatorias & Becas)
- Agregador inteligente de becas y oportunidades (Veranos científicos, Hackathons, Becas de Posgrado CONAHCYT).
- Filtros rápidos por nivel y tarjetas resumidas en 3 viñetas breves (fecha límite, requisitos y monto/beneficio).

E. MÓDULO 4: "STEM-Bot Pro" (Evaluador de Proyectos y Feedback Técnico)
- Interfaz interactiva de auditoría técnica para proyectos de ingeniería.
- Área de Dropzone e Input para descripción del proyecto.
- Generación de informe simulado en formato 'Inconsolata' (diagnóstico, componentes recomendados y convocatorias para aplicar).

3. REQUISITOS TÉCNICOS 
- Usa React + Tailwind CSS.
- Todo el estado debe ser totalmente dinámico y responder al clic del usuario.
- El sitio debe ser 100% responsivo y mantenerse extremadamente visual, fresco y profesional.
