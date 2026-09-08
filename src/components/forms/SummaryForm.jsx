import { Field, TextArea } from '../common/Field.jsx'
import summaryIllustration from '../../assets/illustrations/summary.svg'

export default function SummaryForm({ data, onChange }) {
  return (
    <>
      <img
        src={summaryIllustration}
        alt=""
        aria-hidden="true"
        className="w-40 sm:w-44 h-auto mx-auto mb-4"
      />
      <Field
        label="Professional summary"
        hint="2–4 sentences. Lead with your title, years of experience, and your strongest impact."
      >
        <TextArea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Product designer with 6+ years shipping B2B SaaS interfaces. Led design for a checkout redesign that lifted conversion 18%. Comfortable owning a problem from research through pixel-perfect handoff."
          className="min-h-[120px]"
        />
      </Field>
    </>
  )
}