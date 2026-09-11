"use client";
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  PHP: '#4F5D95',
  Blade: '#f7523f',
  HTML: '#e34c26',
  CSS: '#563d7c',
  TypeScript: '#3178c6',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  default: '#7d8590',
};

type LanguageDotProps = {
  language?: string;
  showLabel?: boolean;
};

export default function LanguageDot({ language = 'default', showLabel = true }: LanguageDotProps) {
  const color = (LANGUAGE_COLORS as Record<string, string>)[language] || LANGUAGE_COLORS.default;
  
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-3 h-3 rounded-full inline-block shrink-0"
        style={{ backgroundColor: color }}
      />
      {showLabel && (
        <span className="text-xs text-gh-text-muted">{language}</span>
      )}
    </span>
  );
}

