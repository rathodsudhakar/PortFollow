import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Check, Sliders, Monitor } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-4">
      {/* Intro */}
      <div className="flex items-center gap-3 border-b pb-3 border-white/10">
        <div
          className={`p-2.5 rounded-lg shrink-0 ${
            theme === 'classic'
              ? 'win98-box-outset bg-[#000080] text-white'
              : theme === 'pastel'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-[#1B2A41] text-[#00E5FF] border border-[#223552]'
          }`}
        >
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-heading">Display & Theme Settings</h2>
          <p className="text-xs opacity-75 font-mono">
            Customize DevOS system atmosphere, color palettes, and window frame borders.
          </p>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableThemes.map((item) => {
          const isSelected = theme === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setTheme(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setTheme(item.id);
                }
              }}
              className={`rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between group ${
                isSelected
                  ? theme === 'classic'
                    ? 'win98-box-inset bg-[#000080] text-white'
                    : theme === 'pastel'
                    ? 'bg-purple-50 border-purple-500 shadow-md ring-2 ring-purple-500/30'
                    : 'bg-[#162238] border-[#00E5FF] shadow-neon-cyan/20 ring-1 ring-[#00E5FF]'
                  : theme === 'classic'
                  ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                  : theme === 'pastel'
                  ? 'bg-white border-gray-200 hover:border-purple-300'
                  : 'bg-[#101827]/80 border-[#223552] hover:border-slate-500'
              }`}
            >
              {/* Miniature Window Preview */}
              <div className="space-y-3">
                <div
                  className="w-full h-24 rounded-lg p-2 border relative overflow-hidden flex flex-col justify-between shadow-inner"
                  style={{
                    backgroundColor: item.colors[0],
                    borderColor: isSelected ? item.colors[2] : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Mini window header */}
                  <div
                    className="h-4 rounded px-1.5 flex items-center justify-between"
                    style={{ backgroundColor: item.colors[1] }}
                  >
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.colors[2] }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.colors[3] }} />
                    </div>
                    <div
                      className="w-8 h-1 rounded"
                      style={{ backgroundColor: item.colors[2] }}
                    />
                  </div>

                  {/* Mini window content lines */}
                  <div className="space-y-1 my-auto">
                    <div
                      className="w-3/4 h-1.5 rounded"
                      style={{ backgroundColor: item.colors[2] }}
                    />
                    <div
                      className="w-1/2 h-1.5 rounded"
                      style={{ backgroundColor: item.colors[3] }}
                    />
                  </div>

                  {/* Mini taskbar */}
                  <div
                    className="h-3 rounded-b -mx-2 -mb-2 px-2 flex items-center gap-1 border-t border-black/20"
                    style={{ backgroundColor: item.colors[1] }}
                  >
                    <div className="w-3 h-1.5 rounded" style={{ backgroundColor: item.colors[2] }} />
                    <div className="w-2 h-1 rounded" style={{ backgroundColor: item.colors[3] }} />
                  </div>
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5 justify-center py-1">
                  {item.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-heading font-bold text-sm tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-[11px] opacity-75 mt-1 font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Selection status */}
              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-center">
                {isSelected ? (
                  <span className="text-xs font-mono font-bold flex items-center gap-1 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    Active Theme
                  </span>
                ) : (
                  <span className="text-[11px] font-mono opacity-60 group-hover:opacity-100">
                    Click to Apply
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* System notes */}
      <div
        className={`p-3 rounded-lg border text-xs font-mono ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8] text-black'
            : theme === 'pastel'
            ? 'bg-purple-50 text-gray-700 border-purple-200'
            : 'bg-[#101827] text-slate-400 border-[#223552]'
        }`}
      >
        <p className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Preference is preserved in localStorage and persists across page visits.</span>
        </p>
      </div>
    </div>
  );
};
