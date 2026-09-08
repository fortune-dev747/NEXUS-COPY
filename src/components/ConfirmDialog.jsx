import { useEffect, useRef } from 'react'
import { Button } from './common/Button.jsx'

/**
 * A styled confirmation modal, replacing native window.confirm().
 * Renders nothing when `open` is false.
 */
export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger', // 'danger' | 'primary'
    onConfirm,
    onCancel,
}) {
    const confirmRef = useRef(null)

    useEffect(() => {
        if (!open) return
        confirmRef.current?.focus()

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onCancel()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, onCancel])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
        >
            <div
                className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
                onClick={onCancel}
                aria-hidden="true"
            />

            <div className="relative w-full max-w-sm rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-sheet p-6 animate-[dialogIn_0.18s_ease-out]">
                <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${variant === 'danger'
                            ? 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                            : 'bg-accent/10 text-accent-dark dark:text-accent-light'
                        }`}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M10 6.5v4M10 13.3h.01M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <h2
                    id="confirm-dialog-title"
                    className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50 mb-1.5"
                >
                    {title}
                </h2>
                <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed mb-6">
                    {description}
                </p>

                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button
                        ref={confirmRef}
                        variant={variant === 'danger' ? 'dangerSolid' : 'primary'}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}