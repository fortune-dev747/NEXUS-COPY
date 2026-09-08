import { Field, Input } from '../common/Field.jsx'

export default function PersonalInfoForm({ data, onChange }) {
  const update = (field) => (e) => onChange({ ...data, [field]: e.target.value })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Full name" className="sm:col-span-2">
        <Input
          value={data.fullName}
          onChange={update('fullName')}
          placeholder="Fortune Emmanuel"
          autoComplete="name"
        />
      </Field>
      <Field label="Job title" className="sm:col-span-2">
        <Input
          value={data.jobTitle}
          onChange={update('jobTitle')}
          placeholder="Frontend Engineer"
        />
      </Field>
      <Field label="Email">
        <Input
          type="email"
          value={data.email}
          onChange={update('email')}
          placeholder="fortune@example.com"
          autoComplete="email"
        />
      </Field>
      <Field label="Phone">
        <Input
          type="tel"
          value={data.phone}
          onChange={update('phone')}
          placeholder="+234 9017186911"
          autoComplete="tel"
        />
      </Field>
      <Field label="Location">
        <Input
          value={data.location}
          onChange={update('location')}
          placeholder="Lagos, Nigeria"
        />
      </Field>
      <Field label="LinkedIn">
        <Input
          value={data.linkedin}
          onChange={update('linkedin')}
          placeholder="linkedin.com/in/fortune-emmanuel"
        />
      </Field>
      <Field label="Website / Portfolio" className="sm:col-span-2">
        <Input
          value={data.website}
          onChange={update('website')}
          placeholder="fortune.dev"
        />
      </Field>
    </div>
  )
}
