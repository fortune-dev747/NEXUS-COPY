import { IconButton } from './Button.jsx'

export function EntryCard({ title, onRemove, children }) {
  return (
    <div className="relative rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/40 p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400 dark:text-ink-500">
          {title}
        </span>
        <IconButton label="Remove entry" onClick={onRemove}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.5 9.5a1 1 0 001 1h4a1 1 0 001-1L11.5 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </IconButton>
      </div>
      {children}
    </div>
  )
}
