import React from 'react';
import { DesktopWallpaper } from './DesktopWallpaper';
import { DesktopIcons } from './DesktopIcons';
import { WindowFrame } from '../window-manager/WindowFrame';
import { AboutApp } from '../applications/AboutApp';
import { SkillsApp } from '../applications/SkillsApp';
import { ProjectsApp } from '../applications/ProjectsApp';
import { TerminalApp } from '../applications/TerminalApp';
import { SettingsApp } from '../applications/SettingsApp';
import { ContactApp } from '../applications/ContactApp';
import { Taskbar } from '../taskbar/Taskbar';

export const DesktopWorkspace: React.FC = () => {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden select-none"
      role="main"
      aria-label="PortFollow DevOS Workspace"
    >
      {/* 1. Cinematic & Retro Wallpaper Layer */}
      <DesktopWallpaper />

      {/* 2. Desktop Shortcut Icons Grid */}
      <DesktopIcons />

      {/* 3. Managed Window Frames */}
      <WindowFrame id="about">
        <AboutApp />
      </WindowFrame>

      <WindowFrame id="skills">
        <SkillsApp />
      </WindowFrame>

      <WindowFrame id="projects">
        <ProjectsApp />
      </WindowFrame>

      <WindowFrame id="terminal">
        <TerminalApp />
      </WindowFrame>

      <WindowFrame id="settings">
        <SettingsApp />
      </WindowFrame>

      <WindowFrame id="contact">
        <ContactApp />
      </WindowFrame>

      {/* 4. Bottom Taskbar & Start Menu */}
      <Taskbar />
    </main>
  );
};
