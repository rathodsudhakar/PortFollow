import React from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { 
  Terminal, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  GraduationCap, 
  Compass, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AboutApp: React.FC = () => {
  const { openWindow } = useWindowManager();
  const { theme } = useTheme();

  const handleDownloadResume = () => {
    const resumeUrl = '/Sudhakar_Rathod_Resume.txt';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sudhakar_Rathod_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-2">
      {/* Top Hero Banner */}
      <div
        className={`p-4 sm:p-5 rounded-xl border transition-all ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8] text-black'
            : theme === 'pastel'
            ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 shadow-sm'
            : 'bg-gradient-to-r from-[#1B2A41]/80 to-[#101827]/90 border-[#223552] shadow-neon-cyan/10'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          {/* Cyber Initials Avatar Badge */}
          <div className="relative group shrink-0">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-2xl sm:text-3xl shadow-lg border-2 ${
                theme === 'classic'
                  ? 'win98-box-outset bg-[#000080] text-white border-white'
                  : theme === 'pastel'
                  ? 'bg-purple-600 text-white border-purple-300 shadow-purple-200'
                  : 'bg-[#080C16] text-[#00E5FF] border-[#00E5FF] shadow-neon-cyan/40'
              }`}
            >
              <span>SR</span>
              <span className="text-[9px] tracking-widest mt-0.5 opacity-80 uppercase font-sans font-normal">
                DevOS // 01
              </span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1 bg-emerald-500 text-black shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Online
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-bold tracking-tight">
                Sudhakar Rathod
              </h1>
            </div>

            <p
              className={`text-xs sm:text-sm font-medium ${
                theme === 'classic' ? 'text-blue-900 font-bold' : theme === 'pastel' ? 'text-purple-700' : 'text-[#39FF14]'
              }`}
            >
              B.E - Information Technology | Software Developer | Cybersecurity Enthusiast
            </p>

            <p className="text-xs leading-relaxed opacity-90">
              Building resilient, type-safe full-stack software and cybersecurity tools. Focused on enterprise backend systems, intuitive frontends, and practical web vulnerability research.
            </p>

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
              <a
                href="https://github.com/rathodsudhakar"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                    : theme === 'pastel'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                    : 'bg-[#1E293B] hover:bg-[#223552] text-slate-100 border border-[#223552]'
                }`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/rathodsudhakar/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                    : theme === 'pastel'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                    : 'bg-[#1E293B] hover:bg-[#223552] text-slate-100 border border-[#223552]'
                }`}
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              <button
                onClick={handleDownloadResume}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#000080] text-white hover:bg-blue-800'
                    : theme === 'pastel'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#080C16] font-semibold'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of details: Education, Career Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Education */}
        <div
          className={`p-3.5 sm:p-4 rounded-xl border ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8]'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827]/80 border-[#223552]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <h2 className="text-xs font-semibold tracking-wide uppercase font-mono">
              Education & Foundation
            </h2>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-semibold text-xs sm:text-sm">B.E - Information Technology</p>
            <p className="opacity-80 leading-relaxed">
              Coursework covering Data Structures & Algorithms, Object-Oriented Analysis, DBMS, Computer Networks, and Information Security.
            </p>
            <div className="pt-1 flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                DSA
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Operating Systems
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Networks
              </span>
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div
          className={`p-3.5 sm:p-4 rounded-xl border ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8]'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827]/80 border-[#223552]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-semibold tracking-wide uppercase font-mono">
              Career Trajectory & Goals
            </h2>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-semibold text-xs sm:text-sm">Software Developer & Security Engineer</p>
            <p className="opacity-80 leading-relaxed">
              Dedicated to bridging innovative software product features with uncompromising web vulnerability defense.
            </p>
            <ul className="space-y-1 pt-0.5 opacity-90 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Designing distributed, resilient backend architectures</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Implementing automated DevSecOps and vulnerability scans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Interests & Current Learning Focus */}
      <div
        className={`p-3.5 sm:p-4 rounded-xl border ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8]'
            : theme === 'pastel'
            ? 'bg-white border-purple-100 shadow-sm'
            : 'bg-[#101827]/80 border-[#223552]'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-semibold tracking-wide uppercase font-mono">
            Technical Interests & Focus
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <h3 className="font-semibold mb-1 text-[11px] uppercase tracking-wider text-cyan-400">
              Primary Technical Interests
            </h3>
            <p className="opacity-80 leading-relaxed">
              Full-Stack Engineering (React, Spring Boot, Flask, Node.js), Applied Cryptography, Web Penetration Testing (OWASP Top 10), and Cloud deployments with AWS.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-[11px] uppercase tracking-wider text-purple-400">
              Active Focus & Exploration
            </h3>
            <p className="opacity-80 leading-relaxed">
              Automated security scanning pipelines, advanced vulnerability heuristics, LLM application engineering with Gemini API, and high-performance concurrency models.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Buttons to Other Apps */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
        <span className="text-[11px] opacity-75 font-mono">
          Explore deeper modules within DevOS:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => openWindow('skills')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#00E5FF] border border-[#223552]'
            }`}
          >
            Skills.sys
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => openWindow('projects')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-pink-100 hover:bg-pink-200 text-pink-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#FF2E93] border border-[#223552]'
            }`}
          >
            Projects.folder
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => openWindow('terminal')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#39FF14] border border-[#223552]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
