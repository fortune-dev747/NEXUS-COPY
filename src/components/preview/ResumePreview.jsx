import { SECTION_META } from '../../data/defaultData.js'

function ContactLine({ personalInfo }) {
  const items = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean)

  if (!items.length) return null

  return (
    <p className="text-[11.5px] text-neutral-600 mt-1">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && <span className="mx-1.5 text-neutral-300">|</span>}
        </span>
      ))}
    </p>
  )
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-[12px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-300 pb-0.5 mb-2">
      {children}
    </h2>
  )
}

function SummarySection({ text }) {
  if (!text?.trim()) return null
  return (
    <div className="mb-4">
      <SectionHeading>Summary</SectionHeading>
      <p className="text-[12px] leading-relaxed text-neutral-700 whitespace-pre-line">{text}</p>
    </div>
  )
}

function ExperienceSection({ items }) {
  if (!items?.length) return null
  return (
    <div className="mb-4">
      <SectionHeading>Work Experience</SectionHeading>
      <div className="space-y-3">
        {items.map((entry) => (
          <div key={entry.id}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12.5px] font-semibold text-neutral-900">
                {entry.position || 'Job Title'}
                {entry.company && <span className="font-normal text-neutral-700"> — {entry.company}</span>}
              </p>
              <p className="text-[11px] text-neutral-500 whitespace-nowrap">
                {[entry.startDate, entry.endDate].filter(Boolean).join(' – ')}
              </p>
            </div>
            {entry.location && <p className="text-[11px] text-neutral-500">{entry.location}</p>}
            {entry.description && (
              <p className="text-[12px] leading-relaxed text-neutral-700 whitespace-pre-line mt-0.5">
                {entry.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationSection({ items }) {
  if (!items?.length) return null
  return (
    <div className="mb-4">
      <SectionHeading>Education</SectionHeading>
      <div className="space-y-2">
        {items.map((entry) => (
          <div key={entry.id}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12.5px] font-semibold text-neutral-900">
                {[entry.degree, entry.field].filter(Boolean).join(', ') || 'Degree'}
                {entry.school && <span className="font-normal text-neutral-700"> — {entry.school}</span>}
              </p>
              <p className="text-[11px] text-neutral-500 whitespace-nowrap">
                {[entry.startDate, entry.endDate].filter(Boolean).join(' – ')}
              </p>
            </div>
            {(entry.location || entry.gpa) && (
              <p className="text-[11px] text-neutral-500">
                {[entry.location, entry.gpa && `GPA: ${entry.gpa}`].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsSection({ items }) {
  if (!items?.length) return null
  return (
    <div className="mb-4">
      <SectionHeading>Skills</SectionHeading>
      <p className="text-[12px] leading-relaxed text-neutral-700">
        {items.map((s) => s.name).join('  •  ')}
      </p>
    </div>
  )
}

function CertificationsSection({ items }) {
  if (!items?.length) return null
  return (
    <div className="mb-4">
      <SectionHeading>Certifications</SectionHeading>
      <div className="space-y-1.5">
        {items.map((entry) => (
          <div key={entry.id} className="flex items-baseline justify-between gap-2">
            <p className="text-[12px] text-neutral-800">
              <span className="font-semibold">{entry.name || 'Certification'}</span>
              {entry.issuer && <span className="text-neutral-600"> — {entry.issuer}</span>}
            </p>
            {entry.date && <p className="text-[11px] text-neutral-500 whitespace-nowrap">{entry.date}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

const SECTION_RENDERERS = {
  summary: (data) => <SummarySection text={data.summary} />,
  experience: (data) => <ExperienceSection items={data.experience} />,
  education: (data) => <EducationSection items={data.education} />,
  skills: (data) => <SkillsSection items={data.skills} />,
  certifications: (data) => <CertificationsSection items={data.certifications} />,
}

export default function ResumePreview({ data }) {
  const { personalInfo } = data

  return (
    <div
      id="resume-print-area"
      className="mx-auto bg-white rounded-sm text-neutral-900 shadow-sheet"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '14mm 16mm',
        fontFamily: '"Inter", Arial, Helvetica, sans-serif',
      }}
    >
      <header className="mb-5">
        <h1
          className="text-[22px] font-bold text-neutral-900 leading-tight"
          style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
        >
          {personalInfo.fullName || 'Get Started with your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[13px] text-neutral-600 mt-0.5">{personalInfo.jobTitle}</p>
        )}
        <ContactLine personalInfo={personalInfo} />
      </header>

      {data.sectionOrder.map((key) => (
        <div key={key}>{SECTION_RENDERERS[key](data)}</div>
      ))}

      {data.sectionOrder.every((key) => isSectionEmpty(key, data)) && (
        <p className="text-[12px] text-neutral-400 italic">
          Fill in the form on the left — your resume will come alive here.
        </p>
      )}
    </div>
  )
}

function isSectionEmpty(key, data) {
  const value = data[key]
  if (key === 'summary') return !value?.trim()
  return !value?.length
}

export { SECTION_META }
