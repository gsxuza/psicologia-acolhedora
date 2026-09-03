---
title: 'Patient Mood Thermometer on Dashboard'
type: 'feature'
created: '2026-09-02'
status: 'done'
route: 'one-shot'
---

# Patient Mood Thermometer on Dashboard

## Intent

**Problem:** The psychologist could not see a patient's emotional check-in history (the "termômetro emocional") anywhere in the admin dashboard — only the patient themselves could see it, on the patient-facing portal.

**Approach:** Query `mood_checkins` for the patient on the existing patient detail page and render the same `MoodHistoryChart` component already used on the patient-facing portal, plus the latest mood label/date and the latest check-in's note.

## Suggested Review Order

- Entry point: new mood section reusing the existing chart component
  [`app/(dashboard)/pacientes/[id]/page.tsx:332`](../../app/(dashboard)/pacientes/[id]/page.tsx#L332)

- Data fetch added to the existing `Promise.all`, scoped to the patient id
  [`app/(dashboard)/pacientes/[id]/page.tsx:64`](../../app/(dashboard)/pacientes/[id]/page.tsx#L64)

- Local `MOOD_LABELS` duplicated (not imported) — indexing into a `"use client"` module's exported const throws in a server component
  [`app/(dashboard)/pacientes/[id]/page.tsx:33`](../../app/(dashboard)/pacientes/[id]/page.tsx#L33)

- Optional chaining on the mood-to-label lookup, guards out-of-range `mood` values
  [`app/(dashboard)/pacientes/[id]/page.tsx:342`](../../app/(dashboard)/pacientes/[id]/page.tsx#L342)

- Latest check-in's free-text note surfaced under the chart when present
  [`app/(dashboard)/pacientes/[id]/page.tsx:355`](../../app/(dashboard)/pacientes/[id]/page.tsx#L355)
