export const SECTION_META = {
  summary: { label: 'Summary' },
  experience: { label: 'Work Experience' },
  education: { label: 'Education' },
  skills: { label: 'Skills' },
  certifications: { label: 'Certifications' },
}

export const DEFAULT_SECTION_ORDER = [
  'summary',
  'experience',
  'education',
  'skills',
  'certifications',
]

export const emptyResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  sectionOrder: DEFAULT_SECTION_ORDER,
}

export function makeId() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const blankExperience = () => ({
  id: makeId(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

export const blankEducation = () => ({
  id: makeId(),
  school: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
})

export const blankSkill = () => ({
  id: makeId(),
  name: '',
})

export const blankCertification = () => ({
  id: makeId(),
  name: '',
  issuer: '',
  date: '',
  url: '',
})
