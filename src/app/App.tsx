import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Box,
  ChevronRight,
  Circle,
  Clock,
  Cpu,
  Download,
  ExternalLink,
  FolderGit2,
  GitBranch,
  Github,
  Globe,
  LayoutDashboard,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Star,
  Terminal,
  UserRound,
  Zap,
} from "lucide-react";
import profileImg from "../imports/amaan_picture2.webp";

const SIDEBAR_W = 280;

type NavId = "overview" | "projects" | "skills" | "about" | "contact";

const NAV: { id: NavId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 size={16} /> },
  { id: "skills", label: "Skills", icon: <Cpu size={16} /> },
  { id: "about", label: "About", icon: <UserRound size={16} /> },
  { id: "contact", label: "Contact", icon: <Mail size={16} /> },
];

const TECH_STACK = ["React", "Node.js", "Express", "MongoDB", "Docker", "Git"];

const BUILDING = [
  { name: "DevConnect", status: "In Progress", dot: "#8b5cf6" },
  { name: "Hotel Management System", status: "Active", dot: "#10b981" },
];

const FEED = [
  { icon: <GitBranch size={14} />, text: "Building authentication system" },
  { icon: <Terminal size={14} />, text: "Improving backend APIs" },
  { icon: <Globe size={14} />, text: "Working on DevConnect UI" },
  { icon: <Zap size={14} />, text: "Learning Docker workflows" },
];

const STATS = [
  { label: "Projects Completed", value: "10+", icon: <Box size={16} />, sub: "+3 this year" },
  { label: "Hours Coding", value: "1,000+", icon: <Clock size={16} />, sub: "and counting" },
  { label: "Current Focus", value: "Full-Stack", icon: <Zap size={16} />, sub: "Development" },
];

const LEARNING = ["TypeScript", "System Design", "Cloud Deployment", "Next.js"];

const PROJECTS = [
  {
    title: "DevConnect",
    desc: "A full-stack social platform where developers connect, share work, and collaborate in real time.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    stars: 12,
    accent: "#8b5cf6",
    featured: true,
  },
  {
    title: "Hotel Management",
    desc: "Complete business solution for hotel operations including rooms, reservations, payments, and staff dashboards.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    stars: 8,
    accent: "#10b981",
    featured: false,
  },
  {
    title: "Portfolio Website",
    desc: "Modern developer portfolio with a dashboard layout, polished interactions, and a responsive contact flow.",
    tech: ["React", "Tailwind CSS", "Motion"],
    stars: 6,
    accent: "#f59e0b",
    featured: false,
  },
];

const SKILLS_GROUPS = [
  { label: "Frontend", color: "#8b5cf6", items: ["HTML5", "CSS3", "JavaScript ES6+", "React", "Tailwind CSS", "Responsive Design"] },
  { label: "Backend", color: "#10b981", items: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases", color: "#06b6d4", items: ["MongoDB", "MySQL", "Firebase"] },
  { label: "DevOps & Tools", color: "#f59e0b", items: ["Docker", "Linux", "Git", "GitHub", "Postman", "VS Code"] },
  { label: "Learning Now", color: "#f43f5e", items: ["TypeScript", "Next.js", "System Design", "Cloud", "Advanced Docker"] },
];

const TIMELINE = [
  { period: "Early 2024", event: "Started web development fundamentals", note: "HTML, CSS, basic JavaScript" },
  { period: "Mid 2024", event: "Dug deep into JavaScript", note: "ES6+, DOM, async/await, APIs" },
  { period: "Early 2025", event: "Built first React applications", note: "Components, hooks, state, routing" },
  { period: "Mid 2025", event: "Mastered Git & GitHub", note: "Branches, PRs, collaboration workflow" },
  { period: "Early 2026", event: "Moved into backend development", note: "Node.js, Express, MongoDB, Docker" },
  { period: "Now", event: "Shipping full-stack projects", note: "Real-world apps with production focus" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Panel({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-[#111114]/95 shadow-[0_18px_60px_rgba(0,0,0,.18)] ${className}`}
      style={glow ? { boxShadow: "0 0 0 1px rgba(139,92,246,.16), 0 24px 70px rgba(139,92,246,.08)" } : undefined}
    >
      {children}
    </div>
  );
}

function Tag({ text, color = "#8b5cf6" }: { text: string; color?: string }) {
  return (
    <span
      className="inline-flex min-h-7 items-center rounded-md px-2.5 py-1 text-xs font-semibold"
      style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
    >
      {text}
    </span>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{children}</p>;
}

function SectionHeading({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-7 max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-base leading-7 text-zinc-400">{children}</p> : null}
    </div>
  );
}

function NavButton({ item, active, onSelect, compact = false }: { item: (typeof NAV)[number]; active: boolean; onSelect: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
        active ? "text-white" : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100"
      } ${compact ? "shrink-0" : "w-full"}`}
      aria-current={active ? "page" : undefined}
    >
      {active ? <motion.span layoutId={compact ? "mobile-nav-pill" : "side-nav-pill"} className="absolute inset-0 rounded-lg bg-violet-500/15 ring-1 ring-violet-400/20" /> : null}
      <span className={`relative ${active ? "text-violet-300" : "text-zinc-500"}`}>{item.icon}</span>
      <span className="relative">{item.label}</span>
      {!compact && active ? <ChevronRight size={14} className="relative ml-auto text-violet-300/70" /> : null}
    </button>
  );
}

function TopBar({ active, setActive }: { active: NavId; setActive: (id: NavId) => void }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] px-4 backdrop-blur-xl transition-colors duration-200 sm:px-6 lg:hidden"
      style={{ background: solid ? "rgba(10,10,11,.9)" : "rgba(10,10,11,.98)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollTo("overview")}
          className="flex min-h-11 items-center gap-2 rounded-lg pr-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">A</span>
          <span className="text-base font-bold tracking-tight text-white">Amanuel.dev</span>
        </button>
        <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-300 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Available
        </span>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-3" aria-label="Primary navigation">
        {NAV.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            compact
            onSelect={() => {
              setActive(item.id);
              scrollTo(item.id);
            }}
          />
        ))}
      </nav>
    </header>
  );
}

function Sidebar({ active, setActive }: { active: NavId; setActive: (id: NavId) => void }) {
  const socialLinks = [
    { icon: <Github size={17} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={17} />, href: "#", label: "LinkedIn" },
    { icon: <MessageSquare size={17} />, href: "#", label: "Telegram" },
    { icon: <Mail size={17} />, href: "mailto:your-email@example.com", label: "Email" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/[0.08] bg-[#0a0a0b] lg:flex" style={{ width: SIDEBAR_W }}>
      <div className="px-6 pb-6 pt-7">
        <button
          type="button"
          onClick={() => scrollTo("overview")}
          className="mb-7 flex min-h-11 items-center gap-3 rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">A</span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-white">Amanuel.dev</span>
            <span className="block text-sm text-zinc-500">Full-stack portfolio</span>
          </span>
        </button>

        <div className="text-center">
          <div className="relative mx-auto mb-5 h-44 w-44 overflow-hidden rounded-2xl border border-violet-300/25 bg-zinc-900 shadow-[0_24px_70px_rgba(139,92,246,.18)]">
            <img src={profileImg} alt="Amanuel Wendimu" className="h-full w-full object-cover object-[50%_38%]" />
            <span className="absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 border-[#0a0a0b] bg-emerald-400" aria-label="Available for work" />
          </div>
          <h2 className="font-display text-2xl font-bold leading-tight text-white">Amanuel Wendimu</h2>
          <p className="mt-1 text-base text-zinc-400">Full-Stack Developer</p>
          <p className="mx-auto mt-3 max-w-[13rem] text-sm leading-6 text-zinc-500">Building reliable web applications with clean interfaces and practical backend systems.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
            <MapPin size={15} className="text-zinc-600" />
            Addis Ababa, ET
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-4 py-3" aria-label="Primary navigation">
        {NAV.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            onSelect={() => {
              setActive(item.id);
              scrollTo(item.id);
            }}
          />
        ))}
      </nav>

      <div className="border-t border-white/[0.08] px-6 py-5">
        <p className="mb-4 text-sm leading-6 text-zinc-500">Currently focused on React, Node.js, and production-ready full-stack apps.</p>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.09] text-zinc-500 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CenterPanel() {
  return (
    <div className="flex flex-col gap-5">
      <Panel glow className="p-6 sm:p-8">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
          <Circle size={8} className="fill-emerald-400" />
          Active Developer
        </span>

        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Building Full-Stack Web Applications</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">I build scalable full-stack web applications using modern technologies, with a focus on real-world impact, accessibility, and maintainable code.</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-base font-bold text-white transition-colors duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <FolderGit2 size={18} />
            View Projects
          </button>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.12] px-5 text-base font-bold text-zinc-200 transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <Download size={18} />
            Download CV
          </button>
        </div>

        <div className="mt-8 border-t border-white/[0.08] pt-6">
          <Kicker>Tech Stack</Kicker>
          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech) => (
              <Tag key={tech} text={tech} />
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 md:grid-cols-2">
        <Panel className="p-5">
          <Kicker>Currently Building</Kicker>
          <div className="flex flex-col gap-3">
            {BUILDING.map((project) => (
              <div key={project.name} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: project.dot }} />
                  <span className="text-base font-semibold text-zinc-200">{project.name}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: project.dot }}>{project.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Kicker>Activity Feed</Kicker>
            <span className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
              <Circle size={7} className="fill-emerald-400" />
              live
            </span>
          </div>
          <ul className="flex flex-col gap-3">
            {FEED.map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-base leading-6 text-zinc-400">
                <span className="mt-1 shrink-0 text-violet-400">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
      {STATS.map((stat) => (
        <Panel key={stat.label} className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-zinc-500">{stat.icon}</span>
            <span className="text-sm text-zinc-500">{stat.sub}</span>
          </div>
          <p className="font-display text-3xl font-bold leading-none text-white">{stat.value}</p>
          <p className="mt-2 text-base text-zinc-400">{stat.label}</p>
        </Panel>
      ))}

      <Panel className="p-5">
        <Kicker>Currently Learning</Kicker>
        <div className="flex flex-col gap-3">
          {LEARNING.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] px-4 py-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: index === 0 ? "#8b5cf6" : index === 1 ? "#06b6d4" : index === 2 ? "#10b981" : "#f59e0b" }} />
              <span className="text-base font-medium text-zinc-300">{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5 sm:col-span-2 xl:col-span-1">
        <Kicker>Commit Activity</Kicker>
        <div className="flex flex-col gap-3">
          {[
            { day: "Mon", pct: 80 },
            { day: "Tue", pct: 55 },
            { day: "Wed", pct: 90 },
            { day: "Thu", pct: 40 },
            { day: "Fri", pct: 70 },
            { day: "Sat", pct: 30 },
            { day: "Sun", pct: 20 },
          ].map((day) => (
            <div key={day.day} className="flex items-center gap-3">
              <span className="w-8 text-sm font-semibold text-zinc-500">{day.day}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${day.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: day.pct > 70 ? "#8b5cf6" : day.pct > 45 ? "#06b6d4" : "#10b981" }}
                />
              </div>
              <span className="w-8 text-right text-sm text-zinc-500">{day.pct}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function DashboardRow() {
  return (
    <section id="overview" className="scroll-mt-32 pt-6 lg:scroll-mt-8 lg:pt-8">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <CenterPanel />
        <RightPanel />
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-32 py-14 lg:scroll-mt-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading kicker="Featured Projects" title="Things I've Built" />
        <a href="#" className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg px-1 text-base font-semibold text-zinc-400 transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:self-auto">
          All projects <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group flex h-full flex-col overflow-hidden rounded-xl border bg-[#111114] transition-transform duration-200 hover:-translate-y-1"
            style={{ borderColor: project.featured ? `${project.accent}45` : "rgba(255,255,255,.08)", boxShadow: project.featured ? `0 0 0 1px ${project.accent}14, 0 22px 60px ${project.accent}10` : undefined }}
          >
            <div className="h-1" style={{ background: project.accent }} />
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `${project.accent}18` }}>
                    <FolderGit2 size={18} style={{ color: project.accent }} />
                  </span>
                  <h3 className="text-lg font-bold leading-tight text-white">{project.title}</h3>
                </div>
                {project.featured ? <span className="shrink-0 rounded-md border border-violet-500/25 bg-violet-500/10 px-2 py-1 text-xs font-semibold text-violet-300">Featured</span> : null}
              </div>

              <p className="mb-5 flex-1 text-base leading-7 text-zinc-400">{project.desc}</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Tag key={tech} text={tech} color={project.accent} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Star size={15} />
                  {project.stars}
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"><Github size={15} /> Code</a>
                  <a href="#" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"><ExternalLink size={15} /> Demo</a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-32 py-14 lg:scroll-mt-8">
      <SectionHeading kicker="Skills" title="Technologies & Tools" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SKILLS_GROUPS.map((group, index) => (
          <motion.div key={group.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ delay: index * 0.07, duration: 0.4 }}>
            <Panel className="h-full p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 shrink-0 rounded-full" style={{ background: group.color }} />
                <h3 className="text-lg font-bold text-zinc-100">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-md border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-zinc-300">{skill}</span>
                ))}
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-32 py-14 lg:scroll-mt-8">
      <SectionHeading kicker="About Me" title="The Developer Behind the Work" />

      <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="space-y-5 text-lg leading-8 text-zinc-400">
          <p>I'm Amanuel, a self-taught full-stack developer from Addis Ababa, Ethiopia. I started with a simple question: how does this website actually work? That curiosity turned into a full development journey.</p>
          <p>I focus on building things that work in the real world: clean APIs, responsive frontends, and systems that are thoughtfully designed rather than just functional. I take pride in writing code other developers can read and build on.</p>
          <p>My goal is to become a well-rounded engineer who can take a problem from idea to production, architecting solutions that scale and stand the test of time.</p>
        </div>

        <div className="relative border-l border-white/[0.1] pl-6">
          <ol className="space-y-6">
            {TIMELINE.map((item, index) => (
              <motion.li key={item.period} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="relative">
                <span className="absolute -left-[31px] top-2 flex h-3 w-3 items-center justify-center rounded-full border border-violet-400/60 bg-[#0a0a0b]"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /></span>
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.08em] text-violet-300">{item.period}</p>
                <h3 className="text-lg font-bold text-zinc-100">{item.event}</h3>
                <p className="mt-1 text-base leading-7 text-zinc-500">{item.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="scroll-mt-32 pb-14 pt-14 lg:scroll-mt-8">
      <SectionHeading kicker="Contact" title="Let's Work Together">Open to freelance work, collaborations, and interesting projects. Reach out and let's build something useful.</SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,1fr)]">
        <div className="flex flex-col gap-5">
          <Panel className="p-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
              <div>
                <h3 className="text-lg font-bold text-white">Available for Work</h3>
                <p className="text-base text-zinc-500">Open to new opportunities</p>
              </div>
            </div>
            <address className="space-y-3 not-italic">
              {[
                { icon: <MapPin size={16} />, text: "Addis Ababa, Ethiopia" },
                { icon: <Mail size={16} />, text: "your-email@example.com" },
                { icon: <Github size={16} />, text: "github.com/amanuel" },
              ].map((row) => (
                <p key={row.text} className="flex items-center gap-3 text-base text-zinc-400"><span className="text-zinc-600">{row.icon}</span>{row.text}</p>
              ))}
            </address>
          </Panel>

          <Panel className="overflow-x-auto p-5 font-mono text-sm leading-7 text-zinc-400">
            <pre aria-label="Current developer status">{`// current status
const dev = {
  name: "Amanuel",
  location: "Addis Ababa",
  available: true
}`}</pre>
          </Panel>
        </div>

        <Panel className="p-5 sm:p-6">
          <form onSubmit={submit} className="flex flex-col gap-5">
            {[
              { key: "name", label: "Name", type: "text", placeholder: "Your name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.key}>
                <label htmlFor={field.key} className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-zinc-400">{field.label}</label>
                <input
                  id={field.key}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                  className="min-h-12 w-full rounded-lg border border-white/[0.1] bg-[#18181b] px-4 text-base text-zinc-100 placeholder:text-zinc-600 transition-colors duration-150 focus:border-violet-400/70 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-zinc-400">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="w-full resize-y rounded-lg border border-white/[0.1] bg-[#18181b] px-4 py-3 text-base leading-7 text-zinc-100 placeholder:text-zinc-600 transition-colors duration-150 focus:border-violet-400/70 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
              />
            </div>
            <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-base font-bold text-white transition-colors duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
              {sent ? "Message Sent" : <><Mail size={18} /> Send Message</>}
            </button>
          </form>
        </Panel>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-6">
      <div className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">A</span>
          <span className="font-bold text-zinc-300">Amanuel.dev</span>
        </div>
        <p>© 2026 Amanuel Wendimu. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState<NavId>("overview");

  useEffect(() => {
    const ids: NavId[] = ["overview", "projects", "skills", "about", "contact"];
    const observers = ids.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0b] text-[#ededed] antialiased">
      <style>{`
        html { scroll-behavior: smooth; }
        body { font-family: "DM Sans", system-ui, sans-serif; background: #0a0a0b; }
        .font-display { font-family: "Bricolage Grotesque", "DM Sans", system-ui, sans-serif; }
        ::selection { background: rgba(139, 92, 246, .35); color: white; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 999px; }
      `}</style>

      <TopBar active={active} setActive={setActive} />
      <Sidebar active={active} setActive={setActive} />

      <main className="min-h-screen pt-32 lg:pt-0 lg:pl-[280px]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <DashboardRow />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
