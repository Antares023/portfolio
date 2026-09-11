"use client";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import only the languages you need
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

// Register them
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
};

export default function CodeBlock({ code, language = 'javascript', filename }: CodeBlockProps) {
  return (
    <div className="rounded-md border border-gh-border overflow-hidden">
      {/* File header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gh-surface border-b border-gh-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="ml-2 text-gh-text-muted text-xs font-mono">
          {filename || `main.${language}`}
        </span>
      </div>
      {/* Code body */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        lineNumberStyle={{ 
          color: '#484f58', 
          fontSize: '0.75rem', 
          paddingRight: '1rem',
          minWidth: '2.5rem',
          userSelect: 'none',
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#0d1117',
          fontSize: '0.8rem',
          lineHeight: '1.6',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

