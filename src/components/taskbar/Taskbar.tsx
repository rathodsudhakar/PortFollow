import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import type { AppId, WindowState } from '../../types';
import { StartMenu } from '../start-menu/StartMenu';
import { 
  Terminal, 
  Palette, 
  Wifi, 
  User, 
  Cpu, 
  FolderGit2, 
  Sliders, 
  Send
} from 'lucide-react';

const APP_ICONS: Record<string, React.ElementType> = {
  User,
  Cpu,
  FolderGit2,
  Terminal,
  Sliders,
  Send,
};

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    bringToFront,
    minimizeWindow,
    openWindow,
  } = useWindowManager();

  const { theme, setTheme } = useTheme();

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');

  // Live Digital Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const openAppList = (Object.values(windows) as WindowState[]).filter(
    (w) => w.isOpen
  );

  const handleTaskbarItemClick = (id: AppId) => {
    const w = windows[id];
    if (activeWindowId === id && !w.isMinimized) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const cycleTheme = () => {
    setTheme(theme === 'neon' ? 'classic' : 'neon');
  };

  return (
    <>
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

      <footer
        className={`fixed bottom-0 left-0 right-0 h-12 z-40 px-2 flex items-center justify-between border-t select-none transition-colors duration-150 ${
          theme === 'classic'
            ? 'win98-box-outset bg-[#C0C0C0] text-black border-white'
            : 'bg-[#101827]/90 backdrop-blur-md text-slate-100 border-[#223552] shadow-2xl'
        }`}
      >
        {/* Left Side: Start Button & Brand */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            aria-expanded={isStartOpen}
            aria-label="Start Menu"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
              theme === 'classic'
                ? isStartOpen
                  ? 'win98-box-inset bg-[#000080] text-white'
                  : 'win98-box-outset bg-[#D4D0C8] text-black active:win98-box-inset'
                : isStartOpen
                ? 'bg-[#00E5FF] text-[#080C16] shadow-neon-cyan/50'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-[#00E5FF] border border-[#223552]'
            }`}
          >
            {/* Retro / OS Icon */}
            <div className="w-4 h-4 rounded-sm bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-[10px] text-black font-extrabold">
              P
            </div>
            <span>Start</span>
          </button>

          {/* Quick Terminal Launcher */}
          <button
            onClick={() => openWindow('terminal')}
            title="Quick Launch Terminal (terminal.exe)"
            aria-label="Quick Launch Terminal"
            className={`p-1.5 rounded-md transition-colors ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] hover:bg-white text-black'
                : 'hover:bg-[#1B2A41] text-emerald-400'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Open App Tabs */}
        <div className="flex-1 flex items-center gap-1.5 px-2 overflow-x-auto no-scrollbar max-w-full">
          {openAppList.map((app) => {
            const Icon = APP_ICONS[app.iconName] || Terminal;
            const isActive = activeWindowId === app.id && !app.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => handleTaskbarItemClick(app.id)}
                aria-label={`Switch to ${app.title}`}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium truncate max-w-[150px] sm:max-w-[180px] transition-all shrink-0 ${
                  theme === 'classic'
                    ? isActive
                      ? 'win98-box-inset bg-[#000080] text-white font-bold'
                      : 'win98-box-outset bg-[#D4D0C8] text-black'
                    : isActive
                    ? 'bg-[#1B2A41] text-[#00E5FF] border border-[#00E5FF]/40 shadow-neon-cyan/20'
                    : 'bg-[#101827]/60 hover:bg-[#1B2A41]/80 text-slate-400 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{app.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tray with Theme Quick Switcher and Live Clock */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Theme Cycle Button */}
          <button
            onClick={cycleTheme}
            title={`Current theme: ${theme}. Click to switch theme.`}
            aria-label="Switch Theme"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                : 'bg-[#1B2A41] hover:bg-[#223552] text-amber-300 border border-[#223552]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline capitalize">{theme}</span>
          </button>

          {/* Clock & Online Indicator */}
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono ${
              theme === 'classic'
                ? 'win98-box-inset bg-[#C0C0C0] text-black'
                : 'bg-[#080C16]/80 text-slate-300 border border-[#223552]'
            }`}
          >
            <Wifi className="w-3 h-3 text-emerald-400 hidden sm:block" />
            <span className="tabular-nums font-semibold">{timeStr || '12:00:00'}</span>
          </div>
        </div>
      </footer>
    </>
  );
};
