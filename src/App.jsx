/**
 * IngDevs Digital Solutions — Landing Page v5.0
 * Cambios v5:
 *  - Tema azul oscuro corporativo (fondos bg-[#0A0F1E] y variantes)
 *  - Sección proyectos reorganizada: galería 3 imágenes + clínica con screenshots
 *  - Sistema ERP nuevo como proyecto destacado
 *  - Formulario de contacto con EmailJS → llega a ingdevdigitalsolutions@gmail.com
 *  - Imágenes en alta definición con efectos visuales mejorados
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Menu, X, ChevronRight, Calendar, Package, Zap, Clock,
  Globe, MapPin, MessageCircle, Instagram, ArrowUpRight,
  Shield, Star, Cpu, Headphones, MonitorCheck,
  Code2, Layers, Users, CheckCircle2, Send, Loader2,
  BarChart3, Mail,
} from "lucide-react";

// ── Assets ──────────────────────────────────────────────────
import imgLogo        from "./assets/logo.png";
import imgHero        from "./assets/hero.png";
import imgHero2       from "./assets/publicidad2.png";
import imgCodeReact   from "./assets/code_react.png";
import imgInventario  from "./assets/proj_inventario.png";
import imgPanel       from "./assets/proj_panel.png";
import imgLogin       from "./assets/proj_login.png";
import imgLogin2      from "./assets/proj_login2.png";
import imgErp         from "./assets/proj_erp.png";
import imgOregon1     from "./assets/proj_oregon1.png";
import imgOregon2     from "./assets/proj_oregon2.png";
import imgOregon3     from "./assets/proj_oregon3.png";
import imgInterfaz    from "./assets/proj_interfaz.png";
import imgAdmin       from "./assets/proj_admin.png";
import imgM365        from "./assets/microsoft365.png";

// ── Config ──────────────────────────────────────────────────
const WA  = "https://wa.me/56987134632?text=Hola%20IngDevs,%20necesito%20informaci%C3%B3n%20sobre...";
const IG  = "https://www.instagram.com/ingdev_digital_solutions/";
const EMAIL = "ingdevdigitalsolutions@gmail.com";
const LOC = "Osorno, Chile";

// ── EmailJS — reemplaza con tus credenciales reales ──────────
// Instrucciones al final del archivo
const EMAILJS_SERVICE  = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE = "TU_TEMPLATE_ID";
const EMAILJS_KEY      = "TU_PUBLIC_KEY";

// ── Colores del tema azul oscuro ─────────────────────────────
// bg principal:   #0A0F1E
// bg secundario:  #0D1526
// bg cards:       #111827
// bg secciones:   #0F172A
// acento:         cyan-400 / blue-500

// ── Nav ─────────────────────────────────────────────────────
const NAV = [
  { label: "Inicio",        href: "#inicio"    },
  { label: "Proyectos",     href: "#proyectos" },
  { label: "Servicios",     href: "#servicios" },
  { label: "Microsoft 365", href: "#m365"      },
  { label: "Nosotros",      href: "#nosotros"  },
  { label: "Contacto",      href: "#contacto"  },
];

// ── Servicios ───────────────────────────────────────────────
const SERVICES = [
  { icon: Calendar,     title: "Gestión para Clínicas",      sub: "Agendamiento Web",           desc: "Agendamiento online, ficha de pacientes y recordatorios automáticos.",        color: "#3B82F6" },
  { icon: Package,      title: "Inventario y Ventas",         sub: "Control Total",              desc: "Stock en tiempo real, punto de venta, facturación y reportes integrados.",    color: "#06B6D4" },
  { icon: Zap,          title: "Automatización Empresarial",  sub: "BPA & Workflows",            desc: "Flujos automáticos que eliminan tareas manuales y conectan tus sistemas.",    color: "#6366F1" },
  { icon: Clock,        title: "Control de Asistencia",       sub: "Personalizado",              desc: "Registro QR/PIN, reportes de RRHH y soporte multi-sucursal.",                 color: "#0891B2" },
  { icon: Globe,        title: "Desarrollo Web Profesional",  sub: "Landing & Portales",         desc: "Sitios responsive, SEO técnico y diseño de alto impacto para tu marca.",      color: "#3B82F6" },
  { icon: Cpu,          title: "Software a Medida",           sub: "Tu idea, nuestra ingeniería",desc: "Construimos desde cero lo que ningún software del mercado puede resolver.",   color: "#8B5CF6" },
  { icon: Headphones,   title: "Soporte TI Empresarial",      sub: "Asistencia Técnica",         desc: "Soporte presencial y remoto para equipos, redes y servidores.",               color: "#0F766E" },
  { icon: MonitorCheck, title: "Instalación Microsoft 365",   sub: "Versión Original Completa",  desc: "Instalación, activación y configuración de Microsoft 365 original.",          color: "#0078D4" },
];

const STATS = [
  { value: "6+",     label: "Proyectos entregados"         },
  { value: "100%",   label: "Código a medida"              },
  { value: "24h",    label: "Tiempo de respuesta"          },
  { value: "Sur CL", label: "Base local, alcance nacional" },
];

const TEAM_ROLES = [
  { icon: Code2,        role: "Desarrolladores Full Stack",    desc: "Especialistas en React, Node.js y bases de datos relacionales.",       color: "#3B82F6" },
  { icon: Layers,       role: "Ingenieros en Informática",     desc: "Análisis de sistemas, arquitectura de software y soluciones ERP.",     color: "#0891B2" },
  { icon: MonitorCheck, role: "Técnicos TI & Soporte",         desc: "Instalación, configuración y soporte de infraestructura tecnológica.", color: "#0F766E" },
  { icon: Users,        role: "Consultores de Digitalización", desc: "Análisis de procesos y transformación digital para pymes.",            color: "#8B5CF6" },
];

const M365_FEATURES = [
  "Word, Excel, PowerPoint y OneNote",
  "Outlook con correo corporativo",
  "Teams para videollamadas y colaboración",
  "OneDrive 1TB en la nube",
  "SharePoint para gestión documental",
  "Licencia original y activada legalmente",
  "Soporte post-instalación incluido",
  "Compatible con PC, Mac y móviles",
];

const SOPORTE_ITEMS = [
  { icon: MonitorCheck, title: "Soporte Remoto y Presencial",  desc: "Asistencia técnica en tu empresa en Osorno y alrededores. Sin colas ni tickets perdidos."          },
  { icon: Shield,       title: "Mantenimiento Preventivo",     desc: "Revisión periódica de equipos, redes y servidores para evitar fallas antes de que ocurran."        },
  { icon: Headphones,   title: "Mesa de Ayuda Dedicada",       desc: "Canal directo por WhatsApp con tiempo de respuesta garantizado de 24 horas hábiles."               },
  { icon: Star,         title: "Contratos de Soporte Mensual", desc: "Planes mensuales de soporte TI para empresas que necesitan acompañamiento continuo y prioritario." },
];

const TECH = ["React", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Vite", "PWA"];

// ── Animations ───────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function useReveal() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });
  return { ref, inView };
}

function Label({ children }) {
  return (
    <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.18em] mb-3">{children}</p>
  );
}

// ────────────────────────────────────────────────────────────
// NAVBAR
// ────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1E]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        <button onClick={() => go("#inicio")} className="flex items-center">
          <img src={imgLogo} alt="IngDevs Digital Solutions" className="h-11 w-11 object-cover rounded-full drop-shadow border border-white/10" />
        </button>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map((l) => (
            <button key={l.href} onClick={() => go(l.href)}
              className="px-3 py-2 text-sm font-semibold text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all">
              {l.label}
            </button>
          ))}
        </nav>

        <a href={WA} target="_blank" rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-cyan-900/40 hover:scale-105 transition-all">
          <MessageCircle className="w-4 h-4" /> Cotizar ahora
        </a>

        <button onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
            className="lg:hidden bg-[#0A0F1E]/98 backdrop-blur-xl border-b border-white/5 overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map((l) => (
                <button key={l.href} onClick={() => go(l.href)}
                  className="text-left px-4 py-3 text-sm font-semibold text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all">
                  {l.label}
                </button>
              ))}
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="mt-1 mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-5 py-3.5 rounded-2xl">
                <MessageCircle className="w-4 h-4" /> Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-[#0A0F1E] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: "linear-gradient(rgba(6,182,212,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.15) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(6,182,212,0.12) 0%,transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-14 items-center w-full">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Software · Soporte TI · Microsoft 365 · Osorno, Chile
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-[2.6rem] sm:text-5xl xl:text-[3.2rem] font-black text-white leading-[1.08] tracking-tight mb-6">
            Impulsa tu negocio<br />
            con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              soluciones digitales
            </span>
            <br />inteligentes
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
            Sistemas web a medida, automatización empresarial, soporte TI profesional
            e instalación de Microsoft 365 original. Tecnología real para empresas reales del sur de Chile.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row gap-4">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-cyan-900/40 hover:scale-105 transition-all text-base">
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <button onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all text-base">
              Hablemos de tu proyecto <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center p-3 rounded-2xl bg-white/3 border border-white/5">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-700/20 rounded-3xl blur-2xl" />
          <img src={imgHero} alt="IngDevs Digital Solutions"
            className="relative w-full rounded-2xl shadow-2xl shadow-cyan-950/70 border border-white/5 object-cover brightness-105 hover:brightness-110 transition-all duration-500" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-slate-600 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// TECH BAR
// ────────────────────────────────────────────────────────────
function TechBar() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="bg-[#0D1526] py-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-3">
          <motion.span variants={fadeUp} className="text-slate-600 text-xs font-semibold uppercase tracking-widest mr-2">
            Stack tecnológico
          </motion.span>
          {TECH.map((t) => (
            <motion.span key={t} variants={fadeUp}
              className="px-3 py-1.5 rounded-full border border-white/10 text-slate-400 text-xs font-semibold hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-default">
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PUBLICIDAD BANNER
// ────────────────────────────────────────────────────────────
function PublicidadBanner() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="py-12 bg-[#0A0F1E]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
          <img src={imgHero2} alt="IngDevs — Diseño Web, Sistemas ERP y Soluciones Clínicas"
            className="w-full h-auto block brightness-105 contrast-105 group-hover:brightness-110 transition-all duration-700" />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0F1E] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0F1E] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0F1E] to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PROYECTOS
// ────────────────────────────────────────────────────────────
function Projects() {
  const { ref, inView } = useReveal();

  return (
    <section id="proyectos" className="py-24 bg-[#0D1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Label>Proyectos reales</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Software que ya está funcionando
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="text-slate-400 text-lg">
            Aplicaciones en producción. Cada proyecto, un problema real resuelto.
          </motion.p>
        </div>

        {/* — ERP DESTACADO — */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
          className="group mb-8 bg-[#111827] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative overflow-hidden">
              <img src={imgErp} alt="Sistema ERP IngDevs"
                className="w-full h-full object-cover min-h-[280px] brightness-105 group-hover:brightness-115 group-hover:scale-[1.02] transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/60 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex gap-2">
                {["React", "Node.js", "PostgreSQL"].map(t => (
                  <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Sistema destacado</span>
              <h3 className="text-2xl font-black text-white mb-3">Sistema ERP Empresarial</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Plataforma ERP completa con módulos de Dashboard, Finanzas, Inventario, RRHH y Proyectos.
                KPIs en tiempo real, gestión de estados de proyectos y reportes ejecutivos para empresas que necesitan control total.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Dashboard", "Finanzas", "Inventario", "RRHH", "Proyectos"].map(f => (
                  <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{f}</span>
                ))}
              </div>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors">
                Solicitar demo <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* — INVENTARIO + PANEL + GESTIÓN: 3 juntas — */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { img: imgInventario, title: "Sistema de Inventario y Ventas",   desc: "Stock en tiempo real, punto de venta y reportes de ganancias.",   color: "#10B981", tags: ["React", "Supabase"] },
            { img: imgPanel,      title: "Panel de Control Empresarial",     desc: "Dashboard ejecutivo con KPIs, ventas del día y gráficos históricos.", color: "#06B6D4", tags: ["Dashboard", "Real-time"] },
            { img: imgLogin2,     title: "App de Gestión Profesional",       desc: "Aplicación móvil-web para RRHH, control de acceso y reportes.",   color: "#8B5CF6", tags: ["Mobile-first", "PWA"] },
          ].map((p) => (
            <motion.div key={p.title} variants={fadeUp}
              className="group bg-[#111827] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-black/40 transition-all duration-500">
              <div className="relative h-44 overflow-hidden">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.05] group-hover:brightness-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${p.color}33, transparent 60%)` }} />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white leading-tight">{p.title}</h3>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: p.color }} />
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{p.desc}</p>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold transition-colors" style={{ color: p.color }}>
                  Solicitar similar <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* — SISTEMA DE CLÍNICA: login + interfaz + admin — */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={4}
          className="bg-[#111827] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-500">
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2">Sistema completo</span>
                <h3 className="text-xl font-black text-white">Sistema de Asistencia para Clínicas</h3>
                <p className="text-slate-400 text-sm mt-1">Login seguro · Control de jornadas · Panel administrativo</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Auth", "Roles", "Reportes", "Clínicas"].map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { img: imgLogin,    label: "Acceso al sistema",   sub: "Login con correo y contraseña" },
              { img: imgInterfaz, label: "Vista del empleado",  sub: "Registro de marcajes en tiempo real" },
              { img: imgAdmin,    label: "Panel administrativo",sub: "Gestión de personal y reportes" },
            ].map((item) => (
              <div key={item.label} className="group relative overflow-hidden bg-[#0D1526]">
                <img src={item.img} alt={item.label}
                  className="w-full h-52 object-cover object-top group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate-500 text-sm">Sistema adaptable a clínicas dentales, médicas, veterinarias y centros de salud.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors">
              Solicitar este sistema <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* — OREGON: Sitio Web — */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={5}
          className="mt-8 bg-[#111827] rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/20 transition-all duration-500">
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Diseño Web</span>
                <h3 className="text-xl font-black text-white">Oregon Centro de Eventos</h3>
                <p className="text-slate-400 text-sm mt-1">Sitio web corporativo · Galería · Cotizaciones online · Osorno, Chile</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["React", "Diseño", "Responsive", "WhatsApp"].map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { img: imgOregon1, label: "Página de inicio",     sub: "Hero con llamadas a la acción" },
              { img: imgOregon2, label: "Sección de servicios", sub: "Bodas, Bautizos, Baby Shower y más" },
              { img: imgOregon3, label: "Galería de eventos",   sub: "Fotos reales de eventos realizados" },
            ].map((item) => (
              <div key={item.label} className="group relative overflow-hidden bg-[#0D1526]">
                <img src={item.img} alt={item.label}
                  className="w-full h-52 object-cover object-top group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate-500 text-sm">Sitio web elegante y moderno para centros de eventos, con galería, servicios y formulario de cotización.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors">
              Quiero mi sitio web <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* React banner */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={6}
          className="mt-8 relative rounded-3xl overflow-hidden h-56">
          <img src={imgCodeReact} alt="Desarrollo con React"
            className="w-full h-full object-cover object-center brightness-110 saturate-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1526]/95 via-[#0D1526]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Tecnología de vanguardia</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight max-w-sm">
                Construido con React,<br />pensado para escalar
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// SERVICIOS
// ────────────────────────────────────────────────────────────
function Services() {
  const { ref, inView } = useReveal();
  return (
    <section id="servicios" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Label>Servicios</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Todo lo que tu empresa necesita para digitalizarse
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="text-slate-400 text-lg">
            Desde software a medida hasta soporte técnico presencial. Sin intermediarios.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={fadeUp}
                className="group bg-[#111827] hover:bg-[#131f35] rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 flex flex-col cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${s.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: s.color }}>{s.sub}</p>
                <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{s.desc}</p>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: s.color }}>
                  Cotizar <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// MICROSOFT 365
// ────────────────────────────────────────────────────────────
function Microsoft365() {
  const { ref, inView } = useReveal();
  return (
    <section id="m365" className="py-24 bg-[#0D1526] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <Label>Microsoft 365 — Versión Original</Label>
            </motion.div>
            <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
              className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Equipa tu empresa con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Microsoft 365
              </span>{" "}
              original
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
              className="text-slate-400 text-base leading-relaxed mb-8">
              Instalación, activación y configuración profesional. Licencia 100% original y lista para trabajar.
            </motion.p>

            <motion.ul variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {M365_FEATURES.map((f) => (
                <motion.li key={f} variants={fadeUp} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={6}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-blue-900/40 hover:scale-105 transition-all">
                <MessageCircle className="w-5 h-5" />
                Consultar precio
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100" />
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="absolute -inset-6 rounded-3xl blur-2xl"
              style={{ background: "radial-gradient(ellipse,rgba(0,120,212,0.2) 0%,transparent 70%)" }} />
            <div className="relative bg-[#111827] rounded-3xl p-8 border border-white/10">
              <img src={imgM365} alt="Microsoft 365"
                className="w-full h-auto object-contain rounded-2xl brightness-110 hover:brightness-125 hover:scale-105 transition-all duration-500 drop-shadow-2xl" />
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-black text-lg">Microsoft 365</p>
                  <p className="text-blue-400 text-sm font-semibold">Licencia original · Full Suite</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
                  ✓ Original
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// SOPORTE TI
// ────────────────────────────────────────────────────────────
function SoporteTI() {
  const { ref, inView } = useReveal();
  return (
    <section className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Label>Soporte TI Empresarial</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Tu infraestructura tecnológica en buenas manos
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="text-slate-400 text-lg">
            Soporte técnico local, ágil y sin contratos complicados.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOPORTE_ITEMS.map((item) => {
            const IIcon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp}
                className="group bg-[#111827] hover:bg-[#0d1f2d] rounded-2xl p-7 border border-white/5 hover:border-teal-500/20 hover:shadow-xl transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IIcon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={5}
          className="mt-10 text-center">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all">
            <Headphones className="w-5 h-5" />
            Contratar Soporte TI
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// SOBRE NOSOTROS
// ────────────────────────────────────────────────────────────
function About() {
  const { ref, inView } = useReveal();
  return (
    <section id="nosotros" className="py-24 bg-[#0D1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Label>Sobre nosotros</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
            Un equipo de profesionales comprometido con tu crecimiento
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="text-slate-400 text-lg leading-relaxed mb-4">
            <strong className="text-white">IngDevs Digital Solutions</strong> es un equipo de ingenieros
            en informática y desarrolladores de software con base en Osorno, Chile. Nuestro enfoque es
            potenciar las pymes y empresas del sur del país con tecnología de calidad, sin proveedores
            lejanos ni funciones que nunca usarán.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={3}
            className="text-slate-400 text-base leading-relaxed">
            Combinamos desarrollo de software a medida, automatización de procesos, soporte técnico
            presencial y soluciones Microsoft 365 para entregar una propuesta integral que impulsa
            la digitalización real de tu empresa.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {TEAM_ROLES.map((t) => {
            const TIcon = t.icon;
            return (
              <motion.div key={t.role} variants={fadeUp}
                className="bg-[#111827] rounded-2xl p-6 border border-white/5 hover:shadow-lg hover:border-white/10 transition-all text-center group">
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${t.color}15` }}>
                  <TIcon className="w-6 h-6" style={{ color: t.color }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{t.role}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{t.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="bg-[#111827] rounded-3xl overflow-hidden border border-white/5">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <img src={imgLogo} alt="IngDevs" className="h-14 w-14 object-cover rounded-full mb-8 opacity-90 border border-white/10" />
              <h3 className="text-2xl font-black text-white mb-3">Ingeniería con propósito,<br />desde el sur de Chile</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                No somos solo desarrolladores — somos el equipo tecnológico que tu empresa necesita.
                Desde la consultoría inicial hasta el soporte post-entrega, contigo en cada paso.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "Node.js", "PostgreSQL", "PWA", "Microsoft 365", "Soporte TI"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                {LOC}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={imgHero2} alt="IngDevs" className="w-full h-full object-cover object-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111827] to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-black text-white mb-2">100%</p>
                  <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Comprometidos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// TESTIMONIOS
// ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "María José Fuentes",
    role: "Directora",
    company: "Clínica Vita",
    text: "IngDevs nos desarrolló un sistema de agendamiento y control de jornadas increíble. La atención fue excelente y el resultado superó nuestras expectativas. Ahora manejamos todo desde una sola plataforma.",
    color: "#06B6D4",
    initial: "MJ",
  },
  {
    name: "Carlos Sepúlveda",
    role: "Administrador",
    company: "Tienda La Vaquita",
    text: "Necesitábamos un sistema de inventario y ventas urgente. IngDevs lo entregó en tiempo récord y funciona perfecto. El control de stock en tiempo real nos cambió la vida. 100% recomendados.",
    color: "#10B981",
    initial: "CS",
  },
  {
    name: "Camila Rojas",
    role: "Propietaria",
    company: "Oregon Centro de Eventos",
    text: "Nos hicieron una página web preciosa y moderna. Desde que la tenemos, las cotizaciones aumentaron notablemente. El equipo fue muy profesional y nos guió en todo el proceso. ¡Excelente trabajo!",
    color: "#F59E0B",
    initial: "CR",
  },
];

function Testimonials() {
  const { ref, inView } = useReveal();
  return (
    <section className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Label>Testimonios</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="text-slate-400 text-lg">
            Empresas que ya confían en IngDevs para digitalizar sus operaciones.
          </motion.p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp}
              className="bg-[#111827] rounded-2xl p-7 border border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 flex flex-col">
              {/* Estrellas */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Texto */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>
              {/* Autor */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                  style={{ backgroundColor: `${t.color}30`, border: `2px solid ${t.color}50` }}>
                  <span style={{ color: t.color }}>{t.initial}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FORMULARIO DE CONTACTO
// ────────────────────────────────────────────────────────────
function ContactForm() {
  const { ref, inView } = useReveal();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY);
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-[#0A0F1E] border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-[#0d1322] transition-all";
  const labelClass = "block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2";

  return (
    <section id="contacto" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">

          {/* — Info lateral — */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <Label>Hablemos sobre tu proyecto</Label>
            </motion.div>
            <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
              className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
              Cuéntanos tu idea.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Nosotros la hacemos realidad.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
              className="text-slate-400 text-lg leading-relaxed mb-10">
              Sin compromisos. En menos de 24 horas tendrás una propuesta técnica
              y un presupuesto adaptado a tu empresa.
            </motion.p>

            {/* Contacto directo */}
            <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-4">
              {[
                { icon: MessageCircle, label: "WhatsApp directo",   value: "+56 9 8713 4632",                   href: WA,                          color: "#22C55E" },
                { icon: Mail,          label: "Correo corporativo", value: EMAIL,                               href: `mailto:${EMAIL}`,            color: "#3B82F6" },
                { icon: Instagram,     label: "Instagram",          value: "@ingdev_digital_solutions",         href: IG,                           color: "#E1306C" },
                { icon: MapPin,        label: "Ubicación",          value: LOC,                                 href: null,                         color: "#06B6D4" },
              ].map((c) => {
                const CIcon = c.icon;
                const content = (
                  <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${c.color}15` }}>
                      <CIcon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">{c.label}</p>
                      <p className="text-white text-sm font-semibold group-hover:text-cyan-400 transition-colors">{c.value}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <motion.a key={c.label} variants={fadeUp} href={c.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </motion.a>
                ) : (
                  <motion.div key={c.label} variants={fadeUp}>{content}</motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* — Formulario — */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}>
            <div className="bg-[#111827] rounded-3xl p-8 border border-white/5">
              <h3 className="text-white font-black text-xl mb-6">Envíanos tu consulta</h3>

              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">¡Mensaje enviado!</h4>
                  <p className="text-slate-400 text-sm mb-6">Te contactaremos en menos de 24 horas.</p>
                  <button onClick={() => setStatus("idle")}
                    className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Nombre *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="Tu nombre completo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Empresa</label>
                      <input name="company" value={form.company} onChange={handleChange}
                        placeholder="Nombre de tu empresa" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Correo electrónico *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="correo@ejemplo.cl" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Teléfono</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+56 9 XXXX XXXX" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Servicio de interés</label>
                    <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                      <option value="" className="bg-[#111827]">Selecciona un servicio...</option>
                      {SERVICES.map(s => (
                        <option key={s.title} value={s.title} className="bg-[#111827]">{s.title}</option>
                      ))}
                      <option value="Otro" className="bg-[#111827]">Otro / No estoy seguro</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Cuéntanos sobre tu proyecto *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                      placeholder="Describe brevemente qué necesitas, qué problema quieres resolver o qué idea tienes en mente..."
                      className={`${inputClass} resize-none`} />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      ❌ Hubo un error al enviar. Escríbenos directamente por WhatsApp.
                    </p>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-900/30 hover:scale-[1.02] transition-all text-base">
                    {status === "sending" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Enviar consulta</>
                    )}
                  </button>

                  <p className="text-slate-600 text-xs text-center">
                    También puedes escribirnos directamente a{" "}
                    <a href={`mailto:${EMAIL}`} className="text-cyan-600 hover:text-cyan-400 transition-colors">{EMAIL}</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#060912] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-white/5">
          <div>
            <img src={imgLogo} alt="IngDevs Digital Solutions" className="h-12 w-12 object-cover rounded-full mb-5 opacity-90 border border-white/10" />
            <p className="text-slate-500 text-sm leading-relaxed">
              Automatización, software a medida, soporte TI y Microsoft 365.
              Desde Osorno para todo Chile.
            </p>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-5">Servicios</p>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-5">Contacto</p>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-500 hover:text-cyan-400 text-sm transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>+56 9 8713 4632
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-slate-500 hover:text-cyan-400 text-sm transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>{EMAIL}
                </a>
              </li>
              <li>
                <a href={IG} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-500 hover:text-cyan-400 text-sm transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>@ingdev_digital_solutions
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>{LOC}
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-700 text-xs">
            © {new Date().getFullYear()} IngDevs Digital Solutions — Todos los derechos reservados
          </p>
          <p className="text-slate-700 text-xs">Desarrollo de Software · Soporte TI · Osorno, Chile</p>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// ROOT
// ────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap";
    document.head.appendChild(link);
    document.body.style.fontFamily = "'system-ui', sans-serif";
    document.body.style.backgroundColor = "#0A0F1E";
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechBar />
        <PublicidadBanner />
        <Projects />
        <Services />
        <Microsoft365 />
        <SoporteTI />
        <About />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

/*
 ╔══════════════════════════════════════════════════════════╗
 ║           CONFIGURAR EMAILJS — PASOS SIMPLES             ║
 ╠══════════════════════════════════════════════════════════╣
 ║                                                          ║
 ║  1. Ve a https://emailjs.com → crea cuenta gratis        ║
 ║                                                          ║
 ║  2. Add Service → Gmail → conecta tu cuenta              ║
 ║     → copia el SERVICE ID                                ║
 ║                                                          ║
 ║  3. Email Templates → Create Template                    ║
 ║     En el template usa estas variables:                  ║
 ║       {{name}}     → nombre del cliente                  ║
 ║       {{company}}  → empresa                             ║
 ║       {{email}}    → correo del cliente                  ║
 ║       {{phone}}    → teléfono                            ║
 ║       {{service}}  → servicio de interés                 ║
 ║       {{message}}  → mensaje                             ║
 ║     → copia el TEMPLATE ID                               ║
 ║                                                          ║
 ║  4. Account → API Keys → copia tu PUBLIC KEY             ║
 ║                                                          ║
 ║  5. En este archivo, líneas ~50-52, reemplaza:           ║
 ║     EMAILJS_SERVICE  = "tu service id"                   ║
 ║     EMAILJS_TEMPLATE = "tu template id"                  ║
 ║     EMAILJS_KEY      = "tu public key"                   ║
 ║                                                          ║
 ║  Plan gratis: 200 emails/mes — suficiente para empezar   ║
 ╚══════════════════════════════════════════════════════════╝
*/
