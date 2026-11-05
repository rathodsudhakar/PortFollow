import { ThemeProvider } from './context/ThemeContext';
import { WindowManagerProvider } from './context/WindowManagerContext';
import { DesktopWorkspace } from './components/desktop/DesktopWorkspace';

export function App() {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <DesktopWorkspace />
      </WindowManagerProvider>
    </ThemeProvider>
  );
}

export default App;
