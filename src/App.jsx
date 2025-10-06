import React, { useEffect } from "react";

// Terminal-Style Backend Portfolio – Send message section removed

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f0f] text-slate-100">
    <GridBG />

    <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-emerald-900/30">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-start">
    <div className="text-sm font-mono text-emerald-400">$ portfolio</div>
    </div>
    </header>

    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    <TerminalCard>
    <div className="space-y-4">
    <Prompt>$ whoami</Prompt>
    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans">Nisanth Nimashakavi</h1>
    <p className="text-slate-300/90">Data Science Student & Full-Stack Developer</p>


    <div className="pt-2">
    <Prompt>$ skills</Prompt>
    <div className="mt-3 flex flex-wrap gap-2">
    {['Python','Java','Dart','R','TypeScript','JavaScript','TensorFlow','PyTorch','Keras','Scikit-learn','Flask','Django','FastAPI','Flutter','pandas','NumPy'].map((t)=> (
      <Badge key={t}>{t}</Badge>
    ))}
    </div>
    </div>
    </div>
    </TerminalCard>

    {/* Education */}
    <section id="education" className="mt-10">
    <TerminalCard>
    <Prompt>$ education</Prompt>
    <div className="mt-3 space-y-3">
    <EduItem degree="Bachelor of Science in Data Science" school="Rutgers University, New Brunswick, NJ" year="Aug 2024 – May 2028" />
    </div>
    </TerminalCard>
    </section>

    {/* Projects */}
    <section id="projects" className="mt-10">
    <TerminalCard>
    <Prompt>$ projects</Prompt>
    <div className="mt-4 grid md:grid-cols-2 gap-4">
    <ProjectCard title="LeetDuel Online" desc="Real-time multiplayer competitive coding platform built with FastAPI, PostgreSQL, and React; deployed via Render and Vercel with authentication, leaderboards, and problem tracking." stack={["FastAPI","PostgreSQL","React","TypeScript","Vercel"]} link="https://leet-duel-online.vercel.app/" />
    <ProjectCard title="Shot Sense" desc="Implemented real-time gunshot detection models with 98% accuracy using CNNs; designed intuitive UI for visualization and alerts." stack={["Python","TensorFlow","CNN","UI Design"]} link="https://github.com/nimnim111/ShotSense" />
    <ProjectCard title="Research Paper" desc="NLP research on detecting bias in job descriptions; developed models promoting fairer recruitment and inclusivity." stack={["NLP","Python","GPT-4"]} link="https://zenodo.org/records/13897047" />
    </div>
    </TerminalCard>
    </section>

    {/* Experience */}
    <section id="experience" className="mt-10">
    <TerminalCard>
    <Prompt>$ experience</Prompt>
    <div className="mt-4 space-y-5">
    <div>
    <h3 className="font-semibold text-lg text-emerald-200">Student Bono Internships and Volunteer</h3>
    <p className="text-sm text-slate-400">Various Non-Profits | May 2023 – Aug 2024</p>
    <ul className="mt-2 list-disc list-inside text-sm text-slate-300 space-y-1">
    <li>Developed custom full-stack applications to streamline non-profit operations, reducing costs by over 100%.</li>
    <li>Delivered cost-effective tech solutions saving organizations over $10,000 collectively.</li>
    <li>Collaborated to optimize workflows and implement digital tools enhancing productivity and social impact.</li>
    </ul>
    </div>

    <div>
    <h3 className="font-semibold text-lg text-emerald-200">Lead Martial Arts Instructor</h3>
    <p className="text-sm text-slate-400">West Coast World Martial Arts, California | Jan 2023 – Aug 2024</p>
    <ul className="mt-2 list-disc list-inside text-sm text-slate-300 space-y-1">
    <li>Improved student tricking proficiency by 30% through structured training programs.</li>
    <li>Managed and mentored a team of three instructors to ensure personalized and high-quality coaching.</li>
    <li>Directed initiatives that boosted student retention by 30% through custom feedback loops and progression tracking.</li>
    <li>Introduced innovative tricking methodologies and skill frameworks improving engagement and performance.</li>
    </ul>
    </div>
    </div>
    </TerminalCard>
    </section>


    {/* Contact – without send message form */}
    <section id="contact" className="mt-10">
    <TerminalCard>
    <div className="space-y-6">
    <div>
    <Prompt>$ contact --info</Prompt>
    <h2 className="mt-2 text-3xl font-bold">Let's Connect</h2>
    </div>

    <div className="space-y-6">
    <div>
    <Prompt>$ location --current</Prompt>
    <div className="mt-2 flex items-center gap-2 text-slate-200">
    <span className="inline-block h-5 w-5 rounded-full bg-emerald-500" />
    San Francisco, CA
    </div>
    </div>

    <div>
    <Prompt>$ contact --email</Prompt>
    <a href="mailto:nisanth.s.nimashakavi@gmail.com" className="mt-2 inline-flex rounded-md bg-emerald-900/30 px-4 py-2 font-mono text-emerald-100 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-900/40">
    nisanth.s.nimashakavi@gmail.com
    </a>
    </div>

    <Prompt>$ cat resume.pdf</Prompt>
    <a
    href="/resume.pdf"
    download="Nisanth_Nimashakavi_Resume.pdf"
    className="mt-2 inline-flex items-center gap-2 rounded-md bg-emerald-900/30 px-4 py-2 text-sm text-emerald-100 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-900/40"
    >
    <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
    Download Resume
    </a>


    <div>
    <Prompt>$ ls ./social-links</Prompt>
    <div className="mt-3 grid gap-4 md:grid-cols-2">
    <SocialCard title="GitHub" subtitle="@Nisanth-Nimashakavi" href="https://github.com/Nisanth-Nimashakavi" />
    <SocialCard title="LinkedIn" subtitle="Nisanth Nimashakavi" href="https://www.linkedin.com/in/nisanth-nimashakavi-98a817326/" />
    </div>
    </div>
    </div>
    </div>
    </TerminalCard>
    </section>
    </main>

    <footer className="py-10 text-center text-sm text-emerald-200/70">
    © {new Date().getFullYear()} Nisanth Nimashakavi · terminal portfolio
    </footer>
    </div>
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

function TerminalCard({ children }) {
  return (
    <div className="relative rounded-2xl border border-emerald-900/40 bg-[#0f1413] shadow-xl shadow-black/40">
    <div className="flex items-center gap-2 border-b border-emerald-900/30 px-3 py-2">
    <Dot className="bg-red-500" />
    <Dot className="bg-yellow-500" />
    <Dot className="bg-green-500" />
    </div>
    <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

function Dot({ className }) {
  return <span className={`inline-block h-3 w-3 rounded-full ${className}`} />;
}

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
    <div className="rounded-lg border border-emerald-900/40 bg-emerald-900/10 p-4">
    <div className="font-semibold text-lg">{degree}</div>
    <div className="text-sm text-slate-300">{school}</div>
    <div className="text-xs text-slate-400 mt-1">{year}</div>
    </div>
  );
}

function ProjectCard({ title, desc, stack, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-emerald-900/40 bg-emerald-900/10 p-4 hover:bg-emerald-900/20 transition">
    <div className="font-semibold text-lg text-emerald-200">{title}</div>
    <p className="mt-2 text-sm text-slate-300">{desc}</p>
    <div className="mt-3 flex flex-wrap gap-2 text-xs">
    {stack.map((s)=> <Badge key={s}>{s}</Badge>)}
    </div>
    </a>
  );
}

function SocialCard({ title, subtitle, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-emerald-900/40 bg-white/5 px-4 py-3 hover:bg-white/10">
    <div>
    <div className="font-medium">{title}</div>
    <div className="text-xs text-emerald-200/70">{subtitle}</div>
    </div>
    <span className="text-sm opacity-70">→</span>
    </a>
  );
}
