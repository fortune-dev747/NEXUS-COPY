import { useState } from 'react'
import { Field, Input } from '../common/Field.jsx'
import { blankSkill } from '../../data/defaultData.js'
import skillsIllustration from '../../assets/illustrations/skills.svg'

export default function SkillsForm({ data, onChange }) {
  const [draft, setDraft] = useState('')

  const addSkill = () => {
    const name = draft.trim()
    if (!name) return
    if (data.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setDraft('')
      return
    }
    onChange([...data, { ...blankSkill(), name }])
    setDraft('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill()
    } else if (e.key === 'Backspace' && draft === '' && data.length) {
      onChange(data.slice(0, -1))
    }
  }

  const removeSkill = (id) => onChange(data.filter((s) => s.id !== id))

  return (
    <>
      <img
        src={skillsIllustration}
        alt=""
        aria-hidden="true"
        className="w-40 sm:w-44 h-auto mx-auto mb-4"
      />
      <Field label="Skills" hint="Press Enter or comma to add a skill.">
        <div className="flex flex-wrap gap-2 rounded-md border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-2">
          {data.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent-dark dark:text-accent-light px-2.5 py-1 text-sm"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                aria-label={`Remove ${skill.name}`}
                className="text-accent/70 hover:text-accent-dark leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addSkill}
            placeholder={data.length ? 'Add another…' : 'e.g. Figma, SQL, Project Management'}
            className="flex-1 min-w-[140px] border-none focus:ring-0 px-1 py-1"
          />
        </div>
      </Field>
    </>
  )
}