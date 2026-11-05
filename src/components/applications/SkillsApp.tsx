import React, { useState } from 'react';
import { SKILLS_DATA, SKILL_CATEGORIES } from '../../data/skills';
import type { SkillItem } from '../../types';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Coffee, 
  Terminal, 
  FileCode2, 
  ShieldCheck, 
  Layout, 
  Code2, 
  Palette, 
  Sparkles, 
  Server, 
  Cpu, 
  Radio, 
  Network, 
  Database, 
  HardDrive, 
  Zap, 
  Cloud, 
  GitBranch, 
  FolderGit2, 
  ShieldAlert, 
  Shield, 
  Lock,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Coffee,
  Terminal,
  FileCode2,
  ShieldCheck,
  Layout,
  Code2,
  Palette,
  Sparkles,
  Server,
  Cpu,
  Radio,
  Network,
  Database,
  HardDrive,
  Zap,
  Cloud,
  GitBranch,
  FolderGit2,
  ShieldAlert,
  Shield,
  Lock,
};

export const SkillsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const { openWindow } = useWindowManager();
  const { theme } = useTheme();

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const handleOpenProject = (projectId: string) => {
    openWindow('projects', { selectedProjectId: projectId });
  };

  const SelectedIcon = ICON_MAP[selectedSkill.icon] || Cpu;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 shrink-0 border-b border-white/10">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? theme === 'classic'
                  ? 'win98-box-inset bg-[#000080] text-white font-bold'
                  : theme === 'pastel'
                  ? 'bg-purple-600 text-white font-medium shadow-sm'
                  : 'bg-[#00E5FF] text-[#080C16] font-bold shadow-neon-cyan/40'
                : theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : theme === 'pastel'
                ? 'bg-purple-50 hover:bg-purple-100 text-gray-700'
                : 'bg-[#1B2A41]/70 hover:bg-[#1B2A41] text-slate-300 border border-[#223552]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Area: Skills Grid + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[380px]">
        {/* Left Side: Skills Interactive Grid (7 Cols on LG) */}
        <div className="lg:col-span-7 overflow-y-auto pr-1 space-y-2">
          <p className="text-xs opacity-75 font-mono mb-2 flex items-center justify-between">
            <span>Showing {filteredSkills.length} competencies</span>
            <span className="opacity-75">Click any skill to inspect implementation details</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredSkills.map((skill) => {
              const IconComp = ICON_MAP[skill.icon] || Cpu;
              const isSelected = selectedSkill.id === skill.id;

              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`text-left p-3 rounded-lg border transition-all flex items-start gap-3 group ${
                    isSelected
                      ? theme === 'classic'
                        ? 'win98-box-inset bg-[#000080] text-white font-bold'
                        : theme === 'pastel'
                        ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-sm'
                        : 'bg-[#1B2A41] border-[#00E5FF] text-white shadow-neon-cyan/20 ring-1 ring-[#00E5FF]/50'
                      : theme === 'classic'
                      ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                      : theme === 'pastel'
                      ? 'bg-white border-gray-200 hover:border-purple-300 text-gray-800'
                      : 'bg-[#101827]/70 border-[#223552] hover:border-slate-500 text-slate-200 hover:bg-[#162238]'
                  }`}
                >
                  <div
                    className={`p-2 rounded-md shrink-0 transition-colors ${
                      isSelected
                        ? theme === 'classic'
                          ? 'bg-white text-blue-900'
                          : theme === 'pastel'
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#00E5FF]/20 text-[#00E5FF]'
                        : theme === 'classic'
                        ? 'bg-[#C0C0C0] text-black'
                        : theme === 'pastel'
                        ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                        : 'bg-[#1B2A41] text-slate-300 group-hover:text-[#00E5FF]'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-semibold truncate font-sans">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono opacity-60">
                        {skill.category.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-75 truncate mt-0.5 font-sans">
                      {skill.tag}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Skill Detail Panel (5 Cols on LG) */}
        <div
          className={`lg:col-span-5 p-4 rounded-xl border flex flex-col justify-between ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8] text-black'
              : theme === 'pastel'
              ? 'bg-purple-50/70 border-purple-200 text-gray-800 shadow-sm'
              : 'bg-[#101827] border-[#223552] text-slate-100 shadow-inner'
          }`}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b pb-3 border-white/10">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#000080] text-white'
                    : theme === 'pastel'
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
                }`}
              >
                <SelectedIcon className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-heading">{selectedSkill.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-white/10">
                    {selectedSkill.tag}
                  </span>
                </div>
                <span className="text-xs opacity-70 font-mono">
                  Category: {selectedSkill.category}
                </span>
              </div>
            </div>

            {/* Conceptual Overview */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider font-mono opacity-80 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Technical Overview
              </span>
              <p className="text-xs md:text-sm opacity-90 leading-relaxed font-sans">
                {selectedSkill.description}
              </p>
            </div>

            {/* Practical Usage in Portfolio Projects */}
            <div className="space-y-1 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider font-mono opacity-80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Practical Application & Engineering Role
              </span>
              <p className="text-xs md:text-sm leading-relaxed p-2.5 rounded-lg border bg-black/10 border-white/10 font-sans">
                {selectedSkill.practicalUsage}
              </p>
            </div>
          </div>

          {/* Linked Projects Connection */}
          <div className="pt-4 border-t border-white/10 mt-4">
            <span className="text-[11px] font-mono opacity-70 block mb-2">
              Integrated in Project(s):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSkill.relatedProjectIds.map((pId) => {
                const label =
                  pId === 'cyberscan-pro'
                    ? 'CyberScan-Pro'
                    : pId === 'digital-blood-bank'
                    ? 'Digital Blood Bank'
                    : pId === 'ai-text-summarizer'
                    ? 'AI Text Summarizer'
                    : pId === 'fabrici'
                    ? 'Fabrici'
                    : 'PortFollow DevOS';

                return (
                  <button
                    key={pId}
                    onClick={() => handleOpenProject(pId)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                      theme === 'classic'
                        ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                        : theme === 'pastel'
                        ? 'bg-purple-200 hover:bg-purple-300 text-purple-900'
                        : 'bg-[#1E293B] hover:bg-[#00E5FF] hover:text-[#080C16] text-[#00E5FF] border border-[#00E5FF]/30'
                    }`}
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
