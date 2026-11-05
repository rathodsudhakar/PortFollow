import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AppId, WindowPosition, WindowDimensions, WindowState, WindowBounds } from '../types';

interface WindowManagerContextType {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  openWindow: (id: AppId, payload?: any) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  updatePosition: (id: AppId, position: WindowPosition) => void;
  updateSize: (id: AppId, size: WindowDimensions) => void;
  isMobile: boolean;
}

const DEFAULT_WINDOWS: Record<AppId, Omit<WindowState, 'zIndex'>> = {
  about: {
    id: 'about',
    title: 'about_me.exe',
    iconName: 'User',
    isOpen: true, // Default open on load
    isMinimized: false,
    isMaximized: false,
    position: { x: 48, y: 32 },
    size: { width: 780, height: 580 },
    minSize: { width: 340, height: 420 },
  },
  skills: {
    id: 'skills',
    title: 'skills.sys',
    iconName: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 40 },
    size: { width: 840, height: 600 },
    minSize: { width: 340, height: 420 },
  },
  projects: {
    id: 'projects',
    title: 'projects.folder',
    iconName: 'FolderGit2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 50 },
    size: { width: 880, height: 620 },
    minSize: { width: 340, height: 420 },
  },
  terminal: {
    id: 'terminal',
    title: 'terminal.exe',
    iconName: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 70 },
    size: { width: 760, height: 500 },
    minSize: { width: 340, height: 320 },
  },
  settings: {
    id: 'settings',
    title: 'display_settings.exe',
    iconName: 'Sliders',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 260, y: 80 },
    size: { width: 680, height: 520 },
    minSize: { width: 320, height: 380 },
  },
  contact: {
    id: 'contact',
    title: 'contact.exe',
    iconName: 'Send',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 90 },
    size: { width: 640, height: 540 },
    minSize: { width: 320, height: 380 },
  },
};

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const WindowManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [activeWindowId, setActiveWindowId] = useState<AppId | null>('about');

  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    let z = 10;
    (Object.keys(DEFAULT_WINDOWS) as AppId[]).forEach((id) => {
      initial[id] = {
        ...DEFAULT_WINDOWS[id],
        zIndex: id === 'about' ? ++z : 5,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  // Track responsive resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bringToFront = useCallback((id: AppId) => {
    setWindows((prevWindows) => {
      const highestZ = Math.max(...Object.values(prevWindows).map((w) => w.zIndex), 10);
      return {
        ...prevWindows,
        [id]: {
          ...prevWindows[id],
          zIndex: highestZ + 1,
          isMinimized: false,
        },
      };
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback((id: AppId, payload?: any) => {
    setWindows((prevWindows) => {
      const highestZ = Math.max(...Object.values(prevWindows).map((w) => w.zIndex), 10);
      const current = prevWindows[id];
      const currentX = current.position.x;
      const currentY = current.position.y;
      const maxX = typeof window !== 'undefined' ? Math.max(10, window.innerWidth - current.size.width - 20) : currentX;
      const maxY = typeof window !== 'undefined' ? Math.max(10, window.innerHeight - current.size.height - 60) : currentY;

      return {
        ...prevWindows,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: highestZ + 1,
          position: {
            x: Math.min(Math.max(20, currentX), maxX),
            y: Math.min(Math.max(20, currentY), maxY),
          },
          payload: payload ?? current.payload,
        },
      };
    });
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
      },
    }));

    setActiveWindowId((currentActive) => {
      if (currentActive !== id) return currentActive;
      const openRemaining = (Object.values(windows) as WindowState[])
        .filter((w) => w.isOpen && !w.isMinimized && w.id !== id)
        .sort((a, b) => b.zIndex - a.zIndex);
      return openRemaining.length > 0 ? openRemaining[0].id : null;
    });
  }, [windows]);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));

    setActiveWindowId((currentActive) => {
      if (currentActive !== id) return currentActive;
      const openRemaining = (Object.values(windows) as WindowState[])
        .filter((w) => w.isOpen && !w.isMinimized && w.id !== id)
        .sort((a, b) => b.zIndex - a.zIndex);
      return openRemaining.length > 0 ? openRemaining[0].id : null;
    });
  }, [windows]);

  const maximizeWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      const w = prev[id];
      const prevBounds: WindowBounds = {
        x: w.position.x,
        y: w.position.y,
        width: w.size.width,
        height: w.size.height,
      };
      return {
        ...prev,
        [id]: {
          ...w,
          isMaximized: true,
          prevBounds,
        },
      };
    });
    bringToFront(id);
  }, [bringToFront]);

  const restoreWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      const w = prev[id];
      return {
        ...prev,
        [id]: {
          ...w,
          isMaximized: false,
          position: w.prevBounds ? { x: w.prevBounds.x, y: w.prevBounds.y } : w.position,
          size: w.prevBounds ? { width: w.prevBounds.width, height: w.prevBounds.height } : w.size,
        },
      };
    });
    bringToFront(id);
  }, [bringToFront]);

  const toggleMaximize = useCallback((id: AppId) => {
    const w = windows[id];
    if (w.isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  }, [windows, restoreWindow, maximizeWindow]);

  const updatePosition = useCallback((id: AppId, position: WindowPosition) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  }, []);

  const updateSize = useCallback((id: AppId, size: WindowDimensions) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        toggleMaximize,
        bringToFront,
        updatePosition,
        updateSize,
        isMobile,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = (): WindowManagerContextType => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};
