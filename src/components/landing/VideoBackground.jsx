import { useEffect, useRef, useState } from 'react'

/**
 * Full-bleed looping background video for the hero section.
 *
 * Drop your file(s) in `public/videos/`:
 *   - public/videos/hero-bg.mp4   (required — universal fallback)
 *   - public/videos/hero-bg.webm  (optional — smaller/better quality, used first if present)
 *   - public/videos/hero-poster.jpg (optional — shown instantly before the video can play)
 *
 * Autoplay only works muted + inline, so this always renders muted and
 * playsInline. Respects prefers-reduced-motion by freezing on the poster
 * frame instead of looping.
 */
export default function VideoBackground({
  mp4Src = '/videos/hero-bg.mp4',
  webmSrc = '/videos/hero-bg.webm',
  poster = '/videos/hero-poster.jpg',
}) {
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    // Some browsers need an explicit play() call even with the autoplay attr.
    video.play().catch(() => {
      // Autoplay was blocked (rare with muted video) — the poster frame
      // stays visible, which is a fine fallback.
    })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05060a]">
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        onCanPlay={() => setLoaded(true)}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* Dark scrim so white hero text/CTA stay readable over any footage */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05060a] via-[#05060a]/80 to-[#05060a]/40" />
      <div className="absolute inset-0 bg-[#05060a]/30" />
    </div>
  )
}