import { Field, Input, TextArea } from '../common/Field.jsx'
import { Button } from '../common/Button.jsx'
import { EntryCard } from '../common/EntryCard.jsx'
import { blankExperience } from '../../data/defaultData.js'

export default function ExperienceForm({ data, onChange }) {
  const updateEntry = (id, field, value) =>
    onChange(data.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))

  const updateEntryFields = (id, patch) =>
    onChange(data.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))

  const addEntry = () => onChange([...data, blankExperience()])
  const removeEntry = (id) => onChange(data.filter((entry) => entry.id !== id))

  return (
    <div className="space-y-4">
      {data.map((entry, i) => (
        <EntryCard
          key={entry.id}
          title={`Position ${i + 1}`}
          onRemove={() => removeEntry(entry.id)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Job title">
              <Input
                value={entry.position}
                onChange={(e) => updateEntry(entry.id, 'position', e.target.value)}
                placeholder="Senior Product Designer"
              />
            </Field>
            <Field label="Company">
              <Input
                value={entry.company}
                onChange={(e) => updateEntry(entry.id, 'company', e.target.value)}
                placeholder="Acme Corp"
              />
            </Field>
            <Field label="Location">
              <Input
                value={entry.location}
                onChange={(e) => updateEntry(entry.id, 'location', e.target.value)}
                placeholder="Remote"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start date">
                <Input
                  value={entry.startDate}
                  onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                  placeholder="Jan 2022"
                />
              </Field>
              <Field label="End date">
                <Input
                  value={entry.endDate}
                  onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  disabled={entry.current}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 sm:col-span-2 text-sm text-ink-600 dark:text-ink-300">
              <input
                type="checkbox"
                checked={entry.current}
                onChange={(e) =>
                  updateEntryFields(entry.id, {
                    current: e.target.checked,
                    endDate: e.target.checked ? 'Present' : '',
                  })
                }
                className="rounded border-ink-300 text-accent focus:ring-accent"
              />
              I currently work here
            </label>
            <Field label="Description" className="sm:col-span-2">
              <TextArea
                value={entry.description}
                onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                placeholder={
                  '• Led redesign of checkout flow, lifting conversion 18%\n• Mentored 2 junior designers\n• Partnered with PM and eng on quarterly roadmap'
                }
              />
            </Field>
          </div>
        </EntryCard>
      ))}
      <Button variant="outline" onClick={addEntry} className="w-full">
        + Add work experience
      </Button>
    </div>
  )
}
