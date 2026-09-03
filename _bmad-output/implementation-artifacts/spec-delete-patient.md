---
title: 'Delete Patient'
type: 'feature'
created: '2026-09-02'
status: 'done'
review_loop_iteration: 0
context: []
baseline_commit: 'ba82789df7e6c84b78dc625cfb5eeeecb0003fa9'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The patient list/detail pages only support create and edit — there is no way to delete a patient record. `patients.id` cascades on delete (`ON DELETE CASCADE`) to `sessions`, `documents`, and `mood_checkins`, so deleting a patient is an irreversible, high-stakes action that wipes their entire clinical history.

**Approach:** Add a `deletePatient` server action (scoped by `created_by`, mirroring `updatePatient`) and a type-to-confirm modal on the patient detail page, next to the existing "Editar" button. The modal requires typing the patient's exact full name before the delete button enables, given the cascading, irreversible data loss — a stronger gate than the app's existing 2-click hover-confirm used for documents, which is not proportionate to deleting years of session/clinical data.

## Boundaries & Constraints

**Always:**
- Scope the delete query by `created_by = userId` (same ownership check as `updatePatient`), so one psychologist cannot delete another's patient.
- Require the human to type the patient's exact `full_name` (case-sensitive, trimmed) into a text input before the delete action is enabled.
- After a successful delete, redirect to `/pacientes` and show a success toast.
- Only add the delete entry point to the patient detail page (`app/(dashboard)/pacientes/[id]/page.tsx`) — not to `PatientCard`/the list, to avoid a destructive action reachable from a single click on a list row.

**Ask First:** None — the type-to-confirm design is the answer to the one open question (confirmation strength) and is presented here for approval rather than decided mid-implementation.

**Never:**
- Never implement a soft-delete/status flag as an alternative — out of scope; `patients.status` (active/waiting/inactive) already exists for that purpose and is a separate, non-destructive workflow.
- Never delete without the exact-name match confirmed client-side first.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Happy path | User types the exact full name, clicks confirm | Patient (and cascaded sessions/documents/mood_checkins) deleted; redirect to `/pacientes`; success toast | N/A |
| Typed name mismatch | User types a different string | Confirm button stays disabled | No request sent |
| Deleting another psychologist's patient (edge, e.g. stale id) | `deletePatient(id)` called for a row where `created_by != userId` | `DELETE ... WHERE id = $1 AND created_by = $2` affects 0 rows | Action throws; client shows an error toast, modal stays open |
| Modal dismissed | User closes the modal without confirming | No request sent, patient untouched | N/A |

</frozen-after-approval>

## Code Map

- `app/actions/patients.ts` -- add `deletePatient(id: string)`, mirrors `updatePatient`'s auth + ownership-scoped query, no `redirect()` call (unlike `createPatient`/`updatePatient` — kept client-driven here to avoid mixing a server-side redirect with the client's own toast+navigate sequence)
- `app/(dashboard)/pacientes/[id]/page.tsx` -- render the new `DeletePatientButton` next to the existing "Editar" link (around the hero-card action area)
- `components/patients/DeletePatientButton.tsx` -- new client component: trigger button (danger-styled) + type-to-confirm modal, reusing `components/ui/Button.tsx`'s `danger` variant
- `components/documents/DocumentCard.tsx` -- reference only, for the existing `useTransition` + `sonner` toast delete pattern (not modified)

## Tasks & Acceptance

**Execution:**
- [x] `app/actions/patients.ts` -- add `deletePatient(id: string)` -- ownership-scoped delete, no redirect, so the client controls the post-delete toast/navigation sequence
- [x] `components/patients/DeletePatientButton.tsx` -- create client component -- danger button opens a modal; text input must match `patient.full_name` exactly (trimmed) to enable the confirm button; on confirm, calls `deletePatient`, then `toast.success` + `router.push("/pacientes")`; on failure, `toast.error` and keep modal open
- [x] `app/(dashboard)/pacientes/[id]/page.tsx` -- render `<DeletePatientButton patient={p} />` beside the "Editar" link

**Acceptance Criteria:**
- Given a patient detail page, when the psychologist clicks "Excluir", then a modal opens asking them to type the patient's full name.
- Given the modal is open, when the typed text does not exactly match the patient's full name, then the confirm button remains disabled.
- Given the typed text exactly matches, when the psychologist clicks confirm, then the patient and all cascaded sessions/documents/mood_checkins are deleted, and the browser is redirected to `/pacientes` with a success toast.
- Given the delete request fails (e.g. ownership mismatch), when the error is caught, then an error toast is shown and the modal remains open with the patient record intact.

## Spec Change Log

## Design Notes

No existing modal/dialog component exists in this codebase (`components/ui/` only has `Button`, `Badge`, `Field`). Build the modal inline in `DeletePatientButton.tsx` as a fixed-overlay + `framer-motion` `AnimatePresence` panel, matching the app's existing `card-soft` visual language (same rounding/shadow tokens used elsewhere) rather than introducing a new dependency.

## Verification

**Commands:**
- `npx tsc --noEmit` -- expected: no new type errors
- `npm run build` -- expected: `/pacientes/[id]` route compiles and all 15 routes still generate

**Manual checks (if no CLI):**
- Open a patient detail page, click "Excluir", confirm the button stays disabled until the exact name is typed, confirm delete redirects to `/pacientes` and the patient no longer appears in the list.

## Suggested Review Order

**Ownership-scoped delete**

- Entry point: the delete action, scoped identically to `updatePatient`, no server redirect
  [`app/actions/patients.ts:69`](../../app/actions/patients.ts#L69)

**Confirmation gate**

- Type-to-confirm match, trimmed on both sides after review (patch)
  [`components/patients/DeletePatientButton.tsx:18`](../../components/patients/DeletePatientButton.tsx#L18)

- Confirm button disabled until the typed name matches
  [`components/patients/DeletePatientButton.tsx:121`](../../components/patients/DeletePatientButton.tsx#L121)

**Post-delete navigation**

- Delete call, then cache-busting `router.refresh()` added after review (patch), matching the rest of the codebase's mutation pattern
  [`components/patients/DeletePatientButton.tsx:29`](../../components/patients/DeletePatientButton.tsx#L29)

**Wiring**

- Button rendered beside "Editar" on the patient detail page
  [`app/(dashboard)/pacientes/[id]/page.tsx:171`](../../app/(dashboard)/pacientes/%5Bid%5D/page.tsx#L171)
