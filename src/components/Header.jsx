import ThemeToggle from './ThemeToggle.jsx'
import { Button } from './common/Button.jsx'

export default function Header({ onExport, onReset, onHome }) {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-200 dark:border-ink-800 bg-paper/90 dark:bg-ink-950/90 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
<button
  type="button"
  onClick={onHome}
  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
>
  <div className="rounded-lg px-2 py-1 dark:bg-white/95">
    <img src="/images/nexus-copy-logo.png" alt="Nexus Copy" className="h-12 w-auto" />
  </div>
</button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onReset} className="hidden sm:inline-flex">
            Start over
          </Button>
          <ThemeToggle />
          <Button variant="primary" onClick={onExport}>
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  )
}


