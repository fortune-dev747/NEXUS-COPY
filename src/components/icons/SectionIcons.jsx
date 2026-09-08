function IconBase({ className = 'w-5 h-5', children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function PersonalInfoIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 19c1.2-3.3 4-5 6.5-5s5.3 1.7 6.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </IconBase>
  )
}

export function SummaryIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </IconBase>
  )
}

export function ExperienceIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="8" width="17" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.5 8V6.2c0-.9.7-1.6 1.6-1.6h3.8c.9 0 1.6.7 1.6 1.6V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 13h17" stroke="currentColor" strokeWidth="1.6" />
    </IconBase>
  )
}

export function EducationIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 4.5 21 9l-9 4.5L3 9l9-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7 11.3v4.2c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 9v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </IconBase>
  )
}

export function SkillsIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M14.7 6.3a3.6 3.6 0 0 0-4.9 4.2L4.6 15.7a1.7 1.7 0 0 0 2.4 2.4l5.2-5.2a3.6 3.6 0 0 0 4.2-4.9l-2.3 2.3-1.7-.5-.5-1.7 2.3-2.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function CertificationsIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 13.2 7.2 20l4.8-2.6 4.8 2.6-1.8-6.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export const SECTION_ICONS = {
  summary: SummaryIcon,
  experience: ExperienceIcon,
  education: EducationIcon,
  skills: SkillsIcon,
  certifications: CertificationsIcon,
}