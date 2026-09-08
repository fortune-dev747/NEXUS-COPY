# Fair Copy — ATS Resume Builder

A single-resume, client-side CV builder. Fill in the form, reorder sections by
drag-and-drop, and export a clean, ATS-safe PDF straight from the browser.
Everything is saved to `localStorage` — no backend, no accounts.

## Stack

- React 18 + Vite (JavaScript)
- Tailwind CSS v3 (custom `ink` / `paper` / `accent` / `clay` token palette)
- `@dnd-kit` for drag-and-drop section reordering
- Browser print-to-PDF (`window.print()`) for export — no PDF library needed

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build     # production build, output in dist/
npm run preview   # preview the production build locally
```

## How it's organized

```
src/
  data/defaultData.js        # empty resume shape, factory functions, section metadata
  hooks/useLocalStorage.js   # generic localStorage-backed useState
  theme/ThemeContext.jsx     # light/dark app theme, persisted separately from resume data
  components/
    Header.jsx, ThemeToggle.jsx
    SectionList.jsx          # dnd-kit context for the reorderable sections
    SortableSectionItem.jsx  # collapsible, draggable section wrapper
    common/                  # Field, Input, TextArea, Button, IconButton, EntryCard
    forms/                   # one form component per resume section
    preview/
      ResumePreview.jsx      # the actual ATS-safe resume template (also the print target)
      ScaledPreview.jsx      # auto-scales the fixed A4-width sheet to fit any screen
  App.jsx                    # wires editor + preview together, owns the resume state
```

## Notes on the ATS-safe template

- Single column, no tables, no text-in-images — just plain, ordered text.
- The preview always renders on a white background (`ResumePreview.jsx` does not
  use any `dark:` classes), independent of the app's own light/dark theme.
- `#resume-print-area` is the only element visible when printing — see the
  `@media print` rules at the bottom of `src/index.css`.

## Extending it

- **More templates:** add a new component under `src/components/preview/` that
  accepts the same `data` shape as `ResumePreview`, then swap it in `App.jsx`.
  The section-render map pattern in `ResumePreview.jsx` makes it easy to reuse
  the same section components across templates.
- **More sections:** add a factory + blank shape in `data/defaultData.js`, a
  form in `components/forms/`, a renderer in `ResumePreview.jsx`, and register
  the key in `SECTION_META` / `DEFAULT_SECTION_ORDER`.
- **Multiple saved resumes:** swap the single `cv-builder-resume-data` key in
  `useLocalStorage` for a keyed collection (e.g. `resumes: { [id]: data }`) plus
  an "active resume" pointer.
