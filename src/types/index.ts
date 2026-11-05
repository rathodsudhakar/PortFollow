export type ThemeId = 'neon' | 'pastel' | 'classic';

export type AppId = 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'terminal' 
  | 'settings' 
  | 'contact';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

export interface WindowBounds extends WindowPosition, WindowDimensions {}

export interface WindowState {
  id: AppId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  size: WindowDimensions;
  prevBounds?: WindowBounds;
  zIndex: number;
  minSize: WindowDimensions;
  payload?: any;
}

export type SkillCategory = 
  | 'Programming Languages' 
  | 'Frontend' 
  | 'Backend' 
  | 'Databases' 
  | 'Cloud & Tools' 
  | 'Cybersecurity';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  practicalUsage: string;
  relatedProjectIds: string[];
  icon: string;
  tag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  features: string[];
  challenges: string;
  whatILearned: string;
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  statusBadge: string;
  architectureNotes?: string;
}

export interface TerminalHistoryItem {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
  isError?: boolean;
}
