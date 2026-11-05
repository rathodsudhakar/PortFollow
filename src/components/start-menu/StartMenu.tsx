import React, { useRef, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import type { AppId } from '../../types';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { 
  User, 
  Cpu, 
  FolderGit2, 
  Terminal, 
  Sliders, 
  Send, 
  Power, 
  Download
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow } = useWindowManager();
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLaunch = (id: AppId) => {
    openWindow(id);
    onClose();
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Sudhakar_Rathod_Resume.txt';
    link.download = 'Sudhakar_Rathod_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={`fixed bottom-12 left-2 z-50 w-80 md:w-96 rounded-xl overflow-hidden shadow-2xl border transition-all animate-fadeIn ${
        theme === 'classic'
          ? 'win98-box-outset bg-[#C0C0C0] text-black font-sans'
          : 'bg-[#101827]/95 backdrop-blur-md text-slate-100 border-[#223552] shadow-neon-cyan/20'
      }`}
    >
      {/* Top Banner / User Identity */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          theme === 'classic'
            ? 'bg-[#000080] text-white'
            : 'bg-[#1B2A41] text-[#00E5FF] border-[#223552]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
              theme === 'classic'
                ? 'bg-white text-blue-900'
                : 'bg-[#080C16] text-[#00E5FF] border border-[#00E5FF]/40'
            }`}
          >
            SR
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm leading-tight text-white">
              Sudhakar Rathod
            </h3>
            <p className="text-[11px] opacity-80 font-mono text-cyan-200">
              DevOS // Personal Workspace
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-white">
          ONLINE
        </span>
      </div>

      {/* Application Links List */}
      <div className="p-2 space-y-1">
        <div className="text-[10px] uppercase font-mono px-3 py-1 opacity-50 tracking-wider">
          System Programs
        </div>

        <button
          onClick={() => handleLaunch('about')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#00E5FF] text-slate-200'
          }`}
        >
          <User className="w-4 h-4 text-cyan-400" />
          <div className="flex-1">
            <div className="font-semibold">About Me</div>
            <div className="text-[10px] opacity-60">about_me.exe</div>
          </div>
        </button>

        <button
          onClick={() => handleLaunch('skills')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#39FF14] text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4 text-emerald-400" />
          <div className="flex-1">
            <div className="font-semibold">My Skills</div>
            <div className="text-[10px] opacity-60">skills.sys</div>
          </div>
        </button>

        <button
          onClick={() => handleLaunch('projects')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#8B5CF6] text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-purple-400" />
          <div className="flex-1">
            <div className="font-semibold">Projects</div>
            <div className="text-[10px] opacity-60">projects.folder</div>
          </div>
        </button>

        <button
          onClick={() => handleLaunch('terminal')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#00E5FF] text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <div className="flex-1">
            <div className="font-semibold">Interactive Terminal</div>
            <div className="text-[10px] opacity-60">terminal.exe</div>
          </div>
        </button>

        <button
          onClick={() => handleLaunch('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#FFC857] text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          <div className="flex-1">
            <div className="font-semibold">Display Settings</div>
            <div className="text-[10px] opacity-60">display_settings.exe</div>
          </div>
        </button>

        <button
          onClick={() => handleLaunch('contact')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
            theme === 'classic'
              ? 'hover:bg-[#000080] hover:text-white'
              : 'hover:bg-[#1B2A41] hover:text-[#FF2E93] text-slate-200'
          }`}
        >
          <Send className="w-4 h-4 text-pink-400" />
          <div className="flex-1">
            <div className="font-semibold">Contact Console</div>
            <div className="text-[10px] opacity-60">contact.exe</div>
          </div>
        </button>
      </div>

      {/* External Links & Utility Bar */}
      <div className="p-2 border-t border-white/10 bg-black/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/rathodsudhakar"
            target="_blank"
            rel="noreferrer"
            title="GitHub Profile"
            className="p-1.5 rounded hover:bg-white/10 text-current transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rathodsudhakar/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
            className="p-1.5 rounded hover:bg-white/10 text-current transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <button
            onClick={handleDownloadResume}
            title="Download Resume"
            className="p-1.5 rounded hover:bg-white/10 text-current transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] opacity-75 hover:opacity-100 transition-opacity"
        >
          <Power className="w-3.5 h-3.5" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};
