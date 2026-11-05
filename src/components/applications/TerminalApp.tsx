import React, { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useTheme } from '../../context/ThemeContext';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_DATA } from '../../data/skills';

interface CommandOutput {
  id: string;
  command: string;
  result: React.ReactNode;
  isError?: boolean;
}

export const TerminalApp: React.FC = () => {
  const { openWindow, closeWindow } = useWindowManager();
  const { setTheme } = useTheme();

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: '',
      result: (
        <div className="space-y-1 text-xs">
          <div className="text-cyan-400 font-bold">
            PortFollow DevOS Kernel v2.6.0 (x86_64-pc-linux-gnu)
          </div>
          <div className="opacity-75">
            Type <span className="text-emerald-400 font-bold">help</span> to view available system commands.
          </div>
          <div className="opacity-50 text-[11px]">
            Session initialized for guest@portfollow-desktop. All modules loaded.
          </div>
        </div>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused when clicking inside terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), command: '', result: null },
      ]);
      return;
    }

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const parts = trimmed.split(' ');
    const base = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputResult: React.ReactNode = null;
    let isError = false;

    switch (base) {
      case 'help':
        outputResult = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div><span className="text-emerald-400 font-bold">about</span> : Open About Me window</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Open Skills matrix</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : Open Projects browser</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Open Contact console</div>
              <div><span className="text-emerald-400 font-bold">github</span> : Navigate to GitHub profile</div>
              <div><span className="text-emerald-400 font-bold">linkedin</span> : Open LinkedIn profile</div>
              <div><span className="text-emerald-400 font-bold">theme &lt;name&gt;</span> : Switch (neon|pastel|classic)</div>
              <div><span className="text-emerald-400 font-bold">ls</span> : List portfolio applications</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> : Print developer credentials</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Flush terminal screen</div>
              <div><span className="text-emerald-400 font-bold">date</span> : Print system timestamp</div>
              <div><span className="text-emerald-400 font-bold">history</span> : Show command history</div>
            </div>
          </div>
        );
        break;

      case 'about':
        openWindow('about');
        outputResult = <span className="text-emerald-400">Launching about_me.exe...</span>;
        break;

      case 'skills':
        openWindow('skills');
        outputResult = <span className="text-emerald-400">Loading skills.sys matrix... ({SKILLS_DATA.length} skills listed)</span>;
        break;

      case 'projects':
        openWindow('projects');
        outputResult = <span className="text-emerald-400">Opening projects.folder... ({PROJECTS_DATA.length} projects loaded)</span>;
        break;

      case 'contact':
        openWindow('contact');
        outputResult = <span className="text-emerald-400">Opening contact.exe communication window...</span>;
        break;

      case 'github':
        window.open('https://github.com/rathodsudhakar', '_blank', 'noreferrer');
        outputResult = (
          <span className="text-cyan-400">
            Redirecting to verified GitHub: https://github.com/rathodsudhakar
          </span>
        );
        break;

      case 'linkedin':
        window.open('https://www.linkedin.com/in/rathodsudhakar/', '_blank', 'noreferrer');
        outputResult = (
          <span className="text-cyan-400">
            Opening LinkedIn profile: https://www.linkedin.com/in/rathodsudhakar/
          </span>
        );
        break;

      case 'whoami':
        outputResult = (
          <div className="text-xs space-y-1 font-mono">
            <p className="text-cyan-400 font-bold">Sudhakar Rathod</p>
            <p className="text-slate-300">
              Role: Computer Science Student | Software Developer | Cybersecurity Enthusiast
            </p>
            <p className="text-emerald-400">Status: Active & open to engineering opportunities</p>
          </div>
        );
        break;

      case 'ls':
        outputResult = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-cyan-300">
            <span>about_me.exe</span>
            <span>skills.sys</span>
            <span>projects.folder</span>
            <span>terminal.exe</span>
            <span>display_settings.exe</span>
            <span>contact.exe</span>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'theme':
        if (arg === 'neon' || arg === 'pastel' || arg === 'classic') {
          setTheme(arg);
          outputResult = (
            <span className="text-emerald-400">
              System theme updated to: <strong>{arg}</strong>
            </span>
          );
        } else {
          isError = true;
          outputResult = (
            <span className="text-rose-400">
              Invalid theme "{arg}". Choose from: neon, pastel, classic. Example: `theme neon`
            </span>
          );
        }
        break;

      case 'date':
        outputResult = <span className="text-amber-400">{new Date().toString()}</span>;
        break;

      case 'history':
        outputResult = (
          <div className="text-xs font-mono space-y-0.5">
            {commandList.map((c, idx) => (
              <div key={idx} className="opacity-75">
                {idx + 1}  {c}
              </div>
            ))}
          </div>
        );
        break;

      case 'exit':
        closeWindow('terminal');
        return;

      default:
        isError = true;
        outputResult = (
          <div className="text-xs text-rose-400 font-mono">
            Command not found: <code className="bg-rose-950/40 px-1 py-0.5 rounded">{trimmed}</code>.
            Type <span className="text-emerald-400 font-bold">help</span> to view all commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        result: outputResult,
        isError,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextPointer = historyPointer === -1 ? commandList.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandList[nextPointer] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandList.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandList[nextPointer] || '');
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="flex flex-col h-full font-mono text-xs md:text-sm bg-[#080C16] text-[#39FF14] p-3 rounded-lg border border-[#223552] overflow-hidden cursor-text selection:bg-[#00E5FF] selection:text-[#080C16]"
    >
      {/* Scrollable history output */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-cyan-400 font-bold">sudhakar@devos:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.result && <div className="pl-2">{item.result}</div>}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input Line */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800 shrink-0">
        <span className="text-cyan-400 font-bold shrink-0">sudhakar@devos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command prompt"
          className="flex-1 bg-transparent text-[#39FF14] outline-none font-mono caret-[#39FF14] text-xs md:text-sm"
        />
      </div>
    </div>
  );
};
