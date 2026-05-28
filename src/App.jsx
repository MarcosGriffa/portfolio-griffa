import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Briefcase,
  Mail,
  Phone,
  ArrowUpRight,
  Database,
  Workflow,
  TrendingUp,
  Terminal,
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
  Bot,
  Search,
} from "lucide-react";

export default function App() {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

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

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const dataSkills = [
    { name: "Python", level: "Avanzado" },
    { name: "SQL / SQLite", level: "Intermedio" },
    { name: "Pandas", level: "Intermedio" },
    { name: "BeautifulSoup", level: "Intermedio" },
    { name: "Excel Avanzado", level: "Avanzado" },
    { name: "Streamlit", level: "Básico" },
    { name: "Estadística", level: "En curso · UBA" },
  ];

  const automationSkills = [
    { name: "n8n", level: "Avanzado" },
    { name: "Claude / IA Workflows", level: "Avanzado" },
    { name: "Webhooks", level: "Intermedio" },
    { name: "Google Sheets API", level: "Intermedio" },
    { name: "Gmail API", level: "Intermedio" },
    { name: "JavaScript (ETL)", level: "Intermedio" },
    { name: "Task Scheduler", level: "Intermedio" },
  ];

  const projects = [
    {
      id: "00",
      title: "Job Scraping Pipeline",
      kicker: "IA · Scraping · Bot Telegram",
      icon: Bot,
      span: "lg:col-span-3",
      featured: true,
      tags: ["Python", "BeautifulSoup4", "Groq / LLaMA 3.3", "SQLite", "Telegram Bot", "Node.js"],
      link: "https://github.com/MarcosGriffa/job_scraping",
      result:
        "Pipeline end-to-end que extrae ofertas IT junior de Argentina, las rankea con IA contra el perfil del candidato y genera CVs personalizados en .docx, todo controlado desde un bot de Telegram.",
      detail:
        "Scraping de Computrabajo → enriquecimiento con LLaMA 3.3 via Groq para detectar stack y seniority → ranking por keyword matching → Top 10 notificado por Telegram → CV adaptado para cada oferta seleccionada generado en Node.js.",
      metric: "Top 10",
      metricLabel: "empleos rankeados con IA por día",
    },
    {
      id: "01",
      title: "Estudio Griffa",
      kicker: "Transformación digital",
      icon: Globe,
      span: "lg:col-span-2",
      tags: ["Jamstack", "Tailwind", "Netlify", "Formspree"],
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
      title: "Las Dellas",
      kicker: "E-commerce automation",
      icon: ShoppingBag,
      span: "lg:col-span-1",
      tags: ["n8n", "JavaScript", "Sheets", "Gmail API"],
      link: "https://github.com/MarcosGriffa/Las_Dellas-Automatizaci-n",
      result:
        "Backend automatizado que elimina el 100% de la carga administrativa manual en un emprendimiento textil.",
      detail:
        "Orquestador en n8n que conecta Google Forms con lógica de negocio en JavaScript, confirmación automática por mail y feedback loop a Sheets.",
      metric: "100%",
      metricLabel: "del proceso manual eliminado",
    },
    {
      id: "03",
      title: "ML Price Pipeline",
      kicker: "Web scraping & datos",
      icon: TrendingUp,
      span: "lg:col-span-1",
      tags: ["Python", "BeautifulSoup", "SQLite", "n8n"],
      link: "https://github.com/MarcosGriffa/web-scraping-ML",
      result:
        "Sistema end-to-end que monitorea precios de notebooks en Mercado Libre, almacena histórico en SQL y dispara reportes HTML profesionales.",
      detail:
        "ETL con Python y Pandas, persistencia en SQLite, orquestación remota con n8n vía webhooks de producción y visualización en Streamlit.",
      metric: "24/7",
      metricLabel: "monitoreo autónomo programado",
    },
    {
      id: "04",
      title: "Buscaminas + Batalla Naval",
      kicker: "Deep Python · Lógica pura",
      icon: Target,
      span: "lg:col-span-2",
      tags: ["Python", "Recursividad", "Matrices", "I/O"],
      link: "https://github.com/MarcosGriffa/Buscaminas",
      result:
        "Dos implementaciones algorítmicas completas (Buscaminas y Batalla Naval) que demuestran dominio sólido de estructuras de datos, recursividad y persistencia de estado.",
      detail:
        "Buscaminas: recursividad para revelado en cadena y verificación cruzada entre tableros real/visible. Batalla Naval: matrices, validación de coordenadas y gestión de estado en archivos.",
      metric: "2",
      metricLabel: "juegos clásicos implementados desde cero",
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
        @keyframes float-slow-4 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          40% { transform: translate(-80px, -40px) scale(0.95); }
          70% { transform: translate(50px, 70px) scale(1.1); }
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
        @keyframes spin-slow-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes bounce-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        .fade-up { animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .blink { animation: blink 1.5s ease-in-out infinite; }
        .aurora-1 { animation: float-slow 20s ease-in-out infinite; }
        .aurora-2 { animation: float-slow-2 25s ease-in-out infinite; }
        .aurora-3 { animation: float-slow-3 18s ease-in-out infinite; }
        .aurora-4 { animation: float-slow-4 30s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 40s linear infinite; }
        .spin-slow-rev { animation: spin-slow-rev 60s linear infinite; }
        .float-y { animation: float-y 8s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 4s ease-in-out infinite; }
        .bounce-y { animation: bounce-y 2s ease-in-out infinite; }

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

        .parallax-shape { will-change: transform; }
      `}</style>

      {/* ── FONDO GLOBAL: 4 auroras con hue-rotate ligado al scroll ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ filter: `hue-rotate(${Math.min(scrollY * 0.014, 75)}deg)` }}
      >
        {/* Aurora 1 — Lima top-left */}
        <div
          className="absolute aurora-1 rounded-full"
          style={{
            top: "-15%", left: "-10%",
            width: "55vw", height: "55vw",
            background: "radial-gradient(circle, rgba(190,242,100,0.30) 0%, rgba(190,242,100,0) 60%)",
            filter: "blur(60px)",
          }}
        />
        {/* Aurora 2 — Cian right */}
        <div
          className="absolute aurora-2 rounded-full"
          style={{
            top: "15%", right: "-15%",
            width: "60vw", height: "60vw",
            background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0) 60%)",
            filter: "blur(70px)",
          }}
        />
        {/* Aurora 3 — Violeta center */}
        <div
          className="absolute aurora-3 rounded-full"
          style={{
            top: "55%", left: "20%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0) 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* Aurora 4 — Amber bottom-right */}
        <div
          className="absolute aurora-4 rounded-full"
          style={{
            bottom: "-20%", right: "10%",
            width: "48vw", height: "48vw",
            background: "radial-gradient(circle, rgba(251,191,36,0.20) 0%, rgba(251,191,36,0) 60%)",
            filter: "blur(75px)",
          }}
        />
      </div>

      {/* GRID DE FONDO con parallax */}
      <div
        className="fixed inset-0 pointer-events-none z-0 grid-bg grid-bg-mask"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      />

      {/* ── OBJETOS GEOMÉTRICOS CON PARALLAX — colores variados ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" style={{ height: "500vh" }}>

        {/* Anillo — LIMA */}
        <div
          className="parallax-shape absolute opacity-50"
          style={{
            top: "10vh", right: "5vw",
            transform: `translateY(${scrollY * -0.9}px) rotate(${scrollY * 0.12}deg)`,
          }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="158" stroke="rgba(190,242,100,0.5)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="160" cy="160" r="120" stroke="rgba(190,242,100,0.30)" strokeWidth="1" />
            <circle cx="160" cy="160" r="80"  stroke="rgba(190,242,100,0.18)" strokeWidth="1" />
          </svg>
        </div>

        {/* Cuadrado — VIOLETA */}
        <div
          className="parallax-shape absolute opacity-40"
          style={{
            top: "60vh", left: "-5vw",
            transform: `translateY(${scrollY * -1.3}px) rotate(${45 + scrollY * 0.18}deg)`,
          }}
        >
          <div className="w-48 h-48 border border-violet-400/50 rounded-lg" />
        </div>

        {/* Triángulo — CIAN */}
        <div
          className="parallax-shape absolute opacity-45"
          style={{
            top: "120vh", left: "8vw",
            transform: `translateY(${scrollY * -0.75}px) rotate(${-scrollY * 0.10}deg)`,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <polygon points="100,20 180,180 20,180" stroke="rgba(34,211,238,0.60)" strokeWidth="1" fill="none" />
            <polygon points="100,60 150,160 50,160" stroke="rgba(34,211,238,0.35)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Anillo orbital — LIMA */}
        <div
          className="parallax-shape absolute opacity-50"
          style={{
            top: "180vh", right: "10vw",
            transform: `translateY(${scrollY * -1.2}px)`,
          }}
        >
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border border-lime-300/35 spin-slow" />
            <div className="absolute inset-4 rounded-full border border-lime-300/20" />
            <div className="absolute inset-0 spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lime-300" />
            </div>
          </div>
        </div>

        {/* Cruz — ROSA */}
        <div
          className="parallax-shape absolute opacity-60"
          style={{
            top: "240vh", left: "15vw",
            transform: `translateY(${scrollY * -1.6}px) rotate(${scrollY * 0.22}deg)`,
          }}
        >
          <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-pink-300/55 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink-300/55 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-300/70" />
          </div>
        </div>

        {/* Hexágono — CIAN */}
        <div
          className="parallax-shape absolute opacity-45"
          style={{
            top: "300vh", right: "8vw",
            transform: `translateY(${scrollY * -1.0}px) rotate(${scrollY * -0.15}deg)`,
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180">
            <polygon
              points="90,10 160,50 160,130 90,170 20,130 20,50"
              stroke="rgba(34,211,238,0.55)"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="90,35 140,62 140,118 90,145 40,118 40,62"
              stroke="rgba(34,211,238,0.25)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Líneas verticales — VIOLETA */}
        <div
          className="parallax-shape absolute opacity-45"
          style={{
            top: "350vh", left: "50%",
            transform: `translateX(-50%) translateY(${scrollY * -0.65}px)`,
          }}
        >
          <div className="flex gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-px bg-gradient-to-b from-transparent via-violet-400/50 to-transparent"
                style={{ height: `${80 + i * 20}px` }}
              />
            ))}
          </div>
        </div>

        {/* Círculos concéntricos — AMBER */}
        <div
          className="parallax-shape absolute opacity-45"
          style={{
            top: "400vh", left: "12vw",
            transform: `translateY(${scrollY * -1.4}px)`,
          }}
        >
          <div className="relative w-56 h-56">
            <div className="absolute inset-0  rounded-full border border-amber-300/40 pulse-ring" />
            <div className="absolute inset-6  rounded-full border border-amber-300/25" />
            <div className="absolute inset-12 rounded-full border border-amber-300/12" />
          </div>
        </div>
      </div>

      {/* SPOTLIGHT */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(190,242,100,0.06), transparent 50%)`,
        }}
      />

      <div className="noise" />

      {/* ──────────────── CONTENIDO ──────────────── */}
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
              {["inicio", "stack", "trabajo", "sobre-mi", "contacto"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setActiveSection(s);
                    document.getElementById(s)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`hover:text-lime-300 transition-colors ${activeSection === s ? "text-lime-300" : ""}`}
                >
                  /{s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <MapPin className="h-3 w-3" />
              <span>BUE · {time}</span>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section
          id="inicio"
          className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32 lg:pt-32 lg:pb-48"
        >
          <div className="absolute top-16 left-6 right-6 lg:left-12 lg:right-12 h-px bg-white/5 overflow-hidden">
            <div className="scan-line" />
          </div>

          <div className="font-mono text-xs text-zinc-500 mb-8 fade-up flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-lime-300" />
              [001]
            </span>
            <span>estudiante de ciencia de datos · uba</span>
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
                Construyo puentes entre la <span className="text-lime-300">operación</span> y el{" "}
                <span className="text-lime-300">dato</span>. Vengo del campo —control portuario y
                gestión operativa— y hoy combino Python, SQL e IA para que los procesos dejen de
                depender del ojo humano.
              </p>
              <div
                className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs fade-up"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="px-3 py-1.5 rounded-full border border-lime-300/30 text-lime-300 bg-lime-300/5 backdrop-blur-sm">
                  · disponible para proyectos
                </span>
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 backdrop-blur-sm">
                  data science
                </span>
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 backdrop-blur-sm">
                  automatización + IA
                </span>
              </div>
            </div>
          </div>

          <div className="mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-white/5 pt-10">
            {[
              { num: "1°",   label: "año · Lic. Ciencia de Datos · UBA" },
              { num: "12+",  label: "años de rugby competitivo" },
              { num: "5",    label: "proyectos end-to-end" },
              { num: "2024", label: "presente · Surveyor en Ferrosider" },
            ].map((m, i) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <div className="font-display text-4xl lg:text-5xl text-zinc-100">{m.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-2">
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
                Dos disciplinas,
                <br />
                <span className="italic text-stroke">un solo lenguaje.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-[#070708]/80 p-8 lg:p-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/0 via-lime-300/0 to-lime-300/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-lg bg-lime-300/10 border border-lime-300/30 flex items-center justify-center">
                    <Database className="h-5 w-5 text-lime-300" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/01</div>
                    <h3 className="font-display text-2xl">Data Science</h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                  Extracción, limpieza, modelado y visualización. La base que estudio en la UBA
                  aplicada a problemas reales de negocio.
                </p>
                <ul className="space-y-3">
                  {dataSkills.map((s, i) => (
                    <li key={i} className="flex items-baseline justify-between border-b border-white/5 pb-3 hover:border-lime-300/30 transition-colors">
                      <span className="font-body text-zinc-200">{s.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{s.level}</span>
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
                    <Workflow className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/02</div>
                    <h3 className="font-display text-2xl">Automatización + IA</h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                  Orquestar flujos para que el trabajo repetitivo desaparezca. APIs, webhooks y
                  modelos de IA integrados al pipeline.
                </p>
                <ul className="space-y-3">
                  {automationSkills.map((s, i) => (
                    <li key={i} className="flex items-baseline justify-between border-b border-white/5 pb-3 hover:border-amber-300/30 transition-colors">
                      <span className="font-body text-zinc-200 flex items-center gap-2">
                        {s.name}
                        {s.name.includes("Claude") && <Brain className="h-3 w-3 text-amber-300" />}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 relative bg-gradient-to-r from-amber-300/10 via-lime-300/5 to-transparent border border-amber-300/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/10 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-300/20 border border-amber-300/40 flex items-center justify-center flex-shrink-0">
                <Brain className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300/80 mb-2">
                  IA aplicada al trabajo
                </div>
                <p className="font-body text-zinc-300 leading-relaxed">
                  Uso <span className="text-amber-300">Claude</span> e integraciones con LLMs como
                  parte central de mi flujo: análisis de datos asistido, generación de queries SQL,
                  diseño de pipelines en n8n, prototipado rápido y documentación técnica. La IA no
                  reemplaza el criterio, lo multiplica.
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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="font-mono text-xs text-zinc-500 mb-3 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 blink" />
                [003] · trabajo seleccionado
              </div>
              <h2
                className="font-display leading-[0.88] tracking-[-0.04em]"
                style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
              >
                Lo que
                <br />
                <span className="italic text-lime-300">construí.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-500 pb-2">
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

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => {
              const Icon = p.icon;

              if (p.featured) {
                return (
                  <a
                    key={p.id}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`card-hover group relative ${p.span} bg-gradient-to-br from-lime-300/[0.07] via-white/[0.03] to-transparent backdrop-blur-sm border border-lime-300/25 rounded-2xl p-8 lg:p-10 overflow-hidden hover:border-lime-300/60 transition-all duration-500 cursor-pointer fade-up block`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="glow-spot absolute -top-40 -right-40 h-80 w-80 rounded-full bg-lime-300/15 blur-3xl opacity-0 transition-opacity duration-700" />
                    <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-lime-300/70 border border-lime-300/30 rounded-full px-3 py-1 bg-lime-300/5">
                      · proyecto destacado
                    </div>

                    <div className="relative flex items-start justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg border border-lime-300/40 bg-lime-300/10 flex items-center justify-center group-hover:bg-lime-300/20 transition-colors">
                          <Icon className="h-5 w-5 text-lime-300" />
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                          {p.id} · {p.kicker}
                        </div>
                      </div>
                      <ArrowUpRight className="arrow-icon h-5 w-5 text-zinc-600 group-hover:text-lime-300 transition-all duration-300 mt-6" />
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] mb-4">
                          {p.title}
                        </h3>
                        <p className="font-body text-zinc-300 leading-relaxed mb-4">{p.result}</p>
                        <p className="font-body text-sm text-zinc-500 leading-relaxed">{p.detail}</p>
                      </div>

                      <div className="flex flex-col justify-between gap-6">
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "scraping", desc: "Computrabajo AR" },
                            { label: "IA/LLM",   desc: "LLaMA 3.3 · Groq" },
                            { label: "entrega",  desc: "Bot Telegram" },
                          ].map((feat) => (
                            <div key={feat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
                              <div className="font-mono text-[9px] uppercase tracking-widest text-lime-300/70 mb-1">{feat.label}</div>
                              <div className="font-body text-xs text-zinc-300">{feat.desc}</div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                          <div>
                            <div className="font-display text-4xl text-lime-300">{p.metric}</div>
                            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-1 max-w-[180px]">
                              {p.metricLabel}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 justify-end max-w-[55%]">
                            {p.tags.map((t) => (
                              <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-lime-300/5 border border-lime-300/15 text-zinc-400">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              }

              return (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`card-hover group relative ${p.span} bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 overflow-hidden hover:border-lime-300/40 transition-all duration-500 cursor-pointer fade-up block`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="glow-spot absolute -top-32 -right-32 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl opacity-0 transition-opacity duration-700" />

                  <div className="relative flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-lime-300/40 group-hover:bg-lime-300/10 transition-colors">
                        <Icon className="h-4 w-4 text-zinc-300 group-hover:text-lime-300 transition-colors" />
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        {p.id} · {p.kicker}
                      </div>
                    </div>
                    <ArrowUpRight className="arrow-icon h-5 w-5 text-zinc-600 group-hover:text-lime-300 transition-all duration-300" />
                  </div>

                  <h3 className="relative font-display text-3xl lg:text-4xl tracking-[-0.02em] mb-4">{p.title}</h3>
                  <p className="relative font-body text-zinc-300 leading-relaxed mb-4">{p.result}</p>
                  <p className="relative font-body text-sm text-zinc-500 leading-relaxed mb-8">{p.detail}</p>

                  <div className="relative flex items-end justify-between mt-auto pt-6 border-t border-white/5">
                    <div>
                      <div className="font-display text-3xl text-lime-300">{p.metric}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-1 max-w-[180px]">
                        {p.metricLabel}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
                      {p.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-zinc-400">
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
          <div className="font-mono text-xs text-zinc-500 mb-3">[004] · trayectoria</div>
          <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.03em] mb-16">
            Del puerto
            <br />
            <span className="italic">al pipeline.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <p className="font-body text-zinc-400 leading-relaxed">
                Mi recorrido combina operaciones de alta exigencia con la formación técnica que
                estoy construyendo en la UBA. Lo operativo me dio el ojo para detectar desvíos; lo
                técnico, las herramientas para resolverlos a escala.
              </p>
            </div>

            <div className="lg:col-span-9 space-y-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
              {[
                {
                  role: "Surveyor / Control de Operaciones",
                  company: "Ferrosider · Puerto Dock Sud",
                  period: "Oct 2024 — Actualidad",
                  desc: "Registro y mantenimiento de bases de datos críticas para seguimiento portuario. Reporting para gerencia y clientes externos. Detección de desvíos en procedimientos de control y propuestas de mejora basadas en precisión de datos.",
                  icon: Anchor,
                },
                {
                  role: "Liderazgo Operativo",
                  company: "Sector Gastronómico · Rol de Coordinación",
                  period: "Oct 2025 — Mar 2026",
                  desc: "Coordinación de equipo y operativa diaria, gestión de registros administrativos y reportes de caja, resolución de consultas y reclamos bajo alta demanda. Experiencia formativa en gestión de personas y comunicación entre áreas.",
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
                        <Icon className="h-4 w-4 text-zinc-400" />
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <h3 className="font-display text-2xl">{j.role}</h3>
                      <div className="font-mono text-xs text-zinc-500 mt-1">{j.company}</div>
                      <p className="font-body text-sm text-zinc-400 mt-3 leading-relaxed">{j.desc}</p>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <span className="font-mono text-xs text-zinc-500">{j.period}</span>
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
          <div className="font-mono text-xs text-zinc-500 mb-3">[005] · más allá del código</div>
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
                funcione. Y cuando algo se rompe, no es "culpa de alguien", es algo que el equipo
                soluciona junto.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {[
                { icon: Trophy, title: "Disciplina",           desc: "Entrenamiento sostenido durante más de una década, en paralelo a trabajo y estudio." },
                { icon: Users,  title: "Trabajo en equipo",    desc: "Coordinación con compañeros bajo presión y comunicación clara en jugadas complejas." },
                { icon: Target, title: "Compromiso",           desc: "Cumplir con el rol asignado aunque no sea el más visible. Confianza ganada con consistencia." },
                { icon: Zap,    title: "Mentalidad competitiva", desc: "Aceptar el error, ajustar y volver a intentar. Cada partido es una iteración." },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-lime-300/30 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-lime-300 mb-3" />
                    <h4 className="font-display text-lg mb-1.5">{v.title}</h4>
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
          <div className="font-mono text-xs text-zinc-500 mb-3">[006] · contacto</div>
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
              className="group relative bg-lime-300 text-black rounded-2xl p-8 lg:p-10 overflow-hidden hover:bg-lime-200 transition-colors glow-lime"
            >
              <div className="flex items-center justify-between mb-8">
                <Mail className="h-6 w-6" />
                <ArrowUpRight className="h-6 w-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-2">email directo</div>
              <div className="font-display text-2xl lg:text-3xl">marcosgriffa04@gmail.com</div>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://github.com/MarcosGriffa" target="_blank" rel="noreferrer"
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-300/40 hover:bg-white/[0.07] transition-all">
                <Code2 className="h-5 w-5 mb-6 text-zinc-300" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">github</div>
                <div className="font-display text-lg">MarcosGriffa</div>
              </a>
              <a href="https://linkedin.com/in/marcos-griffa-605aa3259" target="_blank" rel="noreferrer"
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-300/40 hover:bg-white/[0.07] transition-all">
                <Briefcase className="h-5 w-5 mb-6 text-zinc-300" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">linkedin</div>
                <div className="font-display text-lg">marcos-griffa</div>
              </a>
              <a href="tel:+541161428659"
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-300/40 hover:bg-white/[0.07] transition-all col-span-full">
                <Phone className="h-5 w-5 mb-6 text-zinc-300" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">teléfono</div>
                <div className="font-display text-lg">+54 11 6142-8659</div>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>© 2026 — Marcos Alejo Griffa · Buenos Aires, AR</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 blink" />
            <span>portfolio v3.0 · build · {new Date().getFullYear()}.11</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
