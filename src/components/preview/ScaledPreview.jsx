import { useEffect, useRef, useState } from 'react'

const SHEET_WIDTH_MM = 210
const MM_TO_PX = 3.7795275591 // at 96dpi, matches how browsers render `mm` units

export default function ScaledPreview({ children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const sheetWidthPx = SHEET_WIDTH_MM * MM_TO_PX

    const observer = new ResizeObserver((entries) => {
      const availableWidth = entries[0].contentRect.width
      const next = Math.min(1, availableWidth / sheetWidthPx)
      setScale(next > 0 ? next : 1)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const sheetWidthPx = SHEET_WIDTH_MM * MM_TO_PX

  return (
    <div ref={containerRef} className="w-full print:contents">
      <div
        style={{
          height: scale < 1 ? `${sheetWidthPx * (297 / 210) * scale}px` : undefined,
        }}
        className="print:!h-auto"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: `${sheetWidthPx}px`,
            margin: '0 auto',
          }}
          className="print:!transform-none print:!w-auto"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
