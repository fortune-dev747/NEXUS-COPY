const ACCENTS = {
  orange: { bar: 'bg-orange-400', chip: 'bg-orange-100', chipText: 'text-orange-600', line: 'bg-orange-200' },
  pink: { bar: 'bg-pink-400', chip: 'bg-pink-100', chipText: 'text-pink-600', line: 'bg-pink-200' },
  violet: { bar: 'bg-violet-400', chip: 'bg-violet-100', chipText: 'text-violet-600', line: 'bg-violet-200' },
  teal: { bar: 'bg-teal-400', chip: 'bg-teal-100', chipText: 'text-teal-600', line: 'bg-teal-200' },
  amber: { bar: 'bg-amber-400', chip: 'bg-amber-100', chipText: 'text-amber-600', line: 'bg-amber-200' },
}

export default function FloatingResumeCard({
  top,
  left,
  width,
  rotate,
  depth,
  floatDuration,
  floatDelay,
  opacity = 1,
  lines = 4,
  accent = 'orange',
}) {
  const colors = ACCENTS[accent] || ACCENTS.orange

  return (
    <div
      className="floating-card absolute"
      data-depth={depth}
      data-rotate={rotate}
      style={{
        top,
        left,
        width,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    >
      <div
        className="card-float"
        style={{
          animationDuration: `${floatDuration}s`,
          animationDelay: `${floatDelay}s`,
        }}
      >
        <div
          className="rounded-xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden"
          style={{ aspectRatio: '210 / 297' }}
        >
          <div className={`h-[5%] ${colors.bar}`} />
          <div className="h-[13%] border-b border-neutral-100 flex flex-col justify-center px-[10%] gap-[8%]">
            <div className="h-[12%] w-[55%] rounded-full bg-neutral-800/80" />
            <div className={`h-[8%] w-[35%] rounded-full ${colors.line}`} />
          </div>
          <div className="px-[10%] py-[8%] flex flex-col gap-[10%]">
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className="h-[6%] rounded-full bg-neutral-200"
                style={{ width: i % 3 === 0 ? '90%' : i % 3 === 1 ? '75%' : '60%' }}
              />
            ))}
            <div className="flex gap-[6%] mt-[4%]">
              <div className={`h-[9%] w-[28%] rounded-full ${colors.chip}`} />
              <div className={`h-[9%] w-[22%] rounded-full ${colors.chip}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}