import { jsPDF } from 'jspdf'

const PAGE = { width: 210, height: 297 }
const MARGIN = { x: 16, top: 16, bottom: 16 }
const CONTENT_WIDTH = PAGE.width - MARGIN.x * 2

// jsPDF positions/sizes are in the document unit (mm here), but font size is
// always in points — this converts a point value to the equivalent mm line height.
function lineHeightMm(fontSizePt, leading = 1.35) {
  return fontSizePt * 0.3528 * leading
}

function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE.height - MARGIN.bottom) {
    doc.addPage()
    return MARGIN.top
  }
  return y
}

// Splits on manual newlines first (so bullet lists the user typed stay
// separate lines) then word-wraps each paragraph to the column width.
function drawWrapped(doc, text, x, y, maxWidth, fontSize, color = '#374151') {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(fontSize)
  doc.setTextColor(color)
  const lh = lineHeightMm(fontSize)

  text.split('\n').forEach((paragraph) => {
    if (!paragraph.trim()) {
      y += lh * 0.5
      return
    }
    doc.splitTextToSize(paragraph, maxWidth).forEach((line) => {
      y = ensureSpace(doc, y, lh)
      doc.text(line, x, y)
      y += lh
    })
  })

  return y
}

function drawHeading(doc, title, x, y) {
  y = ensureSpace(doc, y, 10)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor('#1f2430')
  doc.text(title.toUpperCase(), x, y)
  y += 1.5
  doc.setDrawColor('#c7c9d1')
  doc.setLineWidth(0.3)
  doc.line(x, y, x + CONTENT_WIDTH, y)
  return y + 5
}

function drawEntryHeader(doc, title, dateRange, x, y) {
  y = ensureSpace(doc, y, 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor('#101114')
  doc.text(title, x, y)

  if (dateRange) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor('#6b7280')
    doc.text(dateRange, x + CONTENT_WIDTH, y, { align: 'right' })
  }
  return y + 5
}

function drawMetaLine(doc, text, x, y) {
  if (!text) return y
  y = ensureSpace(doc, y, 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor('#6b7280')
  doc.text(text, x, y)
  return y + 5
}

function renderSummary(doc, text, x, y) {
  if (!text?.trim()) return y
  y = drawHeading(doc, 'Summary', x, y)
  y = drawWrapped(doc, text, x, y, CONTENT_WIDTH, 10.5)
  return y + 4
}

function renderExperience(doc, items, x, y) {
  if (!items?.length) return y
  y = drawHeading(doc, 'Work Experience', x, y)

  items.forEach((entry, i) => {
    const title = [entry.position, entry.company].filter(Boolean).join(' — ') || 'Job Title'
    const dateRange = [entry.startDate, entry.endDate].filter(Boolean).join(' – ')
    y = drawEntryHeader(doc, title, dateRange, x, y)
    y = drawMetaLine(doc, entry.location, x, y)
    if (entry.description) y = drawWrapped(doc, entry.description, x, y, CONTENT_WIDTH, 10)
    if (i < items.length - 1) y += 3
  })

  return y + 4
}

function renderEducation(doc, items, x, y) {
  if (!items?.length) return y
  y = drawHeading(doc, 'Education', x, y)

  items.forEach((entry, i) => {
    const title =
      [entry.degree, entry.field].filter(Boolean).join(', ') +
      (entry.school ? ` — ${entry.school}` : '')
    const dateRange = [entry.startDate, entry.endDate].filter(Boolean).join(' – ')
    y = drawEntryHeader(doc, title || 'Degree', dateRange, x, y)

    const meta = [entry.location, entry.gpa && `GPA: ${entry.gpa}`].filter(Boolean).join('  ·  ')
    y = drawMetaLine(doc, meta, x, y)

    if (i < items.length - 1) y += 3
  })

  return y + 4
}

function renderSkills(doc, items, x, y) {
  if (!items?.length) return y
  y = drawHeading(doc, 'Skills', x, y)
  const text = items.map((s) => s.name).filter(Boolean).join('   •   ')
  y = drawWrapped(doc, text, x, y, CONTENT_WIDTH, 10.5)
  return y + 4
}

function renderCertifications(doc, items, x, y) {
  if (!items?.length) return y
  y = drawHeading(doc, 'Certifications', x, y)

  items.forEach((entry, i) => {
    const title = entry.issuer ? `${entry.name} — ${entry.issuer}` : entry.name || 'Certification'
    y = drawEntryHeader(doc, title, entry.date || '', x, y)
    if (i < items.length - 1) y += 2
  })

  return y + 4
}

const SECTION_RENDERERS = {
  summary: (doc, data, x, y) => renderSummary(doc, data.summary, x, y),
  experience: (doc, data, x, y) => renderExperience(doc, data.experience, x, y),
  education: (doc, data, x, y) => renderEducation(doc, data.education, x, y),
  skills: (doc, data, x, y) => renderSkills(doc, data.skills, x, y),
  certifications: (doc, data, x, y) => renderCertifications(doc, data.certifications, x, y),
}

function buildFilename(fullName) {
  const safe = (fullName || 'resume')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${safe || 'resume'}.pdf`
}

/**
 * Builds a PDF by drawing real, selectable text directly onto the page
 * (rather than rasterizing the HTML preview), so the exported file stays
 * fully parseable by an ATS, and triggers an immediate download with no
 * browser print dialog.
 */
export function generateResumePdf(data) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const x = MARGIN.x
  let y = MARGIN.top

  const { personalInfo } = data

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor('#101114')
  doc.text(personalInfo.fullName || 'Your Name', x, y)
  y += 8

  if (personalInfo.jobTitle) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor('#4b5563')
    doc.text(personalInfo.jobTitle, x, y)
    y += 6
  }

  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean)

  if (contactItems.length) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor('#6b7280')
    doc.text(contactItems.join('   |   '), x, y)
    y += 8
  } else {
    y += 4
  }

  data.sectionOrder.forEach((key) => {
    const render = SECTION_RENDERERS[key]
    if (render) y = render(doc, data, x, y)
  })

  doc.save(buildFilename(personalInfo.fullName))
}