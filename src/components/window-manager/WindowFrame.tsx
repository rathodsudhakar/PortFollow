import React, { useRef, useState, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import type { AppId } from '../../types';
import type { LucideIcon } from 'lucide-react';
import { Minus, Square, Copy, X, User, Cpu, FolderGit2, Terminal, Sliders, Send } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  User,
  Cpu,
  FolderGit2,
  Terminal,
  Sliders,
  Send,
};

interface WindowFrameProps {
  id: AppId;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, children }) => {
  const {
    windows,
    activeWindowId,
    bringToFront,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updatePosition,
    isMobile,
  } = useWindowManager();

  const { theme } = useTheme();
  const windowState = windows[id];

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initPosX: number; initPosY: number }>({
    startX: 0,
    startY: 0,
    initPosX: 0,
    initPosY: 0,
  });

  const frameRef = useRef<HTMLDivElement>(null);

  const isActive = activeWindowId === id;

  // Dragging logic via pointer events
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with left click and non-touch if mobile is active
    if (e.button !== 0 || isMobile || windowState.isMaximized) return;

    // Check if clicked element was a button or interactive child
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    bringToFront(id);
    setIsDragging(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPosX: windowState.position.x,
      initPosY: windowState.position.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isMobile || windowState.isMaximized) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const taskbarHeight = 48;
    const currentW = Math.min(windowState.size.width, window.innerWidth - 16);
    const currentH = Math.min(windowState.size.height, window.innerHeight - taskbarHeight - 16);
    const maxX = Math.max(0, window.innerWidth - currentW);
    const maxY = Math.max(0, window.innerHeight - currentH - taskbarHeight);

    const newX = Math.min(Math.max(0, dragStartRef.current.initPosX + deltaX), maxX);
    const newY = Math.min(Math.max(0, dragStartRef.current.initPosY + deltaY), maxY);

    updatePosition(id, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture already released
      }
    }
  };

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && e.key === 'Escape') {
        // Optional quick close or unfocus
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const IconComponent = ICON_MAP[windowState.iconName] || Terminal;

  // Window styling calculations with strict laptop boundaries
  const style: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: windowState.zIndex,
      }
    : windowState.isMaximized
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: windowState.zIndex,
      }
    : {
        position: 'absolute',
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100vh - 56px)',
        zIndex: windowState.zIndex,
      };

  return (
    <div
      ref={frameRef}
      style={style}
      role="dialog"
      aria-label={windowState.title}
      aria-modal="false"
      onPointerDown={() => bringToFront(id)}
      className={`flex flex-col overflow-hidden transition-shadow duration-150 max-w-[calc(100vw-16px)] max-h-[calc(100vh-56px)] ${
        isDragging ? 'window-dragging select-none opacity-95' : ''
      } ${
        theme === 'classic'
          ? 'win98-box-outset bg-[#C0C0C0] text-black font-sans'
          : 'bg-[#101827]/95 backdrop-blur-md text-slate-100 rounded-xl border border-[#223552] shadow-os-window'
      }`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={() => !isMobile && toggleMaximize(id)}
        className={`flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing select-none border-b shrink-0 transition-colors duration-150 ${
          theme === 'classic'
            ? isActive
              ? 'bg-[#000080] text-white font-bold text-sm tracking-wide'
              : 'bg-[#808080] text-[#C0C0C0] font-bold text-sm tracking-wide'
            : isActive
            ? 'bg-[#1B2A41] text-[#00E5FF] border-[#223552]'
            : 'bg-[#0D1424] text-slate-400 border-slate-800'
        }`}
      >
        {/* Left: Icon + Title */}
        <div className="flex items-center space-x-2 truncate pointer-events-none">
          <IconComponent
            className={`w-4 h-4 shrink-0 ${
              theme === 'classic'
                ? 'text-white'
                : isActive ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          />
          <span
            className={`text-xs md:text-sm font-semibold tracking-wider font-mono truncate ${
              theme === 'classic' ? 'font-sans' : ''
            }`}
          >
            {windowState.title}
          </span>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center space-x-1 shrink-0 ml-2" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={() => minimizeWindow(id)}
            aria-label={`Minimize ${windowState.title}`}
            title="Minimize"
            className={`flex items-center justify-center p-1 rounded transition-colors ${
              theme === 'classic'
                ? 'w-5 h-5 bg-[#D4D0C8] text-black win98-box-outset active:win98-box-inset font-bold text-xs leading-none'
                : 'w-6 h-6 hover:bg-[#1E293B] hover:text-[#00E5FF] text-slate-300 active:bg-[#00E5FF]/20'
            }`}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore (hidden on mobile) */}
          {!isMobile && (
            <button
              onClick={() => toggleMaximize(id)}
              aria-label={windowState.isMaximized ? `Restore ${windowState.title}` : `Maximize ${windowState.title}`}
              title={windowState.isMaximized ? 'Restore' : 'Maximize'}
              className={`flex items-center justify-center p-1 rounded transition-colors ${
                theme === 'classic'
                  ? 'w-5 h-5 bg-[#D4D0C8] text-black win98-box-outset active:win98-box-inset font-bold text-xs leading-none'
                  : 'w-6 h-6 hover:bg-[#1E293B] hover:text-[#00E5FF] text-slate-300 active:bg-[#00E5FF]/20'
              }`}
            >
              {windowState.isMaximized ? (
                <Copy className="w-3.5 h-3.5" />
              ) : (
                <Square className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => closeWindow(id)}
            aria-label={`Close ${windowState.title}`}
            title="Close"
            className={`flex items-center justify-center p-1 rounded transition-colors ${
              theme === 'classic'
                ? 'w-5 h-5 bg-[#D4D0C8] text-black win98-box-outset active:win98-box-inset font-bold text-xs leading-none hover:bg-red-600 hover:text-white'
                : 'w-6 h-6 hover:bg-[#FF2E93] hover:text-white text-slate-300'
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div
        className={`flex-1 min-h-0 flex flex-col ${
          id === 'terminal'
            ? 'p-0 overflow-hidden bg-[#080C16]'
            : theme === 'classic'
            ? 'p-2 bg-[#C0C0C0] overflow-y-auto overflow-x-hidden'
            : 'p-3 sm:p-4 bg-[#101827]/90 text-slate-100 overflow-y-auto overflow-x-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
