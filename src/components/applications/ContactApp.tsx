import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { 
  Send, 
  Mail, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare
} from 'lucide-react';

export const ContactApp: React.FC = () => {
  const { theme } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const developerEmail = 'rathodsudhakar7821@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developerEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleLaunchMailClient = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${developerEmail}?subject=${encodeURIComponent(
      subject || 'Inquiry via PortFollow DevOS'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyDraft = async () => {
    const draftText = `To: ${developerEmail}\nSubject: ${subject || 'Inquiry via PortFollow DevOS'}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(draftText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Sudhakar_Rathod_Resume.txt';
    link.download = 'Sudhakar_Rathod_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-4">
      {/* Header */}
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
          <Send className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-heading">Communication Terminal</h2>
          <p className="text-xs opacity-75 font-mono">
            Direct frequency channels for inquiries, collaborative engineering, and opportunities.
          </p>
        </div>
      </div>

      {/* Verified Direct Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Email Direct */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8] text-black'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827] border-[#223552]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold flex items-center gap-1.5 opacity-80">
              <Mail className="w-4 h-4 text-cyan-400" />
              Direct Email
            </span>
            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              {copiedEmail ? (
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
              )}
            </button>
          </div>
          <a
            href={`mailto:${developerEmail}`}
            className="text-xs font-mono font-medium hover:underline truncate text-cyan-400"
          >
            {developerEmail}
          </a>
        </div>

        {/* Resume Download */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8] text-black'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827] border-[#223552]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold flex items-center gap-1.5 opacity-80">
              <Download className="w-4 h-4 text-emerald-400" />
              Curriculum Vitae
            </span>
          </div>
          <button
            onClick={handleDownloadResume}
            className={`w-full py-1 px-2.5 rounded text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              theme === 'classic'
                ? 'win98-box-outset bg-[#000080] text-white hover:bg-blue-800'
                : theme === 'pastel'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#080C16] font-semibold'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume (.txt)
          </button>
        </div>

        {/* GitHub */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8] text-black'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827] border-[#223552]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold flex items-center gap-1.5 opacity-80">
              <GithubIcon className="w-4 h-4 text-purple-400" />
              GitHub Code Repos
            </span>
          </div>
          <a
            href="https://github.com/rathodsudhakar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between text-xs font-mono font-medium hover:underline text-purple-400"
          >
            <span>github.com/rathodsudhakar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* LinkedIn */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            theme === 'classic'
              ? 'win98-box-inset bg-[#D4D0C8] text-black'
              : theme === 'pastel'
              ? 'bg-white border-purple-100 shadow-sm'
              : 'bg-[#101827] border-[#223552]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold flex items-center gap-1.5 opacity-80">
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              LinkedIn Network
            </span>
          </div>
          <a
            href="https://www.linkedin.com/in/rathodsudhakar/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between text-xs font-mono font-medium hover:underline text-blue-400"
          >
            <span>in/rathodsudhakar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Realistic Message Dispatcher (Uses Mailto or Direct Clipboard Copy) */}
      <div
        className={`p-4 rounded-xl border ${
          theme === 'classic'
            ? 'win98-box-inset bg-[#D4D0C8] text-black'
            : theme === 'pastel'
            ? 'bg-white border-purple-100 shadow-sm'
            : 'bg-[#101827] border-[#223552]'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
            Compose Message via Email Client
          </h3>
        </div>

        <form onSubmit={handleLaunchMailClient} className="space-y-3">
          <div>
            <label className="block text-xs font-mono opacity-80 mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Software Engineering Opportunity / CyberScan-Pro discussion"
              className={`w-full px-3 py-1.5 text-xs rounded-md border outline-none font-sans ${
                theme === 'classic'
                  ? 'win98-box-inset bg-white text-black'
                  : theme === 'pastel'
                  ? 'bg-purple-50/50 border-purple-200 text-gray-800 focus:border-purple-500'
                  : 'bg-[#1B2A41]/80 border-[#223552] text-slate-100 placeholder:text-slate-500 focus:border-[#00E5FF]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-mono opacity-80 mb-1">
              Message Body
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note or project inquiry here..."
              className={`w-full px-3 py-1.5 text-xs rounded-md border outline-none font-sans resize-none ${
                theme === 'classic'
                  ? 'win98-box-inset bg-white text-black'
                  : theme === 'pastel'
                  ? 'bg-purple-50/50 border-purple-200 text-gray-800 focus:border-purple-500'
                  : 'bg-[#1B2A41]/80 border-[#223552] text-slate-100 placeholder:text-slate-500 focus:border-[#00E5FF]'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[11px] opacity-60 font-mono">
              Launches your native mail client (Outlook, Mail, Gmail) with prepopulated draft.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyDraft}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#D4D0C8] text-black hover:bg-white'
                    : theme === 'pastel'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                    : 'bg-[#1B2A41] hover:bg-[#223552] text-slate-200 border border-[#223552]'
                }`}
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Draft!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  theme === 'classic'
                    ? 'win98-box-outset bg-[#000080] text-white hover:bg-blue-800'
                    : theme === 'pastel'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                    : 'bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#080C16] shadow-neon-cyan/40'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in Mail</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
