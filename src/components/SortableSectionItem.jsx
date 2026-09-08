import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableSectionItem({ id, Icon, label, children }) {
  const [open, setOpen] = useState(true)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <section
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-sm"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${label}`}
          className="cursor-grab active:cursor-grabbing text-ink-300 dark:text-ink-600 hover:text-ink-500 dark:hover:text-ink-400 touch-none px-1 -ml-1"
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
            <circle cx="4" cy="4" r="1.4" />
            <circle cx="10" cy="4" r="1.4" />
            <circle cx="4" cy="10" r="1.4" />
            <circle cx="10" cy="10" r="1.4" />
            <circle cx="4" cy="16" r="1.4" />
            <circle cx="10" cy="16" r="1.4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-2 text-left"
        >
        {Icon && <Icon className="w-4 h-4 text-ink-500 dark:text-ink-400" />}
          <h2 className="font-display text-base font-semibold text-ink-800 dark:text-ink-100">
            {label}
          </h2>
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse section' : 'Expand section'}
          className="text-ink-400 dark:text-ink-500 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {open && <div className="px-4 pb-4 pt-1 border-t border-ink-100 dark:border-ink-800">{children}</div>}
    </section>
  )
}
