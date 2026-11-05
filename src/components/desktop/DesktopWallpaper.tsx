import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const DesktopWallpaper: React.FC = () => {
  const { theme } = useTheme();

  if (theme === 'classic') {
    return (
      <div className="absolute inset-0 bg-[#008080] pointer-events-none select-none z-0 overflow-hidden" />
    );
  }

  // Default: Neon Terminal
  return (
    <div className="absolute inset-0 bg-[#080C16] pointer-events-none select-none z-0 overflow-hidden">
      {/* Deep atmospheric radial glow gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00E5FF]/[0.07] blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-[#8B5CF6]/[0.08] blur-[140px]" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF2E93]/[0.06] blur-[130px]" />

      {/* Cyber Grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 229, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle geometric lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="0" x2="35%" y2="100%" stroke="url(#cyberLineGrad)" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="90%" y1="0" x2="65%" y2="100%" stroke="url(#cyberLineGrad)" strokeWidth="1" strokeDasharray="6 6" />
      </svg>

      {/* CRT scanlines overlay */}
      <div className="crt-overlay absolute inset-0 opacity-30" />

      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 12, 22, 0.75) 100%)'
      }} />
    </div>
  );
};
