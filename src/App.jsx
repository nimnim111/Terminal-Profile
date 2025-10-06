import React, { useEffect, useState, useCallback } from "react";

// Terminal-Style Portfolio – Normal by default; bigger only when green button is clicked
// • Red = Pin/Unpin to top bar (hide section)
// • Yellow = Minimize/Restore
// • Green = Expand larger readable mode / Exit (Esc)

export default function App() {
  const [expandedId, setExpandedId] = useState(null);
  const [pinned, setPinned] = useState({});

  // Esc exits enlarged mode
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setExpandedId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // force dark
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const togglePin = useCallback((id, title) => {
    setPinned((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = title;
      return next;
    });
  }, []);

  const scrollToAndHighlight = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const topOffset = 56 + 12;
    const y = el.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    el.classList.add("ring-2", "ring-emerald-500/60");
    setTimeout(() => el.classList.remove("ring-2", "ring-emerald-500/60"), 900);
  }, []);

  const restoreFromHeader = useCallback((id) => {
    setPinned((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      return next;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToAndHighlight(id)));
  }, [scrollToAndHighlight]);

  return (
    <div className="min-h-screen bg-[#0b0f0f] text-slate-100">
      <GridBG />

      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-emerald-900/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="text-sm font-mono text-emerald-400">$ portfolio</div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {Object.entries(pinned).map(([id, title]) => (
              <button
                key={id}
                onClick={() => restoreFromHeader(id)}
                className="inline-flex items-center gap-2 rounded-md border border-emerald-800/40 bg-emerald-900/20 px-2.5 py-1 text-xs font-mono text-emerald-200 hover:bg-emerald-900/30"
                title={`Restore $ ${title}`}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />${" "}{title}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 py-10 space-y-14">
        {renderSection("whoami", "whoami", pinned, togglePin, expandedId, setExpandedId, <WhoAmI />)}
        {renderSection("education", "education", pinned, togglePin, expandedId, setExpandedId, <Education />)}
        {renderSection("projects", "projects", pinned, togglePin, expandedId, setExpandedId, <Projects />)}
        {renderSection("experience", "experience", pinned, togglePin, expandedId, setExpandedId, <Experience />)}
        {renderSection("contact", "contact", pinned, togglePin, expandedId, setExpandedId, <Contact />)}
      </main>

      <footer className="py-12 text-center text-sm text-emerald-200/70">
        © {new Date().getFullYear()} Nisanth Nimashakavi · terminal portfolio
      </footer>
    </div>
  );
}

function renderSection(id, title, pinned, togglePin, expandedId, setExpandedId, children) {
  if (pinned[id]) return null;
  return (
    <section id={id}>
      <TerminalCard
        id={id}
        title={title}
        pinned={!!pinned[id]}
        onTogglePin={() => togglePin(id, title)}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
      >
        {children}
      </TerminalCard>
    </section>
  );
}

function TerminalCard({ id, title, children, pinned, onTogglePin, expandedId, setExpandedId }) {
  const [minimized, setMinimized] = useState(false);
  const isExpanded = expandedId === id;

  const toggleMin = useCallback(() => {
    if (isExpanded) return; // don't allow minimize while enlarged
    setMinimized((m) => !m);
  }, [isExpanded]);

  const toggleExpand = useCallback(() => {
    setExpandedId(isExpanded ? null : id);
  }, [isExpanded, id, setExpandedId]);

  return (
    <div
      id={id}
      className={`relative rounded-3xl border border-emerald-900/40 bg-[#0f1413] shadow-2xl shadow-black/40 transition-all duration-500 ease-in-out ${
        isExpanded ? "fixed inset-0 z-50 overflow-y-auto rounded-none" : ""
      }`}
    >
      {/* Backdrop when enlarged */}
      {isExpanded && <div aria-hidden className="fixed inset-0 -z-10 bg-black/80" />}

      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-emerald-900/30 px-4 py-3 select-none text-sm">
        <ButtonDot color="bg-red-500" label={pinned ? "Unpin from top bar" : "Pin to top bar"} onClick={onTogglePin} />
        <ButtonDot color="bg-yellow-500" label={minimized ? "Restore" : "Minimize"} onClick={toggleMin} disabled={isExpanded} />
        <ButtonDot color="bg-green-500" label={isExpanded ? "Exit enlarged view (Esc)" : "Enlarge for readability"} onClick={toggleExpand} />
        <div className="ml-3 font-mono text-xs text-emerald-300/80 truncate">$ {title}</div>
      </div>

      {/* Content */}
      {!minimized && (
        <div className={`p-6 sm:p-8 ${isExpanded ? "sm:max-w-6xl md:max-w-7xl lg:max-w-[95rem] mx-auto text-[1.35rem] md:text-[1.6rem] leading-[1.9]" : "text-[1rem] md:text-[1.1rem] leading-[1.8]"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

function ButtonDot({ color, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full ${color} ring-0 outline-none hover:scale-110 active:scale-95 transition-transform ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}

function GridBG() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.18]" style={{backgroundImage:"linear-gradient(rgba(0,0,0,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.4) 1px, transparent 1px)",backgroundSize:"24px 24px",backgroundPosition:"-1px -1px"}} />
      <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:"linear-gradient(rgba(16,185,129,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.35) 1px, transparent 1px)",backgroundSize:"24px 24px",backgroundPosition:"-1px -1px"}} />
    </div>
  );
}

/* Content components (kept modest by default; larger only in enlarged mode) */
function Prompt({ children }) {
  return <div className="font-mono text-emerald-400">{children}</div>;
}

function Badge({ children }) {
  return (
    <span className="rounded-md border border-emerald-900/50 bg-emerald-900/20 px-2.5 py-1 text-xs font-mono text-emerald-200">
      {children}
    </span>
  );
}

function EduItem({ degree, school, year }) {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-emerald-900/10 p-6">
      <div className="font-semibold text-xl">{degree}</div>
      <div className="text-base text-slate-300">{school}</div>
      <div className="text-sm text-slate-400 mt-1">{year}</div>
    </div>
  );
}

function ProjectCard({ title, desc, stack, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-emerald-900/40 bg-emerald-900/10 p-6 hover:bg-emerald-900/20 transition"
    >
      <div className="font-semibold text-xl text-emerald-200">{title}</div>
      <p className="mt-2 text-base text-slate-300">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {stack.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>
    </a>
  );
}

function SocialCard({ title, subtitle, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-900/40 bg-white/5 px-4 py-3 hover:bg-white/10"
    >
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-emerald-200/70">{subtitle}</div>
      </div>
      <span className="text-sm opacity-70">→</span>
    </a>
  );
}

const WhoAmI = () => (
  <div className="space-y-4">
    <Prompt>$ whoami</Prompt>
    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans">Nisanth Nimashakavi</h1>
    <p className="text-slate-300/90">Data Science Student & Full-Stack Developer</p>

    <div className="pt-2">
      <Prompt>$ skills</Prompt>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          "Python","Java","Dart","R","TypeScript","JavaScript","TensorFlow","PyTorch",
          "Keras","Scikit-learn","Flask","Django","FastAPI","Flutter","pandas","NumPy"
        ].map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
    </div>
  </div>
);

const Education = () => (
  <div className="space-y-3">
    <Prompt>$ education</Prompt>
    <EduItem degree="Bachelor of Science in Data Science" school="Rutgers University, New Brunswick, NJ" year="Aug 2024 – May 2028" />
  </div>
);

const Projects = () => (
  <div className="grid md:grid-cols-2 gap-4">
    <ProjectCard title="LeetDuel Online" desc="Real-time multiplayer competitive coding platform built with FastAPI, PostgreSQL, and React; deployed via Render and Vercel with authentication, leaderboards, and problem tracking." stack={["FastAPI","PostgreSQL","React","TypeScript","Vercel"]} link="https://leet-duel-online.vercel.app/" />
    <ProjectCard title="Shot Sense" desc="Implemented real-time gunshot detection models with 98% accuracy using CNNs; designed intuitive UI for visualization and alerts." stack={["Python","TensorFlow","CNN","UI Design"]} link="https://github.com/nimnim111/ShotSense" />
    <ProjectCard title="Research Paper" desc="NLP research on detecting bias in job descriptions; developed models promoting fairer recruitment and inclusivity." stack={["NLP","Python","GPT-4"]} link="https://zenodo.org/records/13897047" />
  </div>
);

const Experience = () => (
  <div className="space-y-5">
    <Prompt>$ experience</Prompt>
    <div>
      <h3 className="font-semibold text-lg text-emerald-200">Student Bono Internships and Volunteer</h3>
      <p className="text-sm text-slate-400">Various Non-Profits | May 2023 – Aug 2024</p>
      <ul className="mt-2 list-disc list-inside text-sm text-slate-300 space-y-1">
        <li>Developed full-stack applications streamlining non-profit operations, reducing costs by over 100%.</li>
        <li>Delivered cost-effective tech solutions saving organizations over $10,000 collectively.</li>
        <li>Optimized workflows and implemented digital tools enhancing productivity and social impact.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-lg text-emerald-200">Lead Martial Arts Instructor</h3>
      <p className="text-sm text-slate-400">West Coast World Martial Arts, California | Jan 2023 – Aug 2024</p>
      <ul className="mt-2 list-disc list-inside text-sm text-slate-300 space-y-1">
        <li>Improved student tricking proficiency by 30% through structured training programs.</li>
        <li>Managed and mentored a team of three instructors ensuring personalized, high-quality coaching.</li>
        <li>Boosted student retention by 30% through custom feedback loops and progression tracking.</li>
      </ul>
    </div>
  </div>
);

const Contact = () => (
  <div className="space-y-6">
    <Prompt>$ contact --info</Prompt>
    <h2 className="mt-2 text-3xl font-bold">Let's Connect</h2>

    <div>
      <Prompt>$ location --current</Prompt>
      <div className="mt-2 flex items-center gap-2 text-slate-200">
        <span className="inline-block h-5 w-5 rounded-full bg-emerald-500" /> San Francisco, CA
      </div>
    </div>

    <div>
      <Prompt>$ contact --email</Prompt>
      <a
        href="mailto:nisanth.s.nimashakavi@gmail.com"
        className="mt-2 inline-flex rounded-md bg-emerald-900/30 px-4 py-2 font-mono text-emerald-100 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-900/40"
      >
        nisanth.s.nimashakavi@gmail.com
      </a>
    </div>

    <div>
      <Prompt>$ cat resume.pdf</Prompt>
      <a
        href="/resume.pdf"
        download="Nisanth_Nimashakavi_Resume.pdf"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-emerald-900/30 px-4 py-2 text-sm text-emerald-100 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-900/40"
      >
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" /> Download Resume
      </a>
    </div>

    <div>
      <Prompt>$ ls ./social-links</Prompt>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <SocialCard title="GitHub" subtitle="@Nisanth-Nimashakavi" href="https://github.com/Nisanth-Nimashakavi" />
        <SocialCard title="LinkedIn" subtitle="Nisanth Nimashakavi" href="https://www.linkedin.com/in/nisanth-nimashakavi-98a817326/" />
      </div>
    </div>
  </div>
);
