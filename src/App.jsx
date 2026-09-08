import { useState } from 'react'
import LandingPage from './components/landing/LandingPage.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import { emptyResumeData, DEFAULT_SECTION_ORDER } from './data/defaultData.js'
import Header from './components/Header.jsx'
import SectionList from './components/SectionList.jsx'
import ResumePreview from './components/preview/ResumePreview.jsx'
import ScaledPreview from './components/preview/ScaledPreview.jsx'
import PersonalInfoForm from './components/forms/PersonalInfoForm.jsx'
import SummaryForm from './components/forms/SummaryForm.jsx'
import ExperienceForm from './components/forms/ExperienceForm.jsx'
import EducationForm from './components/forms/EducationForm.jsx'
import SkillsForm from './components/forms/SkillsForm.jsx'
import CertificationsForm from './components/forms/CertificationsForm.jsx'
import { PersonalInfoIcon } from './components/icons/SectionIcons.jsx'
import personalInfoIllustration from './assets/illustrations/personal-info.svg'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import { Button } from './components/common/Button.jsx'

function AppShell({ onHome }) {
  const [resume, setResume] = useLocalStorage('cv-builder-resume-data', emptyResumeData)

  // Guard against older saved data missing a field (e.g. after an app update)
  const data = {
    ...emptyResumeData,
    ...resume,
    sectionOrder: resume.sectionOrder?.length ? resume.sectionOrder : DEFAULT_SECTION_ORDER,
  }

  const updateField = (field) => (value) => setResume({ ...data, [field]: value })

  const handleReorder = (newOrder) => setResume({ ...data, sectionOrder: newOrder })

  const handleExport = async () => {
    const { generateResumePdf } = await import('./utils/generateResumePdf.js')
    generateResumePdf(data)
  }

  const [resetDialogOpen, setResetDialogOpen] = useState(false)

  const handleReset = () => setResetDialogOpen(true)

  const confirmReset = () => {
    setResume(emptyResumeData)
    setResetDialogOpen(false)
  }

  const renderSection = (key) => {
    switch (key) {
      case 'summary':
        return <SummaryForm data={data.summary} onChange={updateField('summary')} />
      case 'experience':
        return <ExperienceForm data={data.experience} onChange={updateField('experience')} />
      case 'education':
        return <EducationForm data={data.education} onChange={updateField('education')} />
      case 'skills':
        return <SkillsForm data={data.skills} onChange={updateField('skills')} />
      case 'certifications':
        return (
          <CertificationsForm data={data.certifications} onChange={updateField('certifications')} />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <Header onExport={handleExport} onReset={handleReset} onHome={onHome} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor column */}
        <div className="editor-scroll lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto lg:pr-2 space-y-4 print:hidden">
          <section className="rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-sm px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <PersonalInfoIcon className="w-4 h-4 text-ink-500 dark:text-ink-400" />
              <h2 className="font-display text-base font-semibold text-ink-800 dark:text-ink-100">
                Personal Information
              </h2>
            </div>
            <img
              src={personalInfoIllustration}
              alt=""
              aria-hidden="true"
              className="w-40 sm:w-44 h-auto mx-auto mb-4"
            />
            <PersonalInfoForm
              data={data.personalInfo}
              onChange={updateField('personalInfo')}
            />
          </section>

          <SectionList order={data.sectionOrder} onReorder={handleReorder} renderSection={renderSection} />

          <p className="pt-1 pb-6 text-xs text-center text-ink-400 dark:text-ink-500">
            Saved automatically to this browser · Drag the ⠿ handle to reorder sections
          </p>

          <div className="text-xs text-center text-purple-800 dark:text-ink-500">
            © 2026 Fortune U. Emmanuel. All rights reserved
          </div>
        </div>

        {/* Preview column */}
        <div className="print:contents">
         <div className="lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-88px)] overflow-y-auto overflow-x-hidden sm:overflow-auto pb-6 print:p-0 print:overflow-visible print:max-h-none rounded-lg">
            <ScaledPreview>
              <ResumePreview data={data} />
            </ScaledPreview>
          </div>

          {/* Mobile-only: header has no room for this button below the sm breakpoint,
      so it lives here instead, right under the preview. */}
          <div className="sm:hidden flex justify-center pb-2 print:hidden">
            <Button variant="purple" onClick={handleReset}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Start over
            </Button>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={resetDialogOpen}
        title="Clear all resume data?"
        description="This removes everything you've entered — personal info, experience, education, skills, and certifications. This can't be undone."
        confirmLabel="Clear everything"
        cancelLabel="Keep my data"
        variant="danger"
        onConfirm={confirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'builder'

  return (
    <ThemeProvider>
      {view === 'landing' ? (
        <LandingPage onGetStarted={() => setView('builder')} />
      ) : (
        <AppShell onHome={() => setView('landing')} />
      )}
    </ThemeProvider>
  )
}
