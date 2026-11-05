import React from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import type { AppId } from '../../types';

// Authentic Windows-Style Desktop Icons
const WindowsThisPCIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="36" height="25" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
    <rect x="9" y="11" width="30" height="19" rx="1.5" fill="#0284C7" />
    <rect x="11" y="13" width="16" height="11" rx="1" fill="#0369A1" stroke="#38BDF8" strokeWidth="0.75" />
    <line x1="13" y1="17" x2="23" y2="17" stroke="#BAE6FD" strokeWidth="1" strokeLinecap="round" />
    <line x1="13" y1="20" x2="19" y2="20" stroke="#BAE6FD" strokeWidth="1" strokeLinecap="round" />
    <circle cx="32" cy="18" r="3.5" fill="#F8FAFC" />
    <path d="M28 26C28 23.5 30 22.5 32 22.5C34 22.5 36 23.5 36 26" fill="#F8FAFC" />
    <path d="M22 33V37H26V33H22Z" fill="#94A3B8" />
    <rect x="16" y="37" width="16" height="3" rx="1.5" fill="#CBD5E1" />
  </svg>
);

const WindowsFolderIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 9.79086 5.79086 8 8 8H18.5C20.1 8 21.6 8.8 22.4 10.1L24.5 13H40C42.2091 13 44 14.7909 44 17V36C44 38.2091 42.2091 40 40 40H8C5.79086 40 4 38.2091 4 36V12Z" fill="#D99B26" />
    <rect x="8" y="14" width="32" height="18" rx="2" fill="#F8FAFC" />
    <line x1="12" y1="18" x2="24" y2="18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="22" x2="32" y2="22" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="26" x2="28" y2="26" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="winFolderFront" x1="24" y1="18" x2="24" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE066" />
        <stop offset="1" stopColor="#F5B324" />
      </linearGradient>
    </defs>
    <path d="M4 20C4 18.3431 5.34315 17 7 17H41C42.6569 17 44 18.3431 44 20V36C44 38.2091 42.2091 40 40 40H8C5.79086 40 4 38.2091 4 36V20Z" fill="url(#winFolderFront)" />
    <path d="M5 38.5H43" stroke="#FFF3B0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const WindowsTerminalIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="9" width="36" height="30" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
    <path d="M6 12C6 10.3431 7.34315 9 9 9H39C40.6569 9 42 10.3431 42 12V15H6V12Z" fill="#1E293B" />
    <circle cx="10" cy="12" r="1.5" fill="#EF4444" />
    <circle cx="15" cy="12" r="1.5" fill="#F59E0B" />
    <circle cx="20" cy="12" r="1.5" fill="#10B981" />
    <rect x="6" y="15" width="36" height="24" fill="#080C16" />
    <path d="M12 21L17 25L12 29" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="29" x2="28" y2="29" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WindowsCpuIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="16" y1="5" x2="16" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="5" x2="24" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="5" x2="32" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="38" x2="16" y2="43" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="38" x2="24" y2="43" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="38" x2="32" y2="43" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="16" x2="10" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="24" x2="10" y2="24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="32" x2="10" y2="32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="16" x2="43" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="24" x2="43" y2="24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="32" x2="43" y2="32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <rect x="9" y="9" width="30" height="30" rx="4" fill="#047857" stroke="#10B981" strokeWidth="1.5" />
    <rect x="15" y="15" width="18" height="18" rx="2" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
    <circle cx="24" cy="24" r="3" fill="#39FF14" />
  </svg>
);

const WindowsSettingsIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="18" cy="18" r="14" fill="#3B82F6" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M18 4V8M18 28V32M4 18H8M28 18H32M8 8L11 11M25 25L28 28M8 28L11 25M25 11L28 8" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <circle cx="18" cy="18" r="6" fill="#1E293B" stroke="#93C5FD" strokeWidth="1.5" />
    </g>
    <circle cx="34" cy="34" r="7" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
    <circle cx="34" cy="34" r="3" fill="#0F172A" />
  </svg>
);

const WindowsMailIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="36" height="25" rx="3" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
    <path d="M6 14L24 27L42 14" stroke="#F0F9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12V8C12 6.89543 12.8954 6 14 6H34C35.1046 6 36 6.89543 36 8V12" fill="#F8FAFC" opacity="0.9" />
    <line x1="16" y1="9" x2="26" y2="9" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="38" cy="14" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

// Windows Shortcut Arrow Overlay Badge
const ShortcutBadge: React.FC = () => (
  <div
    className="absolute -bottom-0.5 -left-0.5 w-4 h-4 bg-white/95 rounded-[2px] shadow-sm border border-slate-300 flex items-center justify-center pointer-events-none z-10"
    title="Shortcut"
  >
    <svg className="w-2.5 h-2.5 text-[#0067C0]" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 2h-6a1 1 0 0 0 0 2h3.586L4.293 11.293a1 1 0 1 0 1.414 1.414L13 5.414V9a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z" />
    </svg>
  </div>
);

interface ShortcutConfig {
  id: AppId;
  label: string;
  filename: string;
  icon: React.ElementType;
  accent: string;
}

// 4 icons in the first line/column, 2 in the second line/column
const SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'about',
    label: 'About Me',
    filename: 'about_me.exe',
    icon: WindowsThisPCIcon,
    accent: '#00E5FF',
  },
  {
    id: 'skills',
    label: 'My Skills',
    filename: 'skills.sys',
    icon: WindowsCpuIcon,
    accent: '#39FF14',
  },
  {
    id: 'projects',
    label: 'Projects',
    filename: 'projects.folder',
    icon: WindowsFolderIcon,
    accent: '#8B5CF6',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    filename: 'terminal.exe',
    icon: WindowsTerminalIcon,
    accent: '#00E5FF',
  },
  {
    id: 'settings',
    label: 'Display Settings',
    filename: 'display_settings.exe',
    icon: WindowsSettingsIcon,
    accent: '#FFC857',
  },
  {
    id: 'contact',
    label: 'Contact',
    filename: 'contact.exe',
    icon: WindowsMailIcon,
    accent: '#FF2E93',
  },
];

export const DesktopIcons: React.FC = () => {
  const { openWindow, closeWindow, windows, isMobile } = useWindowManager();
  const { theme } = useTheme();

  // Toggle open/close when clicking desktop folder/app icons
  const handleToggle = (id: AppId) => {
    if (windows[id]?.isOpen && !windows[id]?.isMinimized) {
      closeWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <nav
      aria-label="Desktop shortcuts"
      className={`relative z-10 p-4 ${
        isMobile
          ? 'grid grid-cols-4 gap-2 py-2 px-3 bg-black/20 backdrop-blur-sm border-b border-white/5 justify-items-center'
          : 'grid grid-flow-col grid-rows-4 gap-y-3 gap-x-4 w-max'
      }`}
    >
      {SHORTCUTS.map((item) => {
        const Icon = item.icon;
        const isOpen = windows[item.id]?.isOpen && !windows[item.id]?.isMinimized;

        return (
          <button
            key={item.id}
            onClick={() => handleToggle(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle(item.id);
              }
            }}
            aria-label={`${isOpen ? 'Close' : 'Open'} ${item.label} (${item.filename})`}
            title={`${isOpen ? 'Click to close' : 'Click to open'} ${item.filename}`}
            className={`group flex flex-col items-center justify-start p-2 rounded-lg transition-all focus:outline-none ${
              isMobile ? 'w-full max-w-[80px]' : 'w-20 md:w-24'
            } text-center cursor-pointer select-none border border-transparent ${
              isOpen
                ? theme === 'classic'
                  ? 'win98-box-inset bg-[#000080]/30 border-white'
                  : 'bg-[#0078D4]/30 border-[#0078D4]/60 shadow-sm'
                : theme === 'classic'
                ? 'hover:win98-box-outset hover:bg-[#D4D0C8]/40'
                : 'hover:bg-white/10 hover:border-white/20 active:bg-[#0078D4]/30'
            }`}
          >
            {/* Windows Desktop Icon Container */}
            <div className="relative mb-1">
              <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 drop-shadow-md">
                <Icon className="w-10 h-10 md:w-11 md:h-11" />
              </div>

              {/* Windows Shortcut Curved Arrow Badge */}
              <ShortcutBadge />

              {/* Active Open Indicator Dot */}
              {isOpen && (
                <span
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black/40 shadow-sm animate-pulse"
                  title="Application is currently open"
                />
              )}
            </div>

            {/* Windows-style label with drop shadow */}
            <span
              className={`text-[11px] font-sans font-medium tracking-tight leading-tight px-1 py-0.5 rounded-[2px] max-w-full truncate ${
                isOpen
                  ? 'bg-[#0078D4] text-white shadow-sm'
                  : theme === 'classic'
                  ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'
                  : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] group-hover:bg-white/20'
              }`}
            >
              {item.label}
            </span>

            {/* Sub-label filename (hidden on mobile) */}
            {!isMobile && (
              <span className="text-[9px] font-mono text-slate-300/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] truncate max-w-full">
                {item.filename}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
