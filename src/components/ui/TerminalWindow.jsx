export default function TerminalWindow({ title = 'bash', children }) {
  return (
    <div className="rounded-md border border-gh-border overflow-hidden bg-gh-surface">
      {/* macOS-style titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gh-surface border-b border-gh-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="ml-2 text-gh-text-muted text-xs font-mono">{title}</span>
      </div>
      {/* Terminal content */}
      <div className="p-5 font-mono text-sm leading-relaxed bg-gh-canvas overflow-x-auto thin-scrollbar whitespace-pre-wrap break-words">
        {children}
      </div>
    </div>
  );
}
