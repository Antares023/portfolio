import { useMemo } from 'react';

// Generate a deterministic "contribution" pattern from a seed string
function generatePattern(seed, weeks = 20, days = 7) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }

  const grid = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      hash = ((hash * 1103515245) + 12345) & 0x7fffffff;
      const val = hash % 5; // 0-4 intensity levels
      week.push(val);
    }
    grid.push(week);
  }
  return grid;
}

const LEVEL_COLORS = [
  '#161b22', // 0 - empty
  '#0e4429', // 1 - low
  '#006d32', // 2 - medium-low
  '#26a641', // 3 - medium
  '#39d353', // 4 - high
];

export default function ContributionGraph({ seed = 'Antares023' }) {
  const grid = useMemo(() => generatePattern(seed), [seed]);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px]">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <div
                key={`${wi}-${di}`}
                className="w-[11px] h-[11px] rounded-[2px] transition-colors duration-200"
                style={{ backgroundColor: LEVEL_COLORS[level] }}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
