import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Code2,
  Briefcase,
  Mail,
  ArrowUpRight,
  Database,
  Workflow,
  TrendingUp,
  Globe,
  ShoppingBag,
  Target,
  MapPin,
  Anchor,
  Sparkles,
  Brain,
  Trophy,
  Users,
  Zap,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

/* Si preferís servir la captura desde el propio proyecto (carga más rápido
   y no depende de GitHub): copiá bi/capturas/dashboard-portfolio.png del
   repo a /public del portfolio y cambiá esta constante por
   "/dashboard-portfolio.png". Es lo único que hay que tocar. */
const DASHBOARD_IMG =
  "https://raw.githubusercontent.com/MarcosGriffa/job_scraping/main/bi/capturas/dashboard-portfolio.png";

const SECTIONS = ["inicio", "stack", "bi", "trabajo", "sobre-mi", "contacto"];

export default function App() {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Reloj BUE
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const opts = {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("es-AR", opts));
    };
    updateTime();
    const id = setInterval(updateTime, 30000);
    return () => clearInterval(id);
  }, []);

  /* Parallax y spotlight vía CSS custom properties, NO vía estado de React.
     Antes cada píxel de scroll llamaba a setScrollY y re-renderizaba el
     árbol entero. Ahora se escribe una variable CSS dentro de un rAF: el
     navegador recalcula estilos y nada más. Se respeta reduced-motion. */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let raf = null;
    const write = () => {
      root.style.setProperty("--sy", String(window.scrollY));
      raf = null;
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(write);
    };

    let rafMouse = null;
    const onMove = (e) => {
      if (rafMouse !== null) return;
      rafMouse = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
        root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
        rafMouse = null;
      });
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
      if (rafMouse !== null) cancelAnimationFrame(rafMouse);
    };
  }, []);

  // La sección activa del nav sigue al scroll, no solo al click
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((s) => {
    setMenuOpen(false);
    document.getElementById(s)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const dataSkills = [
    { name: "SQL / PostgreSQL", level: "Intermedio" },
    { name: "Power BI · DAX", level: "Intermedio" },
    { name: "Modelado dimensional", level: "Intermedio" },
    { name: "Python", level: "Avanzado" },
    { name: "pandas", level: "Intermedio" },
    { name: "Excel · Google Sheets", level: "Avanzado" },
    { name: "Estadística", level: "En curso · UBA" },
  ];

  const automationSkills = [
    { name: "n8n", level: "Avanzado" },
    { name: "APIs de LLM (Groq)", level: "Intermedio" },
    { name: "Embeddings (Cohere)", level: "Intermedio" },
    { name: "FastAPI · APIs REST", level: "Intermedio" },
    { name: "BeautifulSoup4", level: "Intermedio" },
    { name: "GitHub Actions", level: "Intermedio" },
    { name: "JavaScript (ETL)", level: "Intermedio" },
  ];

  const projects = [
    {
      id: "00",
      title: "EmpatÍA | NextStep",
      kicker: "Producto en producción · Datos + IA",
      icon: Sparkles,
      span: "lg:col-span-3",
      featured: true,
      tags: [
        "PostgreSQL",
        "Power BI / DAX",
        "Python",
        "FastAPI",
        "Next.js",
        "Cohere",
        "Groq",
      ],
      link: "https://empatianextstep.com",
      repo: "https://github.com/MarcosGriffa/job_scraping",
      result:
        "Plataforma web propia que analiza un CV, busca ofertas en 6 portales y explica la compatibilidad de cada una. Funciona para cualquier rubro, no solo IT: el sistema deduce el área profesional y arma sus propios términos de búsqueda.",
      detail:
        "El ranking corre en dos etapas por una razón de costo: primero un filtro semántico con embeddings, que es casi gratis y descarta el grueso; después un LLM lee el CV y el aviso completos solo sobre los finalistas y devuelve puntaje, coincidencias y brechas. Encima de esa base de datos monté el modelo analítico en Power BI.",
      metric: "6",
      metricLabel: "portales consultados por búsqueda",
      features: [
        { label: "datos", desc: "PostgreSQL · Supabase" },
        { label: "análisis", desc: "Power BI · DAX" },
        { label: "matching", desc: "Embeddings + LLM" },
      ],
    },
    {
      id: "01",
      title: "Estudio Griffa",
      kicker: "Transformación digital",
      icon: Globe,
      span: "lg:col-span-2",
      tags: ["Jamstack", "Tailwind", "Netlify", "CI/CD"],
      link: "https://github.com/MarcosGriffa/web-estudio-griffa",
      result:
        "Migración de un sitio HTML estático de 2014 a una arquitectura Jamstack moderna para una firma marítima con más de 60 años de trayectoria.",
      detail:
        "Rediseño integral con diseño responsivo, optimización de assets HD, CI/CD desde GitHub y captación de leads vía formularios estructurados listos para análisis.",
      metric: "60+",
      metricLabel: "años de trayectoria modernizados",
    },
    {
      id: "02",
      title: "ML Price Pipeline",
      kicker: "ETL · Histórico de precios",
      icon: TrendingUp,
      span: "lg:col-span-1",
      tags: ["Python", "BeautifulSoup", "SQL", "n8n"],
      link: "https://github.com/MarcosGriffa/web-scraping-ML",
      result:
        "Sistema end-to-end que monitorea precios de notebooks en Mercado Libre, almacena el histórico en SQL y dispara reportes HTML al detectar variaciones.",
      detail:
        "ETL con Python y pandas, persistencia en SQL, orquestación remota con n8n vía webhooks y visualización en Streamlit.",
      metric: "24/7",
      metricLabel: "monitoreo autónomo programado",
    },
    {
      id: "03",
      title: "Las Dellas",
      kicker: "E-commerce automation",
      icon: ShoppingBag,
      span: "lg:col-span-1",
      tags: ["n8n", "JavaScript", "Sheets", "Gmail API"],
      link: "https://github.com/MarcosGriffa/Las_Dellas-Automatizaci-n",
      result:
        "Backend automatizado que eliminó la carga administrativa manual de confirmación de pedidos en un emprendimiento textil.",
      detail:
        "Orquestador en n8n que conecta Google Forms con lógica de negocio en JavaScript, confirmación automática por mail y registro en Sheets.",
      metric: "0",
      metricLabel: "pedidos confirmados a mano",
    },
    {
      id: "04",
      title: "Buscaminas + Batalla Naval",
      kicker: "Python · Lógica pura",
      icon: Target,
      span: "lg:col-span-2",
      tags: ["Python", "Recursividad", "Matrices", "I/O"],
      link: "https://github.com/MarcosGriffa/Buscaminas",
      result:
        "Dos implementaciones algorítmicas completas que demuestran manejo de estructuras de datos, recursividad y persistencia de estado.",
      detail:
        "Buscaminas: recursividad para el revelado en cadena y verificación cruzada entre tablero real y visible. Batalla Naval: matrices, validación de coordenadas y estado en archivos.",
      metric: "2",
      metricLabel: "juegos implementados desde cero",
    },
  ];

  const biHighlights = [
    {
      k: "Modelo",
      v: "Esquema estrella",
      d: "Tabla de hechos con grano de una oferta evaluada, más dimensiones de CV, skills y calendario con relación activa e inactiva.",
    },
    {
      k: "SQL",
      v: "3 vistas en PostgreSQL",
      d: "Aplanan estructuras JSON anidadas a tablas analizables, y cruzan el estado real de \"aplicado\" contra su tabla de eventos.",
    },
    {
      k: "DAX",
      v: "13 medidas",
      d: "Tasa de conversión, % de alta compatibilidad, variación mes a mes y comparación entre las dos etapas del matching.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#070708] text-zinc-100 antialiased selection:bg-lime-300 selection:text-black overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-variation-settings: "opsz" 144; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 50% { opacity: 0.3; } }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -60px) scale(1.1); }
          66% { transform: translate(-60px, 40px) scale(0.95); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-100px, 50px) scale(1.05); }
          66% { transform: translate(70px, -80px) scale(0.9); }
        }
        @keyframes float-slow-3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          50% { transform: translate(60px, 60px) scale(1.1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes line-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        .fade-up { animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .blink { animation: blink 1.5s ease-in-out infinite; }
        .aurora-1 { animation: float-slow 20s ease-in-out infinite; }
        .aurora-2 { animation: float-slow-2 25s ease-in-out infinite; }
        .aurora-3 { animation: float-slow-3 18s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 40s linear infinite; }
        .pulse-ring { animation: pulse-ring 4s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #fafafa 0%, #bef264 50%, #fafafa 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .grid-bg-mask {
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%);
        }

        .noise::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .glow-lime { box-shadow: 0 0 80px -20px rgba(190, 242, 100, 0.5); }
        .text-stroke { -webkit-text-stroke: 1px rgba(255,255,255,0.18); color: transparent; }
        .card-hover:hover .arrow-icon { transform: translate(4px, -4px); }
        .card-hover:hover .glow-spot { opacity: 1; }
        .scan-line {
          position: absolute;
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(190,242,100,0.4), transparent);
          animation: line-scan 8s linear infinite;
        }

        /* Parallax leído desde --sy (lo escribe un rAF, sin estado de React).
           Cada forma declara su propio factor con --f y su rotación con --r. */
        .parallax-shape {
          will-change: transform;
          transform:
            translateY(calc(var(--sy, 0) * var(--f, -1) * 1px))
            rotate(calc(var(--base-rot, 0deg) + var(--sy, 0) * var(--r, 0) * 1deg));
        }
        .parallax-grid {
          transform: translateY(calc(var(--sy, 0) * 0.35px));
        }
        .spotlight {
          background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(190,242,100,0.06), transparent 50%);
        }

        /* Foco visible y consistente para navegación por teclado */
        a:focus-visible, button:focus-visible {
          outline: 2px solid #bef264;
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* Respetar a quien pidió menos movimiento: sin animaciones,
           sin parallax y sin spotlight. El contenido queda intacto. */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
          .parallax-shape, .parallax-grid { transform: none !important; }
          .spotlight { display: none; }
          .shimmer-text {
            -webkit-text-fill-color: #fafafa;
            background: none;
          }
        }
      `}</style>

      {/* CAPA DE FONDO ANIMADO - 3 auroras flotando */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute aurora-1 rounded-full"
          style={{
            top: "-15%",
            left: "-10%",
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, rgba(190,242,100,0.18) 0%, rgba(190,242,100,0) 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute aurora-2 rounded-full"
          style={{
            top: "30%",
            right: "-15%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.10) 0%, rgba(251,191,36,0) 60%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute aurora-3 rounded-full"
          style={{
            bottom: "-20%",
            left: "20%",
            width: "50vw",
            height: "50vw",
            background:
              "radial-gradient(circle, rgba(132,204,22,0.12) 0%, rgba(132,204,22,0) 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* GRID DE FONDO con máscara y parallax sutil */}
      <div
        className="fixed inset-0 pointer-events-none z-0 grid-bg grid-bg-mask parallax-grid"
        aria-hidden="true"
      />

      {/* OBJETOS GEOMÉTRICOS CON PARALLAX */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{ height: "500vh" }}
        aria-hidden="true"
      >
        <div
          className="parallax-shape absolute opacity-50"
          style={{ top: "10vh", right: "5vw", "--f": -0.9, "--r": 0.12 }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="158" stroke="rgba(190,242,100,0.4)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="160" cy="160" r="120" stroke="rgba(190,242,100,0.25)" strokeWidth="1" />
            <circle cx="160" cy="160" r="80" stroke="rgba(190,242,100,0.15)" strokeWidth="1" />
          </svg>
        </div>

        <div
          className="parallax-shape absolute opacity-40"
          style={{ top: "60vh", left: "-5vw", "--f": -1.3, "--r": 0.18, "--base-rot": "45deg" }}
        >
          <div className="w-48 h-48 border border-amber-300/40 rounded-lg" />
        </div>

        <div
          className="parallax-shape absolute opacity-40"
          style={{ top: "120vh", left: "8vw", "--f": -0.75, "--r": -0.1 }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <polygon points="100,20 180,180 20,180" stroke="rgba(132,204,22,0.5)" strokeWidth="1" fill="none" />
            <polygon points="100,60 150,160 50,160" stroke="rgba(132,204,22,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div
          className="parallax-shape absolute opacity-50"
          style={{ top: "180vh", right: "10vw", "--f": -1.2 }}
        >
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border border-lime-300/30 spin-slow" />
            <div className="absolute inset-4 rounded-full border border-lime-300/20" />
            <div className="absolute inset-0 spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lime-300" />
            </div>
          </div>
        </div>

        <div
          className="parallax-shape absolute opacity-60"
          style={{ top: "240vh", left: "15vw", "--f": -1.6, "--r": 0.22 }}
        >
          <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-lime-300/40 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-lime-300/40 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-lime-300/60" />
          </div>
        </div>

        <div
          className="parallax-shape absolute opacity-45"
          style={{ top: "300vh", right: "8vw", "--f": -1.0, "--r": -0.15 }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180">
            <polygon
              points="90,10 160,50 160,130 90,170 20,130 20,50"
              stroke="rgba(190,242,100,0.4)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div
          className="parallax-shape absolute opacity-45"
          style={{ top: "400vh", left: "12vw", "--f": -1.4 }}
        >
          <div className="relative w-56 h-56">
            <div className="absolute inset-0 rounded-full border border-amber-300/30 pulse-ring" />
            <div className="absolute inset-6 rounded-full border border-amber-300/20" />
            <div className="absolute inset-12 rounded-full border border-amber-300/10" />
          </div>
        </div>
      </div>

      {/* SPOTLIGHT que sigue al mouse (posición vía --mx/--my) */}
      <div className="fixed inset-0 pointer-events-none z-[1] spotlight" aria-hidden="true" />

      <div className="noise" aria-hidden="true" />

      {/* CONTENIDO */}
      <div className="relative z-10">
        {/* NAV */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#070708]/60 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime-400 blink shadow-[0_0_8px_rgba(190,242,100,0.8)]" />
              <span className="text-zinc-400">marcos.griffa</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-100">portfolio</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-zinc-500">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => goTo(s)}
                  aria-current={activeSection === s ? "true" : undefined}
                  className={`hover:text-lime-300 transition-colors ${
                    activeSection === s ? "text-lime-300" : ""
                  }`}
                >
                  /{s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-zinc-500">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                <span>BUE · {time}</span>
              </div>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden text-zinc-300 hover:text-lime-300 transition-colors p-1"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* MENÚ MOBILE — antes el nav simplemente desaparecía bajo md */}
          {menuOpen && (
            <div
              id="menu-mobile"
              className="md:hidden border-t border-white/[0.06] bg-[#070708]/95 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col font-mono text-sm">
                {SECTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => goTo(s)}
                    aria-current={activeSection === s ? "true" : undefined}
                    className={`text-left py-3 border-b border-white/5 last:border-0 transition-colors ${
                      activeSection === s ? "text-lime-300" : "text-zinc-400"
                    }`}
                  >
                    /{s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section
          id="inicio"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32 lg:pt-32 lg:pb-48"
        >
          <div className="absolute top-16 left-6 right-6 lg:left-12 lg:right-12 h-px bg-white/5 overflow-hidden" aria-hidden="true">
            <div className="scan-line" />
          </div>

          <div className="font-mono text-xs text-zinc-500 mb-8 fade-up flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-lime-300" aria-hidden="true" />
              [001]
            </span>
            <span>analista de datos · estudiante de ciencia de datos · uba</span>
          </div>

          <h1
            className="font-display text-[clamp(3rem,11vw,10.5rem)] leading-[0.86] tracking-[-0.045em] fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Marcos
            <br />
            <span className="italic font-light shimmer-text">Griffa.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-7 lg:col-start-6">
              <p
                className="font-body text-lg lg:text-xl text-zinc-300 leading-relaxed fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                Trabajo el dato de punta a punta: lo <span className="text-lime-300">extraigo</span>,
                lo <span className="text-lime-300">modelo</span> en SQL y lo llevo a un tablero que
                responda preguntas concretas. Vengo del control portuario y la gestión operativa, así
                que el dato nunca es un fin en sí mismo: es lo que evita que una decisión dependa del
                ojo humano.
              </p>
              <div
                className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs fade-up"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="px-3 py-1.5 rounded-full border border-lime-300/30 text-lime-300 bg-lime-300/5 backdrop-blur-sm">
                  · disponible para trabajar
                </span>
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 backdrop-blur-sm">
                  sql · power bi
                </span>
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 backdrop-blur-sm">
                  python · automatización
                </span>
              </div>
            </div>
          </div>

          <div className="mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-white/5 pt-10">
            {[
              { num: "1", label: "producto propio en producción" },
              { num: "13", label: "medidas DAX · modelo dimensional" },
              { num: "6", label: "portales integrados en un pipeline" },
              { num: "2024", label: "presente · Surveyor en Ferrosider" },
            ].map((m, i) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <div className="font-display text-4xl lg:text-5xl text-zinc-100">{m.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-2">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section
          id="stack"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5"
        >
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <div className="font-mono text-xs text-zinc-500 mb-3">[002] · stack técnico</div>
              <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em]">
                Del dato crudo
                <br />
                <span className="italic text-stroke">a la decisión.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-[#070708]/80 p-8 lg:p-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/0 via-lime-300/0 to-lime-300/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-lg bg-lime-300/10 border border-lime-300/30 flex items-center justify-center">
                    <Database className="h-5 w-5 text-lime-300" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                      /01
                    </div>
                    <h3 className="font-display text-2xl">Análisis y visualización</h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                  Consultar, modelar y visualizar. La base que estudio en la UBA aplicada sobre la
                  base de datos de un producto propio en producción.
                </p>
                <ul className="space-y-3">
                  {dataSkills.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between border-b border-white/5 pb-3 hover:border-lime-300/30 transition-colors"
                    >
                      <span className="font-body text-zinc-200">{s.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#070708]/80 p-8 lg:p-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/0 via-amber-300/0 to-amber-300/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-lg bg-amber-300/10 border border-amber-300/30 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                      /02
                    </div>
                    <h3 className="font-display text-2xl">Ingeniería y automatización</h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                  Que el dato llegue solo hasta el tablero. Pipelines, APIs y procesos programados
                  para que el trabajo repetitivo desaparezca.
                </p>
                <ul className="space-y-3">
                  {automationSkills.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between border-b border-white/5 pb-3 hover:border-amber-300/30 transition-colors"
                    >
                      <span className="font-body text-zinc-200">{s.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 relative bg-gradient-to-r from-amber-300/10 via-lime-300/5 to-transparent border border-amber-300/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-300/20 border border-amber-300/40 flex items-center justify-center flex-shrink-0">
                <Brain className="h-5 w-5 text-amber-300" aria-hidden="true" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300/90 mb-2">
                  IA dentro del producto
                </div>
                <p className="font-body text-zinc-300 leading-relaxed">
                  En EmpatÍA los modelos no son un accesorio: son parte del pipeline. Un modelo de{" "}
                  <span className="text-amber-300">embeddings</span> filtra por significado sobre el
                  total de avisos, y un <span className="text-amber-300">LLM</span> analiza en
                  profundidad solo los finalistas. Esa separación en dos etapas es una decisión de
                  costo, no un detalle técnico: es lo que hace que cada búsqueda cueste centavos en
                  vez de dólares.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POWER BI */}
        <section
          id="bi"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5"
        >
          <div className="font-mono text-xs text-zinc-500 mb-3">[003] · business intelligence</div>
          <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em] mb-6">
            Un tablero sobre
            <br />
            <span className="italic text-lime-300">datos propios.</span>
          </h2>
          <p className="font-body text-zinc-300 leading-relaxed max-w-2xl mb-12">
            No es un dataset de curso: es la base de datos del producto que construí. Diseñé el
            modelo dimensional, escribí las vistas SQL que aplanan el JSON anidado y armé el tablero
            con sus medidas en DAX.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <a
                href="https://github.com/MarcosGriffa/job_scraping/tree/main/bi"
                target="_blank"
                rel="noreferrer"
                aria-label="Ver la documentación del dashboard de Power BI en GitHub"
                className="card-hover group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-lime-300/40 transition-colors bg-white/[0.02]"
              >
                <img
                  src={DASHBOARD_IMG}
                  alt="Dashboard de Power BI del proyecto EmpatÍA NextStep: cinco indicadores principales, evolución mensual de búsquedas, distribución de ofertas por portal, score promedio por área, dispersión de similitud contra score, ranking de skills y tabla de ofertas."
                  loading="lazy"
                  width="1280"
                  height="720"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 bg-[#070708]/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                    ver documentación del modelo
                  </span>
                  <ArrowUpRight className="arrow-icon h-5 w-5 text-lime-300 transition-transform duration-300 flex-shrink-0" aria-hidden="true" />
                </div>
              </a>
              <p className="font-mono text-[10px] text-zinc-500 mt-3 leading-relaxed">
                Los datos del tablero son sintéticos: el producto es nuevo y todavía no tiene volumen
                real de uso, así que generé un dataset con la forma exacta del modelo — mismas
                columnas, mismos portales, proporciones verosímiles. El modelo, las relaciones y las
                medidas son los que corren contra la base real.
              </p>
            </div>

            <div className="lg:col-span-4 order-1 lg:order-2 space-y-4">
              {biHighlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-lime-300/30 transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-lime-300/90 mb-2">
                    {h.k}
                  </div>
                  <div className="font-display text-xl mb-2">{h.v}</div>
                  <p className="font-body text-xs text-zinc-400 leading-relaxed">{h.d}</p>
                </div>
              ))}
              <div className="bg-lime-300/[0.06] border border-lime-300/25 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-lime-300" aria-hidden="true" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-lime-300/90">
                    el hallazgo
                  </div>
                </div>
                <p className="font-body text-xs text-zinc-300 leading-relaxed">
                  El campo de estado &quot;aplicado&quot; guardado en el JSON nunca se actualizaba:
                  usarlo habría dado cero aplicaciones siempre. El modelo lo ignora y cruza contra la
                  tabla de eventos, que sí registra la fecha real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section
          id="trabajo"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5"
        >
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <div className="font-mono text-xs text-zinc-500 mb-3">[004] · trabajo seleccionado</div>
              <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em]">
                Lo que <span className="italic text-lime-300">construí.</span>
              </h2>
            </div>
            <div className="hidden lg:block font-mono text-xs text-zinc-400">
              {projects.length.toString().padStart(2, "0")} proyectos · ver en{" "}
              <a
                href="https://github.com/MarcosGriffa"
                target="_blank"
                rel="noreferrer"
                className="text-lime-300 hover:underline"
              >
                github
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => {
              const Icon = p.icon;

              if (p.featured) {
                return (
                  <div
                    key={p.id}
                    className={`card-hover group relative ${p.span} bg-gradient-to-br from-lime-300/[0.07] via-white/[0.03] to-transparent backdrop-blur-sm border border-lime-300/25 rounded-2xl p-8 lg:p-10 overflow-hidden hover:border-lime-300/60 transition-all duration-500 fade-up`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="glow-spot absolute -top-40 -right-40 h-80 w-80 rounded-full bg-lime-300/15 blur-3xl opacity-0 transition-opacity duration-700" aria-hidden="true" />
                    <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-lime-300/80 border border-lime-300/30 rounded-full px-3 py-1 bg-lime-300/5">
                      · en producción
                    </div>

                    <div className="relative flex items-start justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg border border-lime-300/40 bg-lime-300/10 flex items-center justify-center group-hover:bg-lime-300/20 transition-colors">
                          <Icon className="h-5 w-5 text-lime-300" aria-hidden="true" />
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                          {p.id} · {p.kicker}
                        </div>
                      </div>
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] mb-4">
                          {p.title}
                        </h3>
                        <p className="font-body text-zinc-300 leading-relaxed mb-4">{p.result}</p>
                        <p className="font-body text-sm text-zinc-400 leading-relaxed mb-6">
                          {p.detail}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full bg-lime-300 text-black hover:bg-lime-200 transition-colors"
                          >
                            ver el sitio
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-white/15 text-zinc-300 hover:border-lime-300/40 hover:text-lime-300 transition-colors"
                          >
                            código
                            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-6">
                        <div className="grid grid-cols-3 gap-3">
                          {p.features.map((feat) => (
                            <div
                              key={feat.label}
                              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3"
                            >
                              <div className="font-mono text-[9px] uppercase tracking-widest text-lime-300/80 mb-1">
                                {feat.label}
                              </div>
                              <div className="font-body text-xs text-zinc-300">{feat.desc}</div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                          <div>
                            <div className="font-display text-4xl text-lime-300">{p.metric}</div>
                            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-1 max-w-[180px]">
                              {p.metricLabel}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 justify-end max-w-[55%]">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] px-2 py-1 rounded-md bg-lime-300/5 border border-lime-300/15 text-zinc-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} — ver en GitHub`}
                  className={`card-hover group relative ${p.span} bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 overflow-hidden hover:border-lime-300/40 transition-all duration-500 fade-up block`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="glow-spot absolute -top-32 -right-32 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl opacity-0 transition-opacity duration-700" aria-hidden="true" />

                  <div className="relative flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-lime-300/40 group-hover:bg-lime-300/10 transition-colors">
                        <Icon className="h-4 w-4 text-zinc-300 group-hover:text-lime-300 transition-colors" aria-hidden="true" />
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                        {p.id} · {p.kicker}
                      </div>
                    </div>
                    <ArrowUpRight className="arrow-icon h-5 w-5 text-zinc-500 group-hover:text-lime-300 transition-all duration-300" aria-hidden="true" />
                  </div>

                  <h3 className="relative font-display text-3xl lg:text-4xl tracking-[-0.02em] mb-4">
                    {p.title}
                  </h3>

                  <p className="relative font-body text-zinc-300 leading-relaxed mb-4">{p.result}</p>
                  <p className="relative font-body text-sm text-zinc-400 leading-relaxed mb-8">
                    {p.detail}
                  </p>

                  <div className="relative flex items-end justify-between mt-auto pt-6 border-t border-white/5">
                    <div>
                      <div className="font-display text-3xl text-lime-300">{p.metric}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-1 max-w-[180px]">
                        {p.metricLabel}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5">
          <div className="font-mono text-xs text-zinc-500 mb-3">[005] · trayectoria</div>
          <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em] mb-16">
            Del puerto
            <br />
            <span className="italic">al pipeline.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <p className="font-body text-zinc-400 leading-relaxed">
                Mi recorrido combina operaciones de alta exigencia con la formación técnica que estoy
                construyendo en la UBA. Lo operativo me dio el ojo para detectar desvíos; lo técnico,
                las herramientas para resolverlos a escala.
              </p>
            </div>

            <div className="lg:col-span-9 space-y-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
              {[
                {
                  role: "Surveyor / Control de Operaciones",
                  company: "Ferrosider · Puerto Dock Sud",
                  period: "Oct 2024 — Actualidad",
                  desc: "Reporting operativo para gerencia y clientes externos. Registro y mantenimiento de bases de datos críticas para el seguimiento de procesos portuarios. Detección de desvíos en procedimientos de control y propuesta de mejoras basadas en datos.",
                  icon: Anchor,
                },
                {
                  role: "Desarrollo web y automatización",
                  company: "Freelance · Pymes",
                  period: "2024 — Actualidad",
                  desc: "Sitios institucionales de punta a punta para Estudio Griffa (firma marítima con más de 60 años), Sector Fogonero y Rosgrif: diseño, desarrollo, deploy y CI/CD desde GitHub. Automatizaciones a medida en n8n con integraciones a Forms, Sheets y Gmail API.",
                  icon: Code2,
                },
                {
                  role: "Gerente de Operaciones",
                  company: "Cadena de alimentos",
                  period: "Oct 2025 — Mar 2026",
                  desc: "Coordinación de equipo y organización de la operativa diaria contra objetivos y cronogramas. Gestión de registros administrativos y reportes de caja para control interno.",
                  icon: Users,
                },
              ].map((j, i) => {
                const Icon = j.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#070708]/80 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start hover:bg-[#0d0d0e]/80 transition-colors"
                  >
                    <div className="lg:col-span-1">
                      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <h3 className="font-display text-2xl">{j.role}</h3>
                      <div className="font-mono text-xs text-zinc-400 mt-1">{j.company}</div>
                      <p className="font-body text-sm text-zinc-400 mt-3 leading-relaxed">{j.desc}</p>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <span className="font-mono text-xs text-zinc-400">{j.period}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section
          id="sobre-mi"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5"
        >
          <div className="font-mono text-xs text-zinc-500 mb-3">[006] · más allá del código</div>
          <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em] mb-16">
            12 años en cancha,
            <br />
            <span className="italic text-lime-300">los mismos en equipo.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="font-body text-lg text-zinc-300 leading-relaxed mb-6">
                Practico rugby competitivamente desde los 10 años. Doce años sostenidos en el mismo
                deporte no son una anécdota: son disciplina, compromiso colectivo y la capacidad de
                aguantar presión cuando el resultado depende del equipo.
              </p>
              <p className="font-body text-zinc-400 leading-relaxed">
                Eso es lo que llevo a cada proyecto:{" "}
                <span className="text-lime-300">no busco brillar solo</span>, busco que el sistema
                funcione. Y cuando algo se rompe, no es &quot;culpa de alguien&quot;, es algo que el
                equipo soluciona junto.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Trophy,
                  title: "Disciplina",
                  desc: "Entrenamiento sostenido durante más de una década, en paralelo a trabajo y estudio.",
                },
                {
                  icon: Users,
                  title: "Trabajo en equipo",
                  desc: "Coordinación con compañeros bajo presión y comunicación clara en jugadas complejas.",
                },
                {
                  icon: Target,
                  title: "Compromiso",
                  desc: "Cumplir con el rol asignado aunque no sea el más visible. Confianza ganada con consistencia.",
                },
                {
                  icon: Zap,
                  title: "Mentalidad competitiva",
                  desc: "Aceptar el error, ajustar y volver a intentar. Cada partido es una iteración.",
                },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-lime-300/30 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-lime-300 mb-3" aria-hidden="true" />
                    <h3 className="font-display text-lg mb-1.5">{v.title}</h3>
                    <p className="font-body text-xs text-zinc-400 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5"
        >
          <div className="font-mono text-xs text-zinc-500 mb-3">[007] · contacto</div>
          <h2 className="font-display text-6xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
            ¿Tenés un dato
            <br />
            <span className="italic text-lime-300">esperando</span> a ser
            <br />
            <span className="text-stroke">analizado?</span>
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <a
              href="mailto:marcosgriffa04@gmail.com"
              className="group relative flex h-full flex-col justify-between bg-lime-300 text-black rounded-2xl p-8 lg:p-10 overflow-hidden hover:bg-lime-200 transition-colors glow-lime"
            >
              <div className="flex items-center justify-between mb-8">
                <Mail className="h-6 w-6" aria-hidden="true" />
                <ArrowUpRight className="h-6 w-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-2">
                  email directo
                </div>
                <div className="font-display text-2xl lg:text-3xl break-all">
                  marcosgriffa04@gmail.com
                </div>
              </div>
            </a>

            {/* Solo GitHub y LinkedIn. Las dos tarjetas se estiran a la
                altura de la del mail (h-full + justify-between) para que no
                quede hueco donde antes estaba el botón del teléfono. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <a
                href="https://github.com/MarcosGriffa"
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-h-[10rem] hover:border-lime-300/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center justify-between">
                  <Code2 className="h-5 w-5 text-zinc-300" aria-hidden="true" />
                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-600 group-hover:text-lime-300 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    github
                  </div>
                  <div className="font-display text-lg">MarcosGriffa</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/marcos-griffa-605aa3259"
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-h-[10rem] hover:border-lime-300/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center justify-between">
                  <Briefcase className="h-5 w-5 text-zinc-300" aria-hidden="true" />
                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-600 group-hover:text-lime-300 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    linkedin
                  </div>
                  <div className="font-display text-lg">marcos-griffa</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>© {new Date().getFullYear()} — Marcos Alejo Griffa · Buenos Aires, AR</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 blink" aria-hidden="true" />
            <span>portfolio v4.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
