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

// Calculate responsive, laptop-friendly default bounds
const calculateOptimalBounds = (
  appId: AppId,
  preferredWidth?: number,
  preferredHeight?: number
): { position: WindowPosition; size: WindowDimensions } => {
  const isClient = typeof window !== 'undefined';
  const vw = isClient ? window.innerWidth : 1200;
  const vh = isClient ? window.innerHeight : 800;
  const taskbarHeight = 48;
  const usableHeight = Math.max(280, vh - taskbarHeight);

  // Maximum allowed dimensions on laptop displays (with safety margins)
  const maxSafeWidth = Math.max(300, Math.floor(vw * 0.90));
  const maxSafeHeight = Math.max(240, Math.floor(usableHeight * 0.88));

  // Compact, laptop-optimized target sizes
  const defaultAppSizes: Record<AppId, { width: number; height: number }> = {
    about: { width: 700, height: 490 },
    skills: { width: 720, height: 500 },
    projects: { width: 740, height: 510 },
    terminal: { width: 500, height: 320 },
    settings: { width: 620, height: 450 },
    contact: { width: 560, height: 470 },
  };

  const baseSize = defaultAppSizes[appId] || { width: 640, height: 460 };
  const targetW = preferredWidth || baseSize.width;
  const targetH = preferredHeight || baseSize.height;

  // Clamp sizes to screen boundaries
  const width = Math.min(targetW, maxSafeWidth);
  const height = Math.min(targetH, maxSafeHeight);

  // Stagger sequence so multiple open windows cascade nicely without falling off screen
  const staggerOrder: Record<AppId, number> = {
    about: 0,
    skills: 1,
    projects: 2,
    terminal: 1,
    settings: 2,
    contact: 1,
  };
  const step = staggerOrder[appId] ?? 0;
  const staggerX = step * 22;
  const staggerY = step * 18;

  let posX: number;
  let posY: number;

  const leftMarginForDesktopIcons = 230;
  if (vw >= width + leftMarginForDesktopIcons + 30) {
    // There is room beside the 2 columns of desktop icons!
    posX = leftMarginForDesktopIcons + 15 + staggerX;
  } else {
    // Center horizontally on smaller laptop screens
    posX = Math.floor((vw - width) / 2) + (staggerX % 30);
  }

  // Center vertically in usable screen area with slight cascade
  posY = Math.max(12, Math.floor((usableHeight - height) / 2) + staggerY - 10);

  // Strict viewport boundary clamping
  const clampedX = Math.max(8, Math.min(posX, Math.max(8, vw - width - 8)));
  const clampedY = Math.max(8, Math.min(posY, Math.max(8, usableHeight - height - 8)));

  return {
    position: { x: clampedX, y: clampedY },
    size: { width, height },
  };
};

const DEFAULT_WINDOWS_CONFIG: Record<AppId, { title: string; iconName: string; minSize: WindowDimensions }> = {
  about: {
    title: 'about_me.exe',
    iconName: 'User',
    minSize: { width: 320, height: 380 },
  },
  skills: {
    title: 'skills.sys',
    iconName: 'Cpu',
    minSize: { width: 320, height: 380 },
  },
  projects: {
    title: 'projects.folder',
    iconName: 'FolderGit2',
    minSize: { width: 320, height: 380 },
  },
  terminal: {
    title: 'terminal.exe',
    iconName: 'Terminal',
    minSize: { width: 280, height: 200 },
  },
  settings: {
    title: 'display_settings.exe',
    iconName: 'Sliders',
    minSize: { width: 300, height: 340 },
  },
  contact: {
    title: 'contact.exe',
    iconName: 'Send',
    minSize: { width: 300, height: 340 },
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
    (Object.keys(DEFAULT_WINDOWS_CONFIG) as AppId[]).forEach((id) => {
      const bounds = calculateOptimalBounds(id);
      initial[id] = {
        id,
        title: DEFAULT_WINDOWS_CONFIG[id].title,
        iconName: DEFAULT_WINDOWS_CONFIG[id].iconName,
        isOpen: id === 'about', // Open About Me by default
        isMinimized: false,
        isMaximized: false,
        position: bounds.position,
        size: bounds.size,
        minSize: DEFAULT_WINDOWS_CONFIG[id].minSize,
        zIndex: id === 'about' ? ++z : 5,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  // Track responsive resize & clamp open windows within laptop viewport
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setWindows((prev) => {
          const updated: Record<string, WindowState> = { ...prev };
          const taskbarH = 48;
          const usableH = window.innerHeight - taskbarH;

          (Object.keys(prev) as AppId[]).forEach((id) => {
            const w = prev[id];
            if (w.isOpen && !w.isMaximized) {
              const maxW = Math.max(300, Math.floor(window.innerWidth * 0.92));
              const maxH = Math.max(240, Math.floor(usableH * 0.90));
              const newW = Math.min(w.size.width, maxW);
              const newH = Math.min(w.size.height, maxH);

              const maxX = Math.max(8, window.innerWidth - newW - 8);
              const maxY = Math.max(8, usableH - newH - 8);

              updated[id] = {
                ...w,
                size: { width: newW, height: newH },
                position: {
                  x: Math.max(8, Math.min(w.position.x, maxX)),
                  y: Math.max(8, Math.min(w.position.y, maxY)),
                },
              };
            }
          });
          return updated as Record<AppId, WindowState>;
        });
      }
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

      // Recompute optimal laptop bounds when opening
      const freshBounds = calculateOptimalBounds(id, current.size.width, current.size.height);

      return {
        ...prevWindows,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: highestZ + 1,
          position: freshBounds.position,
          size: freshBounds.size,
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
      const fallbackBounds = calculateOptimalBounds(id);
      return {
        ...prev,
        [id]: {
          ...w,
          isMaximized: false,
          position: w.prevBounds ? { x: w.prevBounds.x, y: w.prevBounds.y } : fallbackBounds.position,
          size: w.prevBounds ? { width: w.prevBounds.width, height: w.prevBounds.height } : fallbackBounds.size,
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
