import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  UserRound,
  Mail,
  Github,
  ExternalLink,
  Download,
  ChevronRight,
  Circle,
  Zap,
  Box,
  Clock,
  GitBranch,
  Terminal,
  Globe,
  Linkedin,
  MessageSquare,
  MapPin,
  ArrowUpRight,
  Star,
} from "lucide-react";
import profileImg from "../imports/amaan_picture2.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────

const SIDEBAR_W = 260;
const TOPBAR_H = 48;

type NavId = "overview" | "projects" | "skills" | "about" | "contact";

const NAV: { id: NavId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={14} /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 size={14} /> },
  { id: "skills",   label: "Skills",   icon: <Cpu size={14} /> },
  { id: "about",    label: "About",    icon: <UserRound size={14} /> },
  { id: "contact",  label: "Contact",  icon: <Mail size={14} /> },
];

const TECH_STACK = ["React", "Node.js", "Express", "MongoDB", "Docker", "Git"];

const BUILDING = [
  { name: "DevConnect",              status: "In Progress", dot: "#8b5cf6" },
  { name: "Hotel Management System", status: "Active",      dot: "#10b981" },
];

const FEED = [
  { icon: <GitBranch size={11} />, text: "Building authentication system" },
  { icon: <Terminal  size={11} />, text: "Improving backend APIs" },
  { icon: <Globe     size={11} />, text: "Working on DevConnect UI" },
  { icon: <Zap       size={11} />, text: "Learning Docker workflows" },
];

const STATS = [
  { label: "Projects Completed", value: "10+",        icon: <Box  size={14} />, sub: "+3 this year"     },
  { label: "Hours Coding",       value: "1,000+",     icon: <Clock size={14}/>, sub: "and counting"      },
  { label: "Current Focus",      value: "Full-Stack", icon: <Zap  size={14} />, sub: "Dev"               },
];

const LEARNING = ["TypeScript", "System Design", "Cloud Deployment", "Next.js"];

const PROJECTS = [
  {
    title: "DevConnect",
    desc:  "A full-stack social platform where developers connect, share work, and collaborate in real time.",
    tech:  ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    stars: 12,
    accent: "#8b5cf6",
    featured: true,
  },
  {
    title: "Hotel Management",
    desc:  "Complete business solution for hotel operations — rooms, reservations, payments, and staff dashboards.",
    tech:  ["React", "Node.js", "Express", "MongoDB"],
    stars: 8,
    accent: "#10b981",
    featured: false,
  },
  {
    title: "Portfolio Website",
    desc:  "Modern developer portfolio with dashboard layout, smooth animations, and a contact system.",
    tech:  ["React", "Tailwind CSS", "Framer Motion"],
    stars: 6,
    accent: "#f59e0b",
    featured: false,
  },
];

const SKILLS_GROUPS = [
  { label: "Frontend",       color: "#8b5cf6", items: ["HTML5", "CSS3", "JavaScript ES6+", "React", "Tailwind CSS", "Responsive Design"] },
  { label: "Backend",        color: "#10b981", items: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases",      color: "#06b6d4", items: ["MongoDB", "MySQL", "Firebase"] },
  { label: "DevOps & Tools", color: "#f59e0b", items: ["Docker", "Linux", "Git", "GitHub", "Postman", "VS Code"] },
  { label: "Learning Now",   color: "#f43f5e", items: ["TypeScript", "Next.js", "System Design", "Cloud", "Advanced Docker"] },
];

const TIMELINE = [
  { period: "Early 2024",  event: "Started web development fundamentals",    note: "HTML, CSS, basic JavaScript" },
  { period: "Mid 2024",    event: "Dug deep into JavaScript",                note: "ES6+, DOM, async/await, APIs" },
  { period: "Early 2025",  event: "Built first React applications",          note: "Components, hooks, state, routing" },
  { period: "Mid 2025",    event: "Mastered Git & GitHub",                   note: "Branches, PRs, collaboration workflow" },
  { period: "Early 2026",  event: "Moved into backend development",          note: "Node.js, Express, MongoDB, Docker" },
  { period: "Now",         event: "Shipping full-stack projects",            note: "Real-world apps with production focus" },
];

// ─── Micro-components ─────────────────────────────────────────────────────────

function Panel({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-white/[0.07] bg-[#111113] ${className}`}
      style={glow ? { boxShadow: "0 0 0 1px rgba(139,92,246,.1), 0 8px 40px rgba(139,92,246,.06)" } : undefined}
    >
      {children}
    </div>
  );
}

function Tag({ text, color = "#8b5cf6" }: { text: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold font-mono tracking-wide"
      style={{ background: `${color}18`, color, border: `1px solid ${color}25` }}
    >
      {text}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono uppercase tracking-[.12em] text-zinc-600 mb-3">{children}</p>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ active, setActive }: { active: NavId; setActive: (id: NavId) => void }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-5 border-b border-white/[0.06] transition-colors duration-200"
      style={{
        height: TOPBAR_H,
        background: solid ? "rgba(10,10,11,.95)" : "#0a0a0b",
        backdropFilter: solid ? "blur(12px)" : undefined,
      }}
    >
      {/* Logo — aligned with sidebar */}
      <div className="flex items-center gap-2 flex-shrink-0" style={{ width: SIDEBAR_W - 20 }}>
        <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[9px] font-bold font-mono">A</span>
        </div>
        <span className="text-[13px] font-semibold text-white tracking-tight">Amanuel.dev</span>
      </div>

      {/* Center nav */}
      <nav className="flex items-center gap-0.5 flex-1 justify-center">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); scrollTo(n.id); }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
              active === n.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {active === n.id && (
              <motion.span
                layoutId="topbar-pill"
                className="absolute inset-0 rounded-md bg-white/[0.08]"
                style={{ zIndex: -1 }}
              />
            )}
            {n.icon}
            {n.label}
          </button>
        ))}
      </nav>

      {/* Status */}
      <div className="flex items-center gap-2 flex-shrink-0" style={{ width: SIDEBAR_W - 20, justifyContent: "flex-end" }}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-emerald-400 bg-emerald-400/8 border border-emerald-400/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for Work
        </div>
      </div>
    </header>
  );
}

// ─── Fixed Sidebar ────────────────────────────────────────────────────────────

function Sidebar({ active, setActive }: { active: NavId; setActive: (id: NavId) => void }) {
  return (
    <aside
      className="fixed left-0 bottom-0 flex flex-col border-r border-white/[0.07] bg-[#0a0a0b] overflow-y-auto"
      style={{ top: TOPBAR_H, width: SIDEBAR_W }}
    >
      {/* Profile block */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
        {/* Profile image — large and prominent */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                width: 160,
                height: 160,
                boxShadow: "0 0 0 2px rgba(139,92,246,.35), 0 0 32px rgba(139,92,246,.18)",
              }}
            >
              <img
                src={profileImg}
                alt="Amanuel Wendimu"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Online indicator */}
            <span
              className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0b]"
              title="Online"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-semibold text-white">Amanuel Wendimu</h2>
          <p className="text-[11px] text-zinc-500 mt-0.5">Full-Stack Developer</p>
          <p className="text-[10px] text-zinc-600 mt-2 leading-snug">
            Building real-world web applications
          </p>
          <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-zinc-700 font-mono">
            <MapPin size={9} className="text-zinc-600" />
            Addis Ababa, ET
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="px-3 py-4 flex flex-col gap-0.5 flex-1">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); scrollTo(n.id); }}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left w-full ${
              active === n.id
                ? "bg-violet-500/10 text-violet-300 border border-violet-500/15"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            <span className={active === n.id ? "text-violet-400" : ""}>{n.icon}</span>
            {n.label}
            {active === n.id && <ChevronRight size={11} className="ml-auto text-violet-500/50" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <p className="text-[10px] font-mono text-zinc-700 mb-3">
          Currently focused on React + Node.js
        </p>
        <div className="flex items-center gap-2">
          {[
            { icon: <Github size={13} />, href: "#", label: "GitHub" },
            { icon: <Linkedin size={13} />, href: "#", label: "LinkedIn" },
            { icon: <MessageSquare size={13} />, href: "#", label: "Telegram" },
            { icon: <Mail size={13} />, href: "mailto:your-email@example.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-7 h-7 rounded-md border border-white/[0.08] flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-white/20 transition-all duration-150"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Center Panel ─────────────────────────────────────────────────────────────

function CenterPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* System card */}
      <Panel glow className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/8 border border-emerald-400/20 px-2.5 py-1 rounded-full">
            <Circle size={6} className="fill-emerald-400" />
            System Status: Active Developer
          </span>
        </div>

        <h1 className="text-xl font-bold text-white leading-tight mb-2">
          Building Full-Stack Web Applications
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-md">
          I build scalable full-stack web applications using modern technologies with a focus on
          real-world impact and clean, maintainable code.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors duration-150"
          >
            <FolderGit2 size={13} />
            View Projects
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 rounded-lg text-xs font-semibold transition-all duration-150">
            <Download size={13} />
            Download CV
          </button>
        </div>

        {/* Tech stack */}
        <div className="pt-5 border-t border-white/[0.06]">
          <Label>Tech Stack</Label>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((t) => (
              <Tag key={t} text={t} />
            ))}
          </div>
        </div>
      </Panel>

      {/* Two-col row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Currently building */}
        <Panel className="p-4">
          <Label>Currently Building</Label>
          <div className="flex flex-col gap-2">
            {BUILDING.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.025] border border-white/[0.05]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.dot }} />
                  <span className="text-xs text-zinc-300 font-medium">{p.name}</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: p.dot }}>{p.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Activity feed */}
        <Panel className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Label>Activity Feed</Label>
            <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 -mt-3">
              <Circle size={5} className="fill-emerald-500" />live
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {FEED.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-500">
                <span className="text-violet-500 mt-px flex-shrink-0">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

function RightPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* Stat cards */}
      {STATS.map((s) => (
        <Panel key={s.label} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-600">{s.icon}</span>
            <span className="text-[10px] font-mono text-zinc-700">{s.sub}</span>
          </div>
          <p className="text-2xl font-bold text-white leading-none">{s.value}</p>
          <p className="text-[11px] text-zinc-500 mt-1">{s.label}</p>
        </Panel>
      ))}

      {/* Currently Learning */}
      <Panel className="p-4">
        <Label>Currently Learning</Label>
        <div className="flex flex-col gap-2">
          {LEARNING.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.025] border border-white/[0.05]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background:
                    i === 0 ? "#8b5cf6" : i === 1 ? "#06b6d4" : i === 2 ? "#10b981" : "#f59e0b",
                }}
              />
              <span className="text-xs text-zinc-300">{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Activity indicator */}
      <Panel className="p-4">
        <Label>Commit Activity</Label>
        <div className="flex flex-col gap-2">
          {[
            { day: "Mon", pct: 80 },
            { day: "Tue", pct: 55 },
            { day: "Wed", pct: 90 },
            { day: "Thu", pct: 40 },
            { day: "Fri", pct: 70 },
            { day: "Sat", pct: 30 },
            { day: "Sun", pct: 20 },
          ].map((d) => (
            <div key={d.day} className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-600 w-6">{d.day}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: d.pct > 70 ? "#8b5cf6" : d.pct > 45 ? "#7c3aed" : "#4c1d95" }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-700 w-6 text-right">{d.pct}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ─── Dashboard row ────────────────────────────────────────────────────────────

function DashboardRow() {
  return (
    <section id="overview" className="grid gap-4" style={{ gridTemplateColumns: "1fr 220px" }}>
      <CenterPanel />
      <RightPanel />
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="pt-12 pb-4">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[.12em] text-zinc-600 mb-1.5">About Me</p>
        <h2 className="text-2xl font-bold text-white">The Developer Behind the Work</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="text-sm text-zinc-400 leading-relaxed space-y-4">
          <p>
            I'm Amanuel, a self-taught full-stack developer from Addis Ababa, Ethiopia. I started
            with a simple question — "how does this website actually work?" — and that curiosity
            turned into a full development journey.
          </p>
          <p>
            I focus on building things that actually work in the real world: clean APIs, responsive
            frontends, and systems that are thoughtfully designed rather than just functional. I
            take pride in writing code that other developers can read and build on.
          </p>
          <p>
            My goal is to become a well-rounded engineer who can take a problem from idea to
            production — not just write code, but architect solutions that scale and stand the
            test of time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-5 border-l border-white/[0.08]">
          <div className="space-y-5">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="absolute -left-[21px] top-[5px] w-2 h-2 rounded-full border border-violet-500/50 bg-[#0a0a0b] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-violet-500" />
                </div>
                <p className="text-[10px] font-mono text-violet-500 tracking-wide mb-0.5">{item.period}</p>
                <p className="text-sm font-medium text-zinc-200">{item.event}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="pt-12 pb-4">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[.12em] text-zinc-600 mb-1.5">Featured Projects</p>
          <h2 className="text-2xl font-bold text-white">Things I've Built</h2>
        </div>
        <a href="#" className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-300 transition-colors mb-1">
          All projects <ArrowUpRight size={12} />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="group flex flex-col h-full rounded-xl bg-[#111113] border transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              style={{
                borderColor: p.featured ? `${p.accent}30` : "rgba(255,255,255,.07)",
                boxShadow: p.featured ? `0 0 0 1px ${p.accent}12, 0 8px 32px ${p.accent}08` : undefined,
              }}
            >
              {/* Top accent strip */}
              <div className="h-[2px]" style={{ background: p.accent }} />

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${p.accent}18` }}
                    >
                      <FolderGit2 size={13} style={{ color: p.accent }} />
                    </div>
                    <span className="text-sm font-semibold text-white">{p.title}</span>
                  </div>
                  {p.featured && (
                    <span className="text-[9px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded flex-shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <Tag key={t} text={t} color={p.accent} />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-600 font-mono">
                    <Star size={10} /> {p.stars}
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="#" className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors">
                      <Github size={11} /> Code
                    </a>
                    <a href="#" className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors">
                      <ExternalLink size={11} /> Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="pt-12 pb-4">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[.12em] text-zinc-600 mb-1.5">Skills</p>
        <h2 className="text-2xl font-bold text-white">Technologies & Tools</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS_GROUPS.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: gi * 0.07, duration: 0.4 }}
          >
            <Panel className="p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: g.color }} />
                <span className="text-xs font-semibold text-zinc-300">{g.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[11px] text-zinc-400 bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15] hover:text-zinc-200 cursor-default transition-all duration-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="pt-12 pb-10">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[.12em] text-zinc-600 mb-1.5">Contact</p>
        <h2 className="text-2xl font-bold text-white">Let's Work Together</h2>
        <p className="text-sm text-zinc-500 mt-1.5 max-w-md leading-relaxed">
          Open to freelance work, collaborations, and interesting projects. Reach out and let's
          build something useful.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <Panel className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Available for Work</p>
                <p className="text-[11px] text-zinc-500">Open to new opportunities</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { icon: <MapPin size={11} />, text: "Addis Ababa, Ethiopia" },
                { icon: <Mail size={11} />,   text: "your-email@example.com" },
                { icon: <Github size={11} />, text: "github.com/amanuel" },
              ].map((row) => (
                <div key={row.text} className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="text-zinc-700">{row.icon}</span>
                  {row.text}
                </div>
              ))}
            </div>
          </Panel>

          {/* Code snippet */}
          <Panel className="p-4 font-mono text-xs leading-[1.8]">
            <span className="text-zinc-600">// current status</span>
            <br />
            <span className="text-violet-400">const</span>
            <span className="text-zinc-300"> dev </span>
            <span className="text-zinc-600">= {"{"}</span>
            <br />
            <span className="pl-4 text-zinc-500">  name:      </span>
            <span className="text-emerald-400">"Amanuel"</span>
            <span className="text-zinc-600">,</span>
            <br />
            <span className="pl-4 text-zinc-500">  location:  </span>
            <span className="text-emerald-400">"Addis Ababa"</span>
            <span className="text-zinc-600">,</span>
            <br />
            <span className="pl-4 text-zinc-500">  available: </span>
            <span className="text-violet-400">true</span>
            <br />
            <span className="text-zinc-600">{"}"}</span>
          </Panel>
        </div>

        <Panel className="p-5">
          <form onSubmit={submit} className="flex flex-col gap-4">
            {[
              { key: "name",  label: "Name",  type: "text",  placeholder: "Your name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-[10px] font-mono uppercase tracking-[.1em] text-zinc-600 mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors duration-150"
                />
              </div>
            ))}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-[.1em] text-zinc-600 mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors duration-150 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors duration-150"
            >
              {sent ? "Message Sent ✓" : <><Mail size={12} /> Send Message</>}
            </button>
          </form>
        </Panel>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-violet-600 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold font-mono">A</span>
          </div>
          <span className="text-xs font-semibold text-zinc-500">Amanuel.dev</span>
        </div>
        <p className="text-[11px] font-mono text-zinc-700">© 2026 Amanuel Wendimu. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState<NavId>("overview");

  useEffect(() => {
    const ids: NavId[] = ["overview", "projects", "skills", "about", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div
      className="bg-[#0a0a0b] text-[#ededed] min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 99px; }
      `}</style>

      <TopBar active={active} setActive={setActive} />
      <Sidebar active={active} setActive={setActive} />

      {/* All scrollable content pushed right of fixed sidebar */}
      <main
        style={{ paddingTop: TOPBAR_H, paddingLeft: SIDEBAR_W }}
        className="min-h-screen"
      >
        <div className="max-w-[900px] px-6 py-6 mx-auto">
          <DashboardRow />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
