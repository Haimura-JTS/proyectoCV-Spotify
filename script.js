const CLAVE_ALMACENAMIENTO = "spotifyCvProfiles.v3.demo";
const ID_USUARIO = "usuario_demo";
const PISTA_AUDIO = "assets/sound/artmylife-powerful-dramatic-trailer-514242.mp3";

//datos artificiales, etc

const perfilesPorDefecto = [
  crearSemillaPerfil({
    id: "boss",
    name: "boss",
    imagen: "assets/images/boss.png",
    acento: "#1ed760",
    nombre: "Alex",
    apellidos: "Rivera",
    profesion: "Soporte IT / Helpdesk",
    objetivo: "Acceder a un puesto de soporte tecnico de nivel inicial.",
    resumen: "Perfil ficticio orientado a atencion de usuarios, gestion de tickets y resolucion ordenada de incidencias tecnicas.",
    telefono: "+34 600 000 101",
    correo: "alex.rivera@example.com",
    ubicacion: "Madrid, Espana",
    experiencia: [
      ["Tecnico de soporte", "Norte Sistemas", "Madrid", "2023-02", "Actualidad", "Atencion de incidencias, preparacion de equipos y soporte remoto a usuarios internos."],
      ["Auxiliar tecnico", "Aula Digital", "Madrid", "2021-06", "2023-01", "Instalacion de software, inventario de hardware y documentacion de soluciones frecuentes."]
    ],
    educacion: [["Grado medio en sistemas microinformaticos", "Instituto Central", "Madrid", "2019-09", "2021-06"]],
    formacion: [["Curso", "Fundamentos de redes y soporte", "Campus Online", "2024-03", "Practicas de TCP/IP, DNS, usuarios y herramientas de escritorio remoto."]],
    habilidadesTecnicas: ["Windows", "Tickets", "Redes basicas", "Hardware"],
    habilidadesBlandas: ["Paciencia", "Comunicacion", "Organizacion"],
    idiomas: [["Espanol", "Nativo", "No aplica"], ["Ingles", "Intermedio", "B1 ficticio"]],
    proyectos: [["Base de conocimiento helpdesk", "HTML, CSS, JavaScript", "#", "Prototipo de documentacion interna para incidencias comunes."]],
    logros: [["Mejora de tiempos de respuesta", "Operativo", "2024-05", "Ejemplo ficticio de optimizacion de flujo de tickets."]]
  }),
  crearSemillaPerfil({
    id: "boss2",
    name: "boss2",
    imagen: "assets/images/boss2.png",
    acento: "#3ddc97",
    nombre: "Mara",
    apellidos: "Santos",
    profesion: "Frontend Junior / JavaScript",
    objetivo: "Sumarse a un equipo de desarrollo web como perfil junior.",
    resumen: "Perfil ficticio enfocado en interfaces limpias, componentes responsive y aprendizaje continuo en desarrollo frontend.",
    telefono: "+34 600 000 202",
    correo: "mara.santos@example.com",
    ubicacion: "Valencia, Espana",
    experiencia: [["Maquetadora web trainee", "Pixel Norte", "Valencia", "2023-09", "Actualidad", "Construccion de pantallas responsive, mantenimiento de estilos y pequenos componentes interactivos."]],
    educacion: [["Bootcamp de desarrollo web", "Academia Delta", "Online", "2023-01", "2023-08"]],
    formacion: [["Curso", "JavaScript moderno", "Campus Online", "2024-01", "DOM, eventos, localStorage y consumo basico de datos."]],
    habilidadesTecnicas: ["HTML semantico", "CSS responsive", "JavaScript", "Bootstrap"],
    habilidadesBlandas: ["Atencion al detalle", "Aprendizaje rapido", "Colaboracion"],
    idiomas: [["Espanol", "Nativo", "No aplica"], ["Ingles", "Lectura tecnica", "Certificacion ficticia"]],
    proyectos: [["Panel de tareas", "JavaScript, localStorage", "#", "Aplicacion ficticia con filtros, estados y persistencia local."]],
    logros: [["Primer portfolio publicado", "Proyecto", "2024-04", "Ejemplo ficticio de portfolio personal responsive."]]
  }),
  crearSemillaPerfil({
    id: "boss3",
    name: "boss3",
    imagen: "assets/images/boss3.png",
    acento: "#19c7b8",
    nombre: "Leo",
    apellidos: "Marin",
    profesion: "Cybersecurity Trainee / Blue Team",
    objetivo: "Orientar el perfil tecnico hacia seguridad defensiva y analisis inicial de incidencias.",
    resumen: "Perfil ficticio centrado en fundamentos de redes, Linux, buenas practicas de seguridad y documentacion de evidencias.",
    telefono: "+34 600 000 303",
    correo: "leo.marin@example.com",
    ubicacion: "Sevilla, Espana",
    experiencia: [["Analista SOC trainee", "SecureLab Demo", "Sevilla", "2024-02", "Actualidad", "Revision de alertas simuladas, clasificacion de eventos y documentacion de casos de laboratorio."]],
    educacion: [["Formacion en ciberseguridad", "Centro Horizonte", "Online", "2023-09", "En curso"]],
    formacion: [["Laboratorio", "Linux, logs y permisos", "Lab personal", "2024-06", "Practicas ficticias de lectura de logs, usuarios, permisos y hardening basico."]],
    habilidadesTecnicas: ["Linux", "Redes TCP/IP", "Logs", "Hardening basico"],
    habilidadesBlandas: ["Documentacion", "Pensamiento analitico", "Responsabilidad"],
    idiomas: [["Espanol", "Nativo", "No aplica"], ["Ingles", "Basico", "En formacion"]],
    proyectos: [["Checklist de hardening", "Linux, Windows, Markdown", "#", "Lista ficticia de controles iniciales para estaciones de trabajo."]],
    logros: [["Ruta Blue Team inicial", "Formacion", "2024-07", "Ejemplo ficticio de plan de estudio defensivo."]]
  })
];

let perfiles = cargarPerfiles();
let indiceActivo = Math.min(Number(localStorage.getItem("spotifyCvActiveIndex") || 0), perfiles.length - 1);
let estaReproduciendo = false;

const elementos = {
  profilePhoto: document.getElementById("profilePhoto"),
  cvAudio: document.getElementById("cvAudio"),
  trackCover: document.getElementById("trackCover"),
  nombreCompleto: document.getElementById("fullName"),
  heroName: document.getElementById("heroName"),
  sidebarRole: document.getElementById("sidebarRole"),
  heroRole: document.getElementById("heroRole"),
  profileSummary: document.getElementById("profileSummary"),
  currentProfileLabel: document.getElementById("currentProfileLabel"),
  profileOptions: document.getElementById("profileOptions"),
  profileCards: document.getElementById("profileCards"),
  aboutTitle: document.getElementById("aboutTitle"),
  aboutText: document.getElementById("aboutText"),
  professionalProfileList: document.getElementById("professionalProfileList"),
  keyStats: document.getElementById("keyStats"),
  personalInfoList: document.getElementById("personalInfoList"),
  cvProfileList: document.getElementById("cvProfileList"),
  skillList: document.getElementById("skillList"),
  timeline: document.getElementById("timeline"),
  projectList: document.getElementById("projectList"),
  educationList: document.getElementById("educationList"),
  trainingList: document.getElementById("trainingList"),
  languageList: document.getElementById("languageList"),
  achievementList: document.getElementById("achievementList"),
  volunteeringList: document.getElementById("volunteeringList"),
  extraInfoList: document.getElementById("extraInfoList"),
  trackTitle: document.getElementById("trackTitle"),
  trackSubtitle: document.getElementById("trackSubtitle"),
  playerProgress: document.getElementById("playerProgress"),
  playPause: document.getElementById("playPause"),
  modalPerfil: document.getElementById("profileModal"),
  form: document.getElementById("profileForm"),
  quickImageInput: document.getElementById("quickImageInput")
};

const modalPerfil = new bootstrap.Modal(elementos.modalPerfil);

function crearSemillaPerfil(semilla) {
  const ahora = new Date().toISOString();
  const idCv = `cv-${semilla.id}`;
  return {
    id: semilla.id,
    imagen: semilla.imagen,
    acento: semilla.acento,
    audio: PISTA_AUDIO,
    cv: { id: idCv, user: ID_USUARIO, created_at: ahora, updated_at: ahora },
    cvProfile: {
      user: ID_USUARIO,
      cv: idCv,
      nombre: semilla.name,
      slug: crearSlug(semilla.name),
      template: "spotify-dark",
      is_public: true,
      created_at: ahora,
      mostrar_perfil_profesional: true,
      mostrar_redes: true,
      mostrar_intereses: true,
      mostrar_otros: true,
      mostrar_voluntariado: true,
      mostrar_logros: true
    },
    personalInfo: {
      cv: idCv,
      nombre: semilla.nombre,
      apellidos: semilla.apellidos,
      telefono1: semilla.telefono || "",
      telefono2: "",
      email_profesional1: semilla.correo || "",
      email_profesional2: "",
      ciudad: semilla.ubicacion?.split(",")[0]?.trim() || "",
      pais: semilla.ubicacion?.split(",").slice(1).join(",").trim() || "Pais demo",
      codigo_postal: "",
      fecha_nacimiento: "",
      nacionalidad: "Demo",
      carnet_conducir: true,
      disponibilidad: "Inmediata / a convenir",
      foto: semilla.imagen
    },
    professionalProfile: {
      cv: idCv,
      profesion: semilla.profesion,
      objetivo: semilla.objetivo,
      resumen: semilla.resumen
    },
    title: semilla.profesion,
    about: semilla.resumen,
    workExperience: mapearExperiencia(semilla.experiencia || [], idCv),
    educacion: mapearEducacion(semilla.educacion || [], idCv),
    complementaryTraining: mapearFormacion(semilla.formacion || [], idCv),
    skills: mapearHabilidades(semilla.habilidadesTecnicas || [], semilla.habilidadesBlandas || [], idCv),
    idiomas: mapearIdiomas(semilla.idiomas || [], idCv),
    proyectos: mapearProyectos(semilla.proyectos || [], idCv),
    logros: mapearLogros(semilla.logros || [], idCv),
    voluntariado: [],
    socialNetwork: { cv: idCv, linkedin: semilla.linkedin || "", github: semilla.github || "", portfolio: semilla.portfolio || "", twitter: "", otras: "" },
    interests: ["Tecnologia", "Aprendizaje continuo", "Aviacion"].map((nombre, indice) => ({ cv: idCv, nombre, orden: indice + 1 })),
    otherInfo: { cv: idCv, disponibilidad_viajar: true, teletrabajo: "Hibrido / remoto", expectativa_salarial: "A convenir", notas: "Perfil editable desde la interfaz." }
  };
}

function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function crearSlug(valor) {
  return String(valor || "perfil")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "perfil";
}

function textoBooleano(valor) {
  return valor ? "Si" : "No";
}

function nombreCompleto(info) {
  return `${info.nombre || ""} ${info.apellidos || ""}`.trim() || "Sin nombre";
}

function perfilActivo() {
  return perfiles[indiceActivo] || perfiles[0];
}

function cargarPerfiles() {
  const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (!guardado) return structuredClone(perfilesPorDefecto);
  try {
    const parseado = JSON.parse(guardado);
    return Array.isArray(parseado) && parseado.length ? parseado.map(normalizarPerfil) : structuredClone(perfilesPorDefecto);
  } catch {
    return structuredClone(perfilesPorDefecto);
  }
}

function guardarPerfiles() {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(perfiles));
  localStorage.setItem("spotifyCvActiveIndex", String(indiceActivo));
}

function normalizarPerfil(perfil) {
  const respaldo = crearSemillaPerfil({
    id: perfil.id || `cv-${Date.now()}`,
    name: perfil.cvProfile?.nombre || perfil.name || "Perfil",
    imagen: perfil.imagen || "assets/images/boss.png",
    acento: perfil.acento || "#1ed760",
    nombre: perfil.personalInfo?.nombre || "",
    apellidos: perfil.personalInfo?.apellidos || "",
    profesion: perfil.professionalProfile?.profesion || perfil.role || "",
    objetivo: perfil.professionalProfile?.objetivo || "",
    resumen: perfil.professionalProfile?.resumen || perfil.resumen || ""
  });
  return {
    ...respaldo,
    ...perfil,
    cv: { ...respaldo.cv, ...perfil.cv },
    cvProfile: { ...respaldo.cvProfile, ...perfil.cvProfile },
    personalInfo: { ...respaldo.personalInfo, ...perfil.personalInfo },
    professionalProfile: { ...respaldo.professionalProfile, ...perfil.professionalProfile },
    socialNetwork: { ...respaldo.socialNetwork, ...perfil.socialNetwork },
    otherInfo: { ...respaldo.otherInfo, ...perfil.otherInfo },
    workExperience: perfil.workExperience || respaldo.workExperience,
    educacion: perfil.educacion || respaldo.educacion,
    complementaryTraining: perfil.complementaryTraining || respaldo.complementaryTraining,
    skills: perfil.skills || respaldo.skills,
    idiomas: perfil.idiomas || respaldo.idiomas,
    proyectos: perfil.proyectos || respaldo.proyectos,
    logros: perfil.logros || respaldo.logros,
    voluntariado: perfil.voluntariado || respaldo.voluntariado,
    interests: perfil.interests || respaldo.interests
  };
}

function mapearExperiencia(filas, cv) {
  return filas.map(([puesto, empresa, ubicacion, fecha_inicio, fecha_fin, descripcion], indice) => ({
    cv, puesto, empresa, ubicacion, fecha_inicio, fecha_fin, trabajo_actual: /actual|presente|en curso/i.test(fecha_fin || ""), descripcion, logros: descripcion, orden: indice + 1
  }));
}

function mapearEducacion(filas, cv) {
  return filas.map(([titulo, centro, ubicacion, fecha_inicio, fecha_fin], indice) => ({
    cv, titulo, centro, ubicacion, fecha_inicio, fecha_fin, en_curso: /actual|presente|en curso/i.test(fecha_fin || ""), orden: indice + 1
  }));
}

function mapearFormacion(filas, cv) {
  return filas.map(([tipo, nombre, entidad, fecha, descripcion], indice) => ({ cv, tipo, nombre, entidad, fecha, descripcion, orden: indice + 1 }));
}

function mapearHabilidades(technical, soft, cv) {
  const tech = technical.map((nombre, indice) => ({ cv, tipo: "Tecnica", categoria: "Tecnica", nombre, nivel: Math.max(62, 88 - indice * 4), orden: indice + 1, icon: "bi-tools" }));
  const softRows = soft.map((nombre, indice) => ({ cv, tipo: "Blanda", categoria: "Soft habilidad", nombre, nivel: Math.max(62, 86 - indice * 4), orden: tech.length + indice + 1, icon: "bi-stars" }));
  return [...tech, ...softRows];
}

function mapearIdiomas(filas, cv) {
  return filas.map(([idioma, nivel, certificacion], indice) => ({ cv, idioma, nivel, certificacion, orden: indice + 1 }));
}

function mapearProyectos(filas, cv) {
  return filas.map(([nombre, tecnologias, enlace, descripcion], indice) => ({ cv, nombre, tecnologias, enlace, descripcion, orden: indice + 1 }));
}

function mapearLogros(filas, cv) {
  return filas.map(([titulo, tipo, fecha, descripcion], indice) => ({ cv, titulo, tipo, fecha, descripcion, orden: indice + 1 }));
}

function parsearFilas(valor, fallbackCols = 4) {
  return String(valor || "")
    .split(/\n+/)
    .map((fila) => fila.trim())
    .filter(Boolean)
    .map((fila) => {
      const partes = fila.split("|").map((part) => part.trim());
      while (partes.length < fallbackCols) partes.push("");
      return partes;
    });
}

function listaATexto(elementosLista, keys) {
  return (elementosLista || []).map((elemento) => keys.map((key) => elemento[key] || "").join(" | ")).join("\n");
}

function separarLista(valor) {
  return String(valor || "")
    .split(/,|\n/)
    .map((elemento) => elemento.trim())
    .filter(Boolean);
}

function ponerImagen(imagen, src) {
  imagen.onerror = () => {
    imagen.onerror = null;
    imagen.src = "assets/images/boss.png";
  };
  imagen.src = src || "assets/images/boss.png";
}

function ponerAcento(color) {
  document.documentElement.style.setProperty("--acento", color || "#1ed760");
}

function renderizarListaCampos(elementosLista) {
  return elementosLista.map(([label, valor, icon = "bi-dot"]) => `
    <div class="field-item">
      <i class="bi ${icon}"></i>
      <span>${escaparHtml(label)}</span>
      <strong>${escaparHtml(valor || "No indicado")}</strong>
    </div>
  `).join("");
}

function renderizarMenuPerfiles() {
  elementos.profileOptions.innerHTML = perfiles.map((perfil, indice) => `
    <button class="profile-option ${indice === indiceActivo ? "active" : ""}" type="button" data-profile-index="${indice}">
      <span class="status-dot"></span>
      <span>${escaparHtml(perfil.cvProfile.nombre)}</span>
      ${indice === indiceActivo ? '<i class="bi bi-check-lg"></i>' : ""}
    </button>
  `).join("");

  elementos.profileCards.innerHTML = perfiles.map((perfil, indice) => `
    <div class="col-md-4">
      <article class="profile-card-tile ${indice === indiceActivo ? "active" : ""}" role="button" tabindex="0" data-profile-index="${indice}">
        <img src="${escaparHtml(perfil.imagen || perfil.personalInfo.foto)}" alt="Imagen del perfil ${escaparHtml(perfil.cvProfile.nombre)}">
        <span class="perfil-tag">${escaparHtml(perfil.cvProfile.template)}</span>
        <h3>${escaparHtml(perfil.cvProfile.nombre)}</h3>
        <p>${escaparHtml(perfil.professionalProfile.profesion)}</p>
        <span class="mini-play"><i class="bi bi-play-fill"></i></span>
      </article>
    </div>
  `).join("");
}

function renderizarPerfilActivo() {
  const perfil = perfilActivo();
  if (!perfil) return;
  const info = perfil.personalInfo;
  const imagen = perfil.imagen || info.foto;
  const firstSkill = perfil.skills[0]?.nivel || 70;

  ponerAcento(perfil.acento);
  ponerImagen(elementos.profilePhoto, imagen);
  ponerImagen(elementos.trackCover, imagen);
  elementos.cvAudio.src = perfil.audio || PISTA_AUDIO;
  elementos.nombreCompleto.textContent = nombreCompleto(info);
  elementos.heroName.textContent = nombreCompleto(info);
  elementos.sidebarRole.textContent = perfil.professionalProfile.profesion;
  elementos.heroRole.textContent = perfil.professionalProfile.profesion;
  elementos.profileSummary.textContent = perfil.professionalProfile.resumen;
  elementos.currentProfileLabel.textContent = perfil.cvProfile.nombre;
  elementos.aboutTitle.textContent = perfil.professionalProfile.profesion;
  elementos.aboutText.textContent = perfil.professionalProfile.resumen;
  elementos.trackTitle.textContent = `CV ${perfil.cvProfile.nombre}`;
  elementos.trackSubtitle.textContent = perfil.professionalProfile.objetivo || "Perfil editable";
  elementos.playerProgress.style.width = `${Math.max(38, Math.min(94, firstSkill))}%`;

  elementos.professionalProfileList.innerHTML = renderizarListaCampos([
    ["cv", perfil.cv.id, "bi-database-fill"],
    ["profesion", perfil.professionalProfile.profesion, "bi-person-workspace"],
    ["objetivo", perfil.professionalProfile.objetivo, "bi-bullseye"],
    ["resumen", perfil.professionalProfile.resumen, "bi-card-text"]
  ]);

  elementos.keyStats.innerHTML = [
    [perfil.workExperience.length, "Experiencias", "bi-briefcase-fill"],
    [perfil.skills.length, "Habilidades", "bi-layers-fill"],
    [perfil.proyectos.length, "Proyectos", "bi-kanban-fill"]
  ].map(([valor, label, icon]) => `
    <div class="stat">
      <i class="bi ${icon}"></i>
      <div><strong>${escaparHtml(valor)}</strong><span>${escaparHtml(label)}</span></div>
    </div>
  `).join("");

  elementos.personalInfoList.innerHTML = renderizarListaCampos([
    ["nombre", info.nombre, "bi-person-fill"],
    ["apellidos", info.apellidos, "bi-person-vcard-fill"],
    ["telefono1", info.telefono1, "bi-telephone-fill"],
    ["email_profesional1", info.email_profesional1, "bi-envelope-fill"],
    ["ciudad", info.ciudad, "bi-building-fill"],
    ["pais", info.pais, "bi-geo-alt-fill"],
    ["nacionalidad", info.nacionalidad, "bi-flag-fill"],
    ["disponibilidad", info.disponibilidad, "bi-clock-fill"]
  ]);

  elementos.cvProfileList.innerHTML = renderizarListaCampos([
    ["user", perfil.cv.user, "bi-person-circle"],
    ["cv", perfil.cv.id, "bi-database-fill"],
    ["nombre", perfil.cvProfile.nombre, "bi-file-earmark-person-fill"],
    ["slug", perfil.cvProfile.slug, "bi-link-45deg"],
    ["template", perfil.cvProfile.template, "bi-palette-fill"],
    ["is_public", textoBooleano(perfil.cvProfile.is_public), "bi-globe"],
    ["created_at", perfil.cv.created_at, "bi-calendar-plus"],
    ["updated_at", perfil.cv.updated_at, "bi-calendar-check"]
  ]);

  renderizarHabilidades(perfil);
  renderizarLineaTiempo(perfil);
  renderizarEducacion(perfil);
  renderizarFormacion(perfil);
  renderizarProyectos(perfil);
  renderizarExtras(perfil);
  renderizarMenuPerfiles();
  document.body.classList.remove("profile-changing");
}

function renderizarHabilidades(perfil) {
  elementos.skillList.innerHTML = perfil.skills.sort((a, b) => a.orden - b.orden).map((habilidad) => `
    <div class="skill-row">
      <i class="bi ${habilidad.icon || "bi-check-circle-fill"}"></i>
      <span>${escaparHtml(habilidad.nombre)} <small>${escaparHtml(habilidad.tipo)} / ${escaparHtml(habilidad.categoria)}</small></span>
      <div class="progress" role="progressbar" aria-label="${escaparHtml(habilidad.nombre)}" aria-valuenow="${habilidad.nivel}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${habilidad.nivel}%"></div>
      </div>
      <b>${escaparHtml(habilidad.nivel)}</b>
    </div>
  `).join("") || '<p class="empty-state">Sin habilidades cargadas.</p>';
}

function renderizarLineaTiempo(perfil) {
  elementos.timeline.innerHTML = perfil.workExperience.sort((a, b) => a.orden - b.orden).map((trabajo) => `
    <article class="timeline-item">
      <h4>${escaparHtml(trabajo.puesto)}</h4>
      <strong>${escaparHtml(trabajo.empresa)} - ${escaparHtml(trabajo.ubicacion)}</strong>
      <span>${escaparHtml(trabajo.fecha_inicio)} - ${escaparHtml(trabajo.fecha_fin)} ${trabajo.trabajo_actual ? "- Actual" : ""}</span>
      <p>${escaparHtml(trabajo.descripcion)}</p>
      <p><b>Logros:</b> ${escaparHtml(trabajo.logros)}</p>
    </article>
  `).join("") || '<p class="empty-state">Sin experiencia cargada.</p>';
}

function renderizarEducacion(perfil) {
  elementos.educationList.innerHTML = perfil.educacion.sort((a, b) => a.orden - b.orden).map((elemento) => `
    <div class="education-item">
      <div><strong>${escaparHtml(elemento.titulo)}</strong><span>${escaparHtml(elemento.centro)} - ${escaparHtml(elemento.ubicacion)}</span><small>${escaparHtml(elemento.fecha_inicio)} - ${escaparHtml(elemento.en_curso ? "En curso" : elemento.fecha_fin)}</small></div>
      <i class="bi bi-check-circle-fill"></i>
    </div>
  `).join("") || '<p class="empty-state">Sin educacion cargada.</p>';
}

function renderizarFormacion(perfil) {
  elementos.trainingList.innerHTML = perfil.complementaryTraining.sort((a, b) => a.orden - b.orden).map((elemento) => `
    <div class="education-item">
      <div><strong>${escaparHtml(elemento.tipo)} - ${escaparHtml(elemento.nombre)}</strong><span>${escaparHtml(elemento.entidad)} - ${escaparHtml(elemento.fecha)}</span><small>${escaparHtml(elemento.descripcion)}</small></div>
      <i class="bi bi-patch-check-fill"></i>
    </div>
  `).join("") || '<p class="empty-state">Sin cursos cargados.</p>';
}

function renderizarProyectos(perfil) {
  elementos.projectList.innerHTML = perfil.proyectos.sort((a, b) => a.orden - b.orden).map((proyecto) => `
    <div class="col-md-6">
      <article class="project-card">
        <div><span class="badge">${escaparHtml(proyecto.tecnologias)}</span><h4 class="mt-3">${escaparHtml(proyecto.nombre)}</h4><p>${escaparHtml(proyecto.descripcion)}</p></div>
        <a class="btn btn-outline-light btn-sm mt-3" href="${escaparHtml(proyecto.link || "#")}"><i class="bi bi-box-arrow-up-right"></i>Ver proyecto</a>
      </article>
    </div>
  `).join("") || '<p class="empty-state">Sin proyectos cargados.</p>';
}

function renderizarExtras(perfil) {
  elementos.languageList.innerHTML = perfil.idiomas.map((idioma) => `
    <div class="education-item"><div><strong>${escaparHtml(idioma.idioma)}</strong><span>${escaparHtml(idioma.nivel)}</span><small>${escaparHtml(idioma.certificacion)}</small></div><i class="bi bi-translate"></i></div>
  `).join("") || '<p class="empty-state">Sin idiomas cargados.</p>';

  elementos.achievementList.innerHTML = perfil.logros.map((logro) => `
    <div class="education-item"><div><strong>${escaparHtml(logro.titulo)}</strong><span>${escaparHtml(logro.tipo)} - ${escaparHtml(logro.fecha)}</span><small>${escaparHtml(logro.descripcion)}</small></div><i class="bi bi-trophy-fill"></i></div>
  `).join("") || '<p class="empty-state">Sin logros cargados.</p>';

  elementos.volunteeringList.innerHTML = perfil.voluntariado.map((voluntariado) => `
    <div class="education-item"><div><strong>${escaparHtml(voluntariado.organizacion)}</strong><span>${escaparHtml(voluntariado.funcion)}</span><small>${escaparHtml(voluntariado.impacto)}</small></div><i class="bi bi-heart-fill"></i></div>
  `).join("") || '<p class="empty-state">Sin voluntariado cargado.</p>';

  elementos.extraInfoList.innerHTML = renderizarListaCampos([
    ["linkedin", perfil.socialNetwork.linkedin, "bi-linkedin"],
    ["github", perfil.socialNetwork.github, "bi-github"],
    ["portfolio", perfil.socialNetwork.portfolio, "bi-window"],
    ["intereses", perfil.interests.map((elemento) => elemento.nombre).join(", "), "bi-stars"],
    ["disponibilidad_viajar", textoBooleano(perfil.otherInfo.disponibilidad_viajar), "bi-airplane-fill"],
    ["teletrabajo", perfil.otherInfo.teletrabajo, "bi-house-check-fill"],
    ["expectativa_salarial", perfil.otherInfo.expectativa_salarial, "bi-cash-coin"],
    ["notas", perfil.otherInfo.notas, "bi-sticky-fill"]
  ]);
}

function seleccionarPerfil(indice) {
  if (!perfiles.length) {
    perfiles = structuredClone(perfilesPorDefecto);
    indiceActivo = 0;
  } else {
    indiceActivo = (indice + perfiles.length) % perfiles.length;
  }
  document.body.classList.add("profile-changing");
  estaReproduciendo = false;
  elementos.cvAudio.pause();
  elementos.playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
  guardarPerfiles();
  window.setTimeout(renderizarPerfilActivo, 120);
}

function abrirFormularioPerfil(mode) {
  const isEdit = mode === "edit";
  const perfil = isEdit ? perfilActivo() : crearSemillaPerfil({
    id: `cv-${Date.now()}`,
    name: "nuevo-cv",
    imagen: "assets/images/boss.png",
    acento: "#1ed760",
    nombre: "",
    apellidos: "",
    profesion: "",
    objetivo: "",
    resumen: ""
  });

  document.getElementById("profileModalLabel").textContent = isEdit ? "Editar CV completo" : "Nuevo CV completo";
  document.getElementById("formProfileId").value = isEdit ? perfil.id : "";
  document.getElementById("formImageData").value = perfil.imagen || "";
  document.getElementById("formImagePreview").src = perfil.imagen || "assets/images/boss.png";
  document.getElementById("formAccent").value = perfil.acento || "#1ed760";
  document.getElementById("formProfileName").value = perfil.cvProfile.nombre || "";
  document.getElementById("formFirstName").value = perfil.personalInfo.nombre || "";
  document.getElementById("formLastName").value = perfil.personalInfo.apellidos || "";
  document.getElementById("formProfession").value = perfil.professionalProfile.profesion || "";
  document.getElementById("formObjective").value = perfil.professionalProfile.objetivo || "";
  document.getElementById("formSummary").value = perfil.professionalProfile.resumen || "";
  document.getElementById("formEmail").value = perfil.personalInfo.email_profesional1 || "";
  document.getElementById("formPhone").value = perfil.personalInfo.telefono1 || "";
  document.getElementById("formLocation").value = [perfil.personalInfo.ciudad, perfil.personalInfo.pais].filter(Boolean).join(", ");
  document.getElementById("formLinkedin").value = perfil.socialNetwork.linkedin || "";
  document.getElementById("formGithub").value = perfil.socialNetwork.github || "";
  document.getElementById("formPortfolio").value = perfil.socialNetwork.portfolio || "";
  document.getElementById("formExperience").value = listaATexto(perfil.workExperience, ["puesto", "empresa", "ubicacion", "fecha_inicio", "fecha_fin", "descripcion"]);
  document.getElementById("formEducation").value = listaATexto(perfil.educacion, ["titulo", "centro", "ubicacion", "fecha_inicio", "fecha_fin"]);
  document.getElementById("formProjects").value = listaATexto(perfil.proyectos, ["nombre", "tecnologias", "link", "descripcion"]);
  document.getElementById("formTraining").value = listaATexto(perfil.complementaryTraining, ["tipo", "nombre", "entidad", "fecha", "descripcion"]);
  document.getElementById("formTechnicalSkills").value = perfil.skills.filter((habilidad) => habilidad.tipo === "Tecnica").map((habilidad) => habilidad.nombre).join(", ");
  document.getElementById("formSoftSkills").value = perfil.skills.filter((habilidad) => habilidad.tipo !== "Tecnica").map((habilidad) => habilidad.nombre).join(", ");
  document.getElementById("formLanguages").value = listaATexto(perfil.idiomas, ["idioma", "nivel", "certificacion"]);
  document.getElementById("formAchievements").value = listaATexto(perfil.logros, ["titulo", "tipo", "fecha", "descripcion"]);
  document.getElementById("formAvailability").value = perfil.personalInfo.disponibilidad || "";
  document.getElementById("formRemote").value = perfil.otherInfo.teletrabajo || "";
  document.getElementById("formSalary").value = perfil.otherInfo.expectativa_salarial || "";
  document.getElementById("formNotes").value = perfil.otherInfo.notas || "";
  modalPerfil.show();
}

function perfilDesdeFormulario() {
  const idExistente = document.getElementById("formProfileId").value;
  const ahora = new Date().toISOString();
  const id = idExistente || `cv-${Date.now()}`;
  const idCv = `cv-${id}`;
  const ubicacion = document.getElementById("formLocation").value.split(",").map((part) => part.trim());
  const nombrePerfil = document.getElementById("formProfileName").value.trim() || "nuevo-cv";
  const nombre = document.getElementById("formFirstName").value.trim();
  const apellidos = document.getElementById("formLastName").value.trim();
  const imagen = document.getElementById("formImageData").value || "assets/images/boss.png";
  const anterior = perfiles.find((perfil) => perfil.id === idExistente);

  return normalizarPerfil({
    id,
    imagen,
    acento: document.getElementById("formAccent").value,
    audio: PISTA_AUDIO,
    cv: { id: idCv, user: ID_USUARIO, created_at: anterior?.cv.created_at || ahora, updated_at: ahora },
    cvProfile: {
      user: ID_USUARIO,
      cv: idCv,
      nombre: nombrePerfil,
      slug: crearSlug(nombrePerfil),
      template: "spotify-dark",
      is_public: true,
      created_at: anterior?.cvProfile.created_at || ahora,
      mostrar_perfil_profesional: true,
      mostrar_redes: true,
      mostrar_intereses: true,
      mostrar_otros: true,
      mostrar_voluntariado: true,
      mostrar_logros: true
    },
    personalInfo: {
      cv: idCv,
      nombre: nombre,
      apellidos: apellidos,
      telefono1: document.getElementById("formPhone").value.trim(),
      telefono2: "",
      email_profesional1: document.getElementById("formEmail").value.trim(),
      email_profesional2: "",
      ciudad: ubicacion[0] || "",
      pais: ubicacion.slice(1).join(", ") || "",
      codigo_postal: "",
      fecha_nacimiento: "",
      nacionalidad: anterior?.personalInfo.nacionalidad || "",
      carnet_conducir: anterior?.personalInfo.carnet_conducir ?? true,
      disponibilidad: document.getElementById("formAvailability").value.trim(),
      foto: imagen
    },
    professionalProfile: {
      cv: idCv,
      profesion: document.getElementById("formProfession").value.trim(),
      objetivo: document.getElementById("formObjective").value.trim(),
      resumen: document.getElementById("formSummary").value.trim()
    },
    title: document.getElementById("formProfession").value.trim(),
    about: document.getElementById("formSummary").value.trim(),
    workExperience: mapearExperiencia(parsearFilas(document.getElementById("formExperience").value, 6), idCv),
    educacion: mapearEducacion(parsearFilas(document.getElementById("formEducation").value, 5), idCv),
    complementaryTraining: mapearFormacion(parsearFilas(document.getElementById("formTraining").value, 5), idCv),
    skills: mapearHabilidades(separarLista(document.getElementById("formTechnicalSkills").value), separarLista(document.getElementById("formSoftSkills").value), idCv),
    idiomas: mapearIdiomas(parsearFilas(document.getElementById("formLanguages").value, 3), idCv),
    proyectos: mapearProyectos(parsearFilas(document.getElementById("formProjects").value, 4), idCv),
    logros: mapearLogros(parsearFilas(document.getElementById("formAchievements").value, 4), idCv),
    voluntariado: anterior?.voluntariado || [],
    socialNetwork: {
      cv: idCv,
      linkedin: document.getElementById("formLinkedin").value.trim(),
      github: document.getElementById("formGithub").value.trim(),
      portfolio: document.getElementById("formPortfolio").value.trim(),
      twitter: anterior?.socialNetwork.twitter || "",
      otras: anterior?.socialNetwork.otras || ""
    },
    interests: anterior?.interests || ["Tecnologia", "Aprendizaje continuo"].map((nombre, indice) => ({ cv: idCv, nombre, orden: indice + 1 })),
    otherInfo: {
      cv: idCv,
      disponibilidad_viajar: anterior?.otherInfo.disponibilidad_viajar ?? true,
      teletrabajo: document.getElementById("formRemote").value.trim(),
      expectativa_salarial: document.getElementById("formSalary").value.trim(),
      notas: document.getElementById("formNotes").value.trim()
    }
  });
}

function manejarEnvioPerfil(evento) {
  evento.preventDefault();
  const perfil = perfilDesdeFormulario();
  const indiceExistente = perfiles.findIndex((elemento) => elemento.id === perfil.id);
  if (indiceExistente >= 0) {
    perfiles[indiceExistente] = perfil;
    indiceActivo = indiceExistente;
  } else {
    perfiles.push(perfil);
    indiceActivo = perfiles.length - 1;
  }
  guardarPerfiles();
  modalPerfil.hide();
  renderizarPerfilActivo();
}

function eliminarPerfilActivo() {
  const perfil = perfilActivo();
  if (!perfil) return;
  const confirmado = window.confirm(`Eliminar el CV "${perfil.cvProfile.nombre}"? Esta accion no se puede deshacer.`);
  if (!confirmado) return;
  perfiles.splice(indiceActivo, 1);
  if (!perfiles.length) perfiles = structuredClone(perfilesPorDefecto);
  indiceActivo = Math.max(0, Math.min(indiceActivo, perfiles.length - 1));
  guardarPerfiles();
  renderizarPerfilActivo();
}

// Las imagenes se guardan en localStorage, por eso se reducen antes de persistirlas.
function leerArchivoImagen(archivo, retorno) {
  if (!archivo) return;
  const lector = new FileReader();
  lector.onload = () => {
    const imagen = new Image();
    imagen.onload = () => {
      const anchoMaximo = 900;
      const altoMaximo = 1100;
      const escala = Math.min(1, anchoMaximo / imagen.width, altoMaximo / imagen.height);
      const lienzo = document.createElement("canvas");
      lienzo.width = Math.round(imagen.width * escala);
      lienzo.height = Math.round(imagen.height * escala);
      const contexto = lienzo.getContext("2d");
      contexto.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
      retorno(lienzo.toDataURL("image/jpeg", 0.86));
    };
    imagen.src = lector.result;
  };
  lector.readAsDataURL(archivo);
}

function cambiarImagenActiva(archivo) {
  leerArchivoImagen(archivo, (urlDatos) => {
    const perfil = perfilActivo();
    perfil.imagen = urlDatos;
    perfil.personalInfo.foto = urlDatos;
    perfil.cv.updated_at = new Date().toISOString();
    guardarPerfiles();
    renderizarPerfilActivo();
  });
}

document.addEventListener("click", (evento) => {
  const disparador = evento.target.closest("[data-profile-index]");
  if (!disparador) return;
  seleccionarPerfil(Number(disparador.dataset.profileIndex));
});

document.querySelectorAll("[data-section-target]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const destino = boton.dataset.sectionTarget;
    const tab = document.querySelector(`[data-bs-target="${destino}"]`);
    if (!tab) return;
    bootstrap.Tab.getOrCreateInstance(tab).show();
    document.querySelectorAll(".side-nav .nav-link").forEach((enlace) => enlace.classList.remove("active"));
    boton.classList.add("active");
    document.querySelector(".section-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("#cvTabs [data-bs-toggle='tab']").forEach((tab) => {
  tab.addEventListener("shown.bs.tab", (evento) => {
    const destino = evento.target.dataset.bsTarget;
    document.querySelectorAll(".side-nav .nav-link").forEach((enlace) => {
      enlace.classList.toggle("active", enlace.dataset.sectionTarget === destino);
    });
  });
});

document.getElementById("newProfileButton").addEventListener("click", () => abrirFormularioPerfil("new"));
document.getElementById("editProfileButton").addEventListener("click", () => abrirFormularioPerfil("edit"));
document.getElementById("deleteProfileButton").addEventListener("click", eliminarPerfilActivo);
document.getElementById("homeButton").addEventListener("click", () => {
  document.getElementById("inicio").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("prevProfile").addEventListener("click", () => seleccionarPerfil(indiceActivo - 1));
document.getElementById("nextProfile").addEventListener("click", () => seleccionarPerfil(indiceActivo + 1));
document.getElementById("prevProfileBottom").addEventListener("click", () => seleccionarPerfil(indiceActivo - 1));
document.getElementById("nextProfileBottom").addEventListener("click", () => seleccionarPerfil(indiceActivo + 1));
document.getElementById("printCv").addEventListener("click", () => window.print());
document.getElementById("profileForm").addEventListener("submit", manejarEnvioPerfil);
document.getElementById("toggleTheme").addEventListener("click", () => document.body.classList.toggle("light-mode"));
document.getElementById("quickImageButton").addEventListener("click", () => elementos.quickImageInput.click());
elementos.quickImageInput.addEventListener("change", (evento) => cambiarImagenActiva(evento.target.files[0]));

document.getElementById("formImageInput").addEventListener("change", (evento) => {
  leerArchivoImagen(evento.target.files[0], (urlDatos) => {
    document.getElementById("formImageData").value = urlDatos;
    document.getElementById("formImagePreview").src = urlDatos;
  });
});

elementos.playPause.addEventListener("click", () => {
  estaReproduciendo = !estaReproduciendo;
  elementos.playPause.innerHTML = `<i class="bi ${estaReproduciendo ? "bi-pause-fill" : "bi-play-fill"}"></i>`;
  if (estaReproduciendo) {
    elementos.cvAudio.play().catch(() => {
      estaReproduciendo = false;
      elementos.playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    });
  } else {
    elementos.cvAudio.pause();
  }
});

document.querySelectorAll(".side-nav .nav-link").forEach((enlace) => {
  enlace.innerHTML = `${enlace.querySelector("i").outerHTML}<span>${enlace.textContent.trim()}</span>`;
});

document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((disparadorTooltip) => new bootstrap.Tooltip(disparadorTooltip));

renderizarPerfilActivo();









