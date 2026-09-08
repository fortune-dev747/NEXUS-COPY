export function Field({ label, children, hint, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-1.5">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block mt-1 text-xs text-ink-400 dark:text-ink-500">{hint}</span>
      )}
    </label>
  )
}

const baseInputStyles =
  'w-full rounded-md border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-3 py-2 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-500 focus:border-accent focus:ring-1 focus:ring-accent transition-colors'

export function Input(props) {
  return <input {...props} className={`${baseInputStyles} ${props.className || ''}`} />
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={`${baseInputStyles} min-h-[96px] resize-y leading-relaxed ${props.className || ''}`}
    />
  )
}
