import { useEffect, useRef, useState } from 'react'

const SHEET_WIDTH_MM = 210
const SHEET_HEIGHT_MM = 297
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
  const renderedWidth = sheetWidthPx * scale
  const renderedHeight = sheetWidthPx * (SHEET_HEIGHT_MM / SHEET_WIDTH_MM) * scale

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden print:contents print:overflow-visible"
      style={{ height: `${renderedHeight}px` }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: `${sheetWidthPx}px`,
          marginLeft: `${-renderedWidth / 2}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="print:!static print:!left-auto print:!m-0 print:!transform-none print:!w-auto"
      >
        {children}
      </div>
    </div>
  )
}