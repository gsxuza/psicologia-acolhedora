- source_spec: none
  summary: Allow deleting a patient record (patient list/detail currently only support create/edit)
  evidence: Split from a multi-goal intent ("view mood on patient dashboard + delete patient + session reminders") to keep the current spec single-goal

- source_spec: none
  summary: Send session reminders using the existing `reminder_sent` flag on the sessions table, which is currently written but never acted on
  evidence: Split from a multi-goal intent ("view mood on patient dashboard + delete patient + session reminders") to keep the current spec single-goal; needs a decision on delivery mechanism (email/WhatsApp/manual) before it can be scoped

- source_spec: `_bmad-output/implementation-artifacts/spec-patient-mood-thermometer-dashboard.md`
  summary: "`MoodHistoryChart`'s Y-axis `tickFormatter` (`components/portal/MoodHistoryChart.tsx`) does `label.split(\" \")[0]`, which renders \"Muito\" for both mood 1 (\"Muito difícil\") and mood 5 (\"Muito bem\") — the two axis extremes are indistinguishable"
  evidence: Pre-existing bug in a shared component, now also visible on the therapist-facing patient page; not caused by this change, out of scope to fix here

- source_spec: `_bmad-output/implementation-artifacts/spec-patient-mood-thermometer-dashboard.md`
  summary: The "Último registro" date label (derived via `created_at.slice(0, 10)` + `formatDate`, UTC-based) can disagree by one day with `MoodHistoryChart`'s x-axis labels (derived via `toLocaleDateString`, local-time-based) for the same check-in
  evidence: Same date-formatting split already exists in `app/(portal)/portal/termometro/page.tsx`; pre-existing pattern, not introduced by this change

- source_spec: `_bmad-output/implementation-artifacts/spec-patient-mood-thermometer-dashboard.md`
  summary: "`supabase/mood_checkins.sql` RLS policies reference `auth.uid()`/`auth.users`, but the app now authenticates via Clerk and queries Neon directly with `lib/db.ts`'s `sql` client, which does not go through Supabase RLS at all — the policies are dead/misleading"
  evidence: Repo-wide leftover from the Supabase-to-Neon+Clerk migration (same as the stale README noted in AGENTS.md), affects all tables not just mood_checkins; out of scope for this spec

- source_spec: `_bmad-output/implementation-artifacts/spec-patient-mood-thermometer-dashboard.md`
  summary: No therapist-facing way to see check-in frequency/gaps, an average-mood stat tile, or a full (>30) history view for a patient's emotional check-ins
  evidence: Enhancements beyond "view existing mood data on the patient page" as scoped; candidate for a follow-up spec if the psychologist wants deeper mood analytics

- source_spec: `_bmad-output/implementation-artifacts/spec-delete-patient.md`
  summary: Deleting a patient leaves no audit trail (who deleted, when, which patient) despite cascading away a full clinical history (sessions, documents, mood check-ins)
  evidence: Real compliance/record-keeping concern for a psychology-practice app handling health data; needs an audit-log table/mechanism, out of scope for this one spec

- source_spec: `_bmad-output/implementation-artifacts/spec-delete-patient.md`
  summary: The new delete-confirmation modal in `DeletePatientButton.tsx` has no `role="dialog"`/`aria-modal`, no focus trap, and no Escape-to-close handler
  evidence: This is the first modal dialog in the codebase (no prior pattern to follow); standard modal accessibility gaps confirmed by review, worth a follow-up once a second modal use case establishes the shared pattern

- source_spec: `_bmad-output/implementation-artifacts/spec-delete-patient.md`
  summary: Cascade-deleting a patient's `documents` rows does not delete the underlying uploaded files from storage, leaving them orphaned
  evidence: Pre-existing gap — the single-document delete action (`app/actions/documents.ts:deleteDocument`) already doesn't clean up storage either; not introduced by this change

- source_spec: `_bmad-output/implementation-artifacts/spec-delete-patient.md`
  summary: No automated test covers `deletePatient`'s ownership scoping (`created_by = userId`), so a future refactor that weakens or drops that clause would ship undetected
  evidence: Verification-gap review confirmed no test file references `deletePatient`, `updatePatient`, or `created_by` anywhere, and the repo has no test runner configured at all (`package.json` has no `test` script) — a repo-wide gap, not unique to this change

- source_spec: `_bmad-output/implementation-artifacts/spec-whatsapp-session-reminder.md`
  summary: "`lib/utils.ts`'s new `buildWhatsAppLink(phone, message)` duplicates `lib/config.ts`'s existing `whatsappLink(message)` — two separate, drifting implementations of \"build a wa.me URL\" now exist"
  evidence: The existing helper is hardcoded to `BRAND.whatsappNumber` (the psychologist's own contact for the landing page) and isn't parametrized by an arbitrary patient phone; unifying them means refactoring `config.ts`'s callers too — broader than this spec

- source_spec: `_bmad-output/implementation-artifacts/spec-whatsapp-session-reminder.md`
  summary: "`buildWhatsAppLink`'s phone-normalization heuristic (prepend \"55\" only when digit count is exactly 10 or 11) has no validation or user-facing warning for malformed input — a number with a leading trunk \"0\", a partial DDD, or an already-prefixed-but-wrong-length string produces a broken `wa.me` link silently"
  evidence: `PatientForm.tsx`'s phone field has no format enforcement (`z.string().optional()`), so nothing upstream guarantees the 10/11-digit assumption; graceful failure mode is WhatsApp's own "invalid number" page rather than sending to a wrong contact, so this wasn't blocking, but is a real gap

- source_spec: `_bmad-output/implementation-artifacts/spec-whatsapp-session-reminder.md`
  summary: The reminder button shows for any `scheduled`/`confirmed` session regardless of whether its date/time has already passed, and the message text ignores `session.modality` (no video-call context for online sessions)
  evidence: Enhancements beyond "let the psychologist send a WhatsApp reminder" as scoped; candidate polish for a follow-up

- source_spec: `_bmad-output/implementation-artifacts/spec-whatsapp-session-reminder.md`
  summary: No accessible state indication for the "Lembrar"/"Enviado" button (relies on a `title` tooltip only, unreliable on touch/mobile) and no way to un-mark `reminder_sent` if clicked by mistake
  evidence: Same category of gap already deferred for `DeletePatientButton`'s modal — no established accessible-component pattern yet in this codebase; un-marking is a low-stakes product decision left open
