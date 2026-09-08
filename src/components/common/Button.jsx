import { forwardRef } from 'react'

export const Button = forwardRef(function Button(
  { variant = 'primary', className = '', children, ...props },
  ref
) {
  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-dark active:bg-accent-dark disabled:opacity-50',
    ghost:
      'bg-transparent text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800',
    outline:
      'border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800',
    danger: 'bg-transparent text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40',
dangerSolid: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
  }
  return (
    <button
      ref={ref}
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
})

export function IconButton({ label, className = '', children, ...props }) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-md w-8 h-8 text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-800 dark:hover:text-ink-100 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}