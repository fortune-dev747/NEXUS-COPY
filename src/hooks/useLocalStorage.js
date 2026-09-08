import { useEffect, useRef, useState } from 'react'

/**
 * Persists state to localStorage under `key`.
 * Falls back silently (in-memory only) if localStorage is unavailable
 * (e.g. private browsing with storage disabled).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  const isFirstRun = useRef(true)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable or quota exceeded — data stays in-memory for this session
    }
    isFirstRun.current = false
  }, [key, value])

  return [value, setValue]
}
