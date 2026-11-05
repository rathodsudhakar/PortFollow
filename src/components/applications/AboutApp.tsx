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
    <div className="space-y-6 max-w-4xl mx-auto pb-4">
      {/* Top Hero Banner */}
      <div
        className={`p-6 rounded-xl border transition-all ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8] text-black'
            : theme === 'pastel'
            ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 shadow-sm'
            : 'bg-gradient-to-r from-[#1B2A41]/80 to-[#101827]/90 border-[#223552] shadow-neon-cyan/10'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Cyber Initials Avatar Badge */}
          <div className="relative group shrink-0">
            <div
              className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-3xl shadow-lg border-2 ${
                theme === 'classic'
                  ? 'win98-box-outset bg-[#000080] text-white border-white'
                  : theme === 'pastel'
                  ? 'bg-purple-600 text-white border-purple-300 shadow-purple-200'
                  : 'bg-[#080C16] text-[#00E5FF] border-[#00E5FF] shadow-neon-cyan/40'
              }`}
            >
              <span>SR</span>
              <span className="text-[10px] tracking-widest mt-1 opacity-80 uppercase font-sans font-normal">
                DevOS // 01
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 bg-emerald-500 text-black shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Online
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                Sudhakar Rathod
              </h1>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-md font-mono border ${
                  theme === 'classic'
                    ? 'bg-[#C0C0C0] text-black border-black'
                    : theme === 'pastel'
                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                    : 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30'
                }`}
              >
                v2.6.0_STABLE
              </span>
            </div>

            <p
              className={`text-sm md:text-base font-medium ${
                theme === 'classic' ? 'text-blue-900 font-bold' : theme === 'pastel' ? 'text-purple-700' : 'text-[#39FF14]'
              }`}
            >
              Computer Science Student | Software Developer | Cybersecurity Enthusiast
            </p>

            <p className="text-xs md:text-sm leading-relaxed opacity-90 pt-1">
              Building resilient, type-safe full-stack software and cybersecurity tools. Focused on enterprise backend systems, intuitive frontends, and practical web vulnerability research.
            </p>

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <a
                href="https://github.com/rathodsudhakar"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                    : theme === 'pastel'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                    : 'bg-[#1E293B] hover:bg-[#223552] text-slate-100 border border-[#223552]'
                }`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/rathodsudhakar/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                    : theme === 'pastel'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                    : 'bg-[#1E293B] hover:bg-[#223552] text-slate-100 border border-[#223552]'
                }`}
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <button
                onClick={handleDownloadResume}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

      {/* Grid of details: Education, Career Goals, Technical Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education */}
        <div
          className={`p-4 rounded-xl border ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8]'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827]/80 border-[#223552]'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase font-mono">
              Education & Academic Foundation
            </h2>
          </div>
          <div className="space-y-2 text-xs md:text-sm">
            <p className="font-semibold">Bachelor of Technology / Engineering in Computer Science</p>
            <p className="opacity-80">
              Rigorous coursework encompassing Data Structures & Algorithms, Object-Oriented Analysis & Design, Database Management Systems, Computer Networks, and Information Security.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Data Structures & Algorithms
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Operating Systems
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Computer Networks
              </span>
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div
          className={`p-4 rounded-xl border ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8]'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827]/80 border-[#223552]'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase font-mono">
              Career Trajectory & Goals
            </h2>
          </div>
          <div className="space-y-2 text-xs md:text-sm">
            <p className="font-semibold">Software Developer & Security Engineer</p>
            <p className="opacity-80">
              Aspiring to architect scalable enterprise services and fortified web ecosystems. Dedicated to bridging the gap between innovative software product features and uncompromising application security defense.
            </p>
            <ul className="space-y-1 pt-1 opacity-90 text-xs">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Designing distributed, resilient backend architectures</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Implementing automated DevSecOps and vulnerability scans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Interests & Current Learning Focus */}
      <div
        className={`p-4 rounded-xl border ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8]'
            : theme === 'pastel'
            ? 'bg-white border-purple-100 shadow-sm'
            : 'bg-[#101827]/80 border-[#223552]'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase font-mono">
            Technical Interests & Current Learning Focus
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div>
            <h3 className="font-semibold mb-1 text-xs uppercase tracking-wider text-cyan-400">
              Primary Technical Interests
            </h3>
            <p className="opacity-80 leading-relaxed">
              Full-Stack Engineering (React, Spring Boot, Flask, Node.js), Applied Cryptography, Web Application Penetration Testing (OWASP Top 10), and Cloud Infrastructure deployment with AWS.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-xs uppercase tracking-wider text-purple-400">
              Active Focus & Ongoing Exploration
            </h3>
            <p className="opacity-80 leading-relaxed">
              Diving deeper into automated security scanning pipelines, advanced vulnerability heuristics, LLM application engineering with Google Gemini API, and high-performance concurrency models.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Buttons to Other Apps */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="text-xs opacity-75 font-mono">
          Explore deeper modules within DevOS:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => openWindow('skills')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#00E5FF] border border-[#223552]'
            }`}
          >
            Open Skills.sys
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openWindow('projects')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-pink-100 hover:bg-pink-200 text-pink-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#FF2E93] border border-[#223552]'
            }`}
          >
            Open Projects.folder
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openWindow('terminal')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#39FF14] border border-[#223552]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Launch Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
