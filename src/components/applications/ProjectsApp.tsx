import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import { GithubIcon } from '../common/Icons';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Search,
  Lock,
  HeartPulse,
  Bot,
  ShoppingBag,
  Monitor
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Interactive Desktop Portfolio': Monitor,
  'Web Security Scanner': Lock,
  'Healthcare Management System': HeartPulse,
  'AI Application': Bot,
  'E-commerce / Academic Project': ShoppingBag,
};

export const ProjectsApp: React.FC = () => {
  const { windows } = useWindowManager();
  const { theme } = useTheme();

  // Handle selected project requested via window payload
  const requestedProjectId = windows['projects']?.payload?.selectedProjectId;
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(requestedProjectId ?? null);
  const [prevRequestedId, setPrevRequestedId] = useState<string | undefined>(requestedProjectId);

  // Sync state during render when payload changes (React recommended pattern)
  if (requestedProjectId !== prevRequestedId) {
    setPrevRequestedId(requestedProjectId);
    setSelectedProjectId(requestedProjectId ?? null);
  }

  const activeProject = selectedProjectId
    ? (PROJECTS_DATA.find((p) => p.id === selectedProjectId) ?? null)
    : null;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Bar: Search or Breadcrumbs */}
      <div className="flex items-center justify-between border-b pb-3 border-white/10 shrink-0">
        {activeProject ? (
          <button
            onClick={() => setSelectedProjectId(null)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#00E5FF] border border-[#223552]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Projects
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono opacity-80">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Root / projects.folder /</span>
          </div>
        )}

        {!activeProject && (
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects or tech..."
              className={`w-full pl-8 pr-3 py-1 text-xs rounded-md border outline-none font-sans ${
                theme === 'classic'
                  ? 'win98-box-inset bg-white text-black'
                  : theme === 'pastel'
                  ? 'bg-purple-50/50 border-purple-200 text-gray-800 focus:border-purple-500'
                  : 'bg-[#1B2A41]/60 border-[#223552] text-slate-100 placeholder:text-slate-500 focus:border-[#00E5FF]'
              }`}
            />
          </div>
        )}
      </div>

      {/* Main View Area */}
      {activeProject ? (
        /* Detailed Project Inspection View */
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 animate-fadeIn">
          {/* Header */}
          <div
            className={`p-6 rounded-xl border ${
              theme === 'classic'
                ? 'win98-box-inset bg-[#D4D0C8] text-black'
                : theme === 'pastel'
                ? 'bg-white border-purple-100 shadow-sm'
                : 'bg-[#101827] border-[#223552]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold font-heading">{activeProject.title}</h2>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono ${
                      theme === 'classic'
                        ? 'bg-[#000080] text-white'
                        : theme === 'pastel'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                    }`}
                  >
                    {activeProject.statusBadge}
                  </span>
                </div>
                <p className="text-sm opacity-80 mt-1 font-mono">{activeProject.category}</p>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-2">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      theme === 'classic'
                        ? 'win98-box-outset bg-[#000080] text-white hover:bg-blue-800'
                        : theme === 'pastel'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#080C16] font-semibold'
                    }`}
                  >
                    <GithubIcon className="w-4 h-4" />
                    Verified GitHub Repo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs md:text-sm leading-relaxed opacity-90 border-t pt-3 border-white/10 font-sans">
              {activeProject.description}
            </p>

            {/* Technologies */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-2.5 py-1 rounded font-mono border ${
                    theme === 'classic'
                      ? 'bg-[#C0C0C0] border-black text-black'
                      : theme === 'pastel'
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : 'bg-[#1B2A41] text-cyan-300 border-[#223552]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture & Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Features */}
            <div
              className={`p-4 rounded-xl border ${
                theme === 'classic'
                  ? 'win98-box-inset bg-[#D4D0C8]'
                  : theme === 'pastel'
                  ? 'bg-white border-purple-100 shadow-sm'
                  : 'bg-[#101827] border-[#223552]'
              }`}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Key Architectural Features
              </h3>
              <ul className="space-y-2 text-xs md:text-sm font-sans">
                {activeProject.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Notes & Learned */}
            <div
              className={`p-4 rounded-xl border ${
                theme === 'classic'
                  ? 'win98-box-inset bg-[#D4D0C8]'
                  : theme === 'pastel'
                  ? 'bg-white border-purple-100 shadow-sm'
                  : 'bg-[#101827] border-[#223552]'
              }`}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-purple-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                System Architecture
              </h3>
              <p className="text-xs md:text-sm opacity-90 leading-relaxed font-sans mb-4">
                {activeProject.architectureNotes || 'Engineered with clean separation of concerns and robust data validation.'}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-amber-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Engineering Insights & What I Learned
              </h3>
              <p className="text-xs md:text-sm opacity-90 leading-relaxed font-sans">
                {activeProject.whatILearned}
              </p>
            </div>
          </div>

          {/* Technical Challenges */}
          <div
            className={`p-4 rounded-xl border ${
              theme === 'classic'
                ? 'win98-box-inset bg-[#D4D0C8]'
                : theme === 'pastel'
                ? 'bg-white border-purple-100 shadow-sm'
                : 'bg-[#101827] border-[#223552]'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-rose-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Technical Challenges Overcome
            </h3>
            <p className="text-xs md:text-sm opacity-90 leading-relaxed font-sans">
              {activeProject.challenges}
            </p>
          </div>
        </div>
      ) : (
        /* Grid of Projects */
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => {
              const CatIcon = CATEGORY_ICONS[project.category] || FolderGit2;

              return (
                <div
                  key={project.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-all group ${
                    theme === 'classic'
                      ? 'win98-box-outset bg-[#D4D0C8] text-black'
                      : theme === 'pastel'
                      ? 'bg-white border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300'
                      : 'bg-[#101827]/85 border-[#223552] hover:border-[#00E5FF]/60 hover:bg-[#162238]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            theme === 'classic'
                              ? 'win98-box-outset bg-[#000080] text-white'
                              : theme === 'pastel'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-[#1B2A41] text-[#00E5FF] border border-[#223552]'
                          }`}
                        >
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-base md:text-lg group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-[11px] font-mono opacity-70">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          theme === 'classic'
                            ? 'bg-[#C0C0C0] text-black border border-black'
                            : theme === 'pastel'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20'
                        }`}
                      >
                        {project.statusBadge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm opacity-85 leading-relaxed line-clamp-3 font-sans">
                      {project.description}
                    </p>

                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-0.5 rounded bg-black/10 dark:bg-white/5 font-mono opacity-75 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`text-xs font-mono font-medium underline underline-offset-4 flex items-center gap-1 ${
                        theme === 'classic'
                          ? 'text-blue-900 font-bold'
                          : theme === 'pastel'
                          ? 'text-purple-700'
                          : 'text-[#00E5FF]'
                      }`}
                    >
                      View Details & Specs
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open GitHub Repository"
                        className={`p-1.5 rounded transition-colors ${
                          theme === 'classic'
                            ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                            : theme === 'pastel'
                            ? 'hover:bg-purple-100 text-gray-700'
                            : 'hover:bg-[#1E293B] text-slate-300 hover:text-white'
                        }`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
