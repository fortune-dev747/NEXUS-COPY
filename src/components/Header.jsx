import ThemeToggle from './ThemeToggle.jsx'
import { Button } from './common/Button.jsx'

export default function Header({ onExport, onReset, onHome }) {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-200 dark:border-ink-800 bg-paper/90 dark:bg-ink-950/90 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="rounded-lg px-2 py-1 dark:bg-white/95">
            <img src="/images/nexus-copy-logo.png" alt="Nexus Copy" className="h-10 sm:h-12 w-auto" />
          </div>
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Button variant="ghost" onClick={onReset} className="hidden sm:inline-flex">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Start over
          </Button>
          <ThemeToggle />
          <Button variant="purple" onClick={onExport}>
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  )
}