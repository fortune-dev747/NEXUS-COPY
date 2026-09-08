import { Field, Input } from '../common/Field.jsx'
import { Button } from '../common/Button.jsx'
import { EntryCard } from '../common/EntryCard.jsx'
import { blankEducation } from '../../data/defaultData.js'
import educationIllustration from '../../assets/illustrations/education.svg'

export default function EducationForm({ data, onChange }) {
  const updateEntry = (id, field, value) =>
    onChange(data.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))

  const addEntry = () => onChange([...data, blankEducation()])
  const removeEntry = (id) => onChange(data.filter((entry) => entry.id !== id))

  return (
    <div className="space-y-4">
      <img
        src={educationIllustration}
        alt=""
        aria-hidden="true"
        className="w-40 sm:w-44 h-auto mx-auto"
      />
      {data.map((entry, i) => (
        <EntryCard
          key={entry.id}
          title={`Education ${i + 1}`}
          onRemove={() => removeEntry(entry.id)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="School">
              <Input
                value={entry.school}
                onChange={(e) => updateEntry(entry.id, 'school', e.target.value)}
                placeholder="University of Abraka"
              />
            </Field>
            <Field label="Location">
              <Input
                value={entry.location}
                onChange={(e) => updateEntry(entry.id, 'location', e.target.value)}
                placeholder="Delta State, Nigeria"
              />
            </Field>
            <Field label="Degree">
              <Input
                value={entry.degree}
                onChange={(e) => updateEntry(entry.id, 'degree', e.target.value)}
                placeholder="B.Sc."
              />
            </Field>
            <Field label="Field of study">
              <Input
                value={entry.field}
                onChange={(e) => updateEntry(entry.id, 'field', e.target.value)}
                placeholder="Integrated Science"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start date">
                <Input
                  value={entry.startDate}
                  onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                  placeholder="Sep 2016"
                />
              </Field>
              <Field label="End date">
                <Input
                  value={entry.endDate}
                  onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value)}
                  placeholder="Jul 2020"
                />
              </Field>
            </div>
            <Field label="GPA (optional)">
              <Input
                value={entry.gpa}
                onChange={(e) => updateEntry(entry.id, 'gpa', e.target.value)}
                placeholder="3.8 / 4.0"
              />
            </Field>
          </div>
        </EntryCard>
      ))}
      <Button variant="outline" onClick={addEntry} className="w-full">
        + Add education
      </Button>
    </div>
  )
}