import React from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import type { AppId } from '../../types';
import { 
  User, 
  Cpu, 
  FolderGit2, 
  Terminal, 
  Sliders, 
  Send 
} from 'lucide-react';

interface ShortcutConfig {
  id: AppId;
  label: string;
  filename: string;
  icon: React.ElementType;
  accent: string;
}

const SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'about',
    label: 'About Me',
    filename: 'about_me.exe',
    icon: User,
    accent: '#00E5FF',
  },
  {
    id: 'skills',
    label: 'My Skills',
    filename: 'skills.sys',
    icon: Cpu,
    accent: '#39FF14',
  },
  {
    id: 'projects',
    label: 'Projects',
    filename: 'projects.folder',
    icon: FolderGit2,
    accent: '#8B5CF6',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    filename: 'terminal.exe',
    icon: Terminal,
    accent: '#00E5FF',
  },
  {
    id: 'settings',
    label: 'Display Settings',
    filename: 'display_settings.exe',
    icon: Sliders,
    accent: '#FFC857',
  },
  {
    id: 'contact',
    label: 'Contact',
    filename: 'contact.exe',
    icon: Send,
    accent: '#FF2E93',
  },
];

export const DesktopIcons: React.FC = () => {
  const { openWindow, windows, bringToFront, isMobile } = useWindowManager();
  const { theme } = useTheme();

  const handleOpen = (id: AppId) => {
    if (windows[id]?.isOpen && !windows[id]?.isMinimized) {
      bringToFront(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <nav
      aria-label="Desktop shortcuts"
      className={`relative z-10 p-4 ${
        isMobile
          ? 'flex flex-row overflow-x-auto gap-4 py-3 bg-black/20 backdrop-blur-sm border-b border-white/5'
          : 'grid grid-flow-col grid-rows-6 gap-y-4 gap-x-6 w-max'
      }`}
    >
      {SHORTCUTS.map((item) => {
        const Icon = item.icon;
        const isOpen = windows[item.id]?.isOpen;

        return (
          <button
            key={item.id}
            onClick={() => handleOpen(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen(item.id);
              }
            }}
            aria-label={`Open ${item.label} (${item.filename})`}
            title={`Open ${item.filename}`}
            className={`group flex flex-col items-center justify-center p-2 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] w-20 md:w-24 text-center cursor-pointer select-none ${
              theme === 'classic'
                ? 'hover:bg-[#000080]/30 active:bg-[#000080]/50'
                : theme === 'pastel'
                ? 'hover:bg-purple-500/10 active:bg-purple-500/20'
                : 'hover:bg-white/10 active:bg-white/15'
            }`}
          >
            {/* Icon Container */}
            <div className="relative">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-active:scale-95 border ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black border-white'
                    : theme === 'pastel'
                    ? 'bg-white text-purple-600 border-purple-200 shadow-purple-200/50'
                    : 'bg-[#101827]/90 text-cyan-400 border-[#223552] shadow-neon-cyan/20 group-hover:border-[#00E5FF]'
                }`}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: theme === 'classic' ? '#000080' : undefined }} />
              </div>

              {/* Active Open Indicator Dot */}
              {isOpen && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080C16] shadow-sm animate-pulse"
                  title="Application is currently open"
                />
              )}
            </div>

            {/* Label */}
            <span
              className={`mt-1.5 text-xs font-mono font-medium tracking-wide truncate max-w-full drop-shadow ${
                theme === 'classic'
                  ? 'text-white bg-transparent px-1 group-focus:bg-[#000080]'
                  : theme === 'pastel'
                  ? 'text-gray-800 font-semibold group-focus:text-purple-700'
                  : 'text-slate-200 group-hover:text-cyan-300'
              }`}
            >
              {item.label}
            </span>

            {/* Sub-label filename (hidden on mobile) */}
            {!isMobile && (
              <span className="text-[10px] font-mono opacity-60 truncate max-w-full">
                {item.filename}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
