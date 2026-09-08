import { Field, Input } from '../common/Field.jsx'
import { Button } from '../common/Button.jsx'
import { EntryCard } from '../common/EntryCard.jsx'
import { blankCertification } from '../../data/defaultData.js'

export default function CertificationsForm({ data, onChange }) {
  const updateEntry = (id, field, value) =>
    onChange(data.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))

  const addEntry = () => onChange([...data, blankCertification()])
  const removeEntry = (id) => onChange(data.filter((entry) => entry.id !== id))

  return (
    <div className="space-y-4">
      {data.map((entry, i) => (
        <EntryCard
          key={entry.id}
          title={`Certification ${i + 1}`}
          onRemove={() => removeEntry(entry.id)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" className="sm:col-span-2">
              <Input
                value={entry.name}
                onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </Field>
            <Field label="Issuer">
              <Input
                value={entry.issuer}
                onChange={(e) => updateEntry(entry.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </Field>
            <Field label="Date">
              <Input
                value={entry.date}
                onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                placeholder="Mar 2024"
              />
            </Field>
            <Field label="Credential URL (optional)" className="sm:col-span-2">
              <Input
                value={entry.url}
                onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                placeholder="credly.com/badges/…"
              />
            </Field>
          </div>
        </EntryCard>
      ))}
      <Button variant="outline" onClick={addEntry} className="w-full">
        + Add certification
      </Button>
    </div>
  )
}
