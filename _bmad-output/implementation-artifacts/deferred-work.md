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
