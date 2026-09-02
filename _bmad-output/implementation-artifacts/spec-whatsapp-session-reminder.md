---
title: 'WhatsApp Session Reminder (Assisted Link)'
type: 'feature'
created: '2026-09-02'
status: 'done'
route: 'one-shot'
---

# WhatsApp Session Reminder (Assisted Link)

## Intent

**Problem:** Sessions already have a `reminder_sent` flag that is written but never acted on — there is no way to actually send a reminder to a patient from the app.

**Approach:** On the sessions board, show a "Lembrar" button for upcoming sessions (scheduled/confirmed) with a patient phone on file. Clicking opens a pre-filled `wa.me` WhatsApp link (assisted send — the psychologist sends manually from their own WhatsApp; no Business API/Twilio integration, per explicit user decision) and marks `reminder_sent = true`.

## Suggested Review Order

**Reminder link construction**

- Phone-normalization + `wa.me` URL builder
  [`lib/utils.ts:38`](../../lib/utils.ts#L38)

**Server-side write**

- Ownership-scoped update, mirrors `updatePatient`/`deletePatient`'s `RETURNING id` pattern (patch, added after review)
  [`app/actions/sessions.ts:52`](../../app/actions/sessions.ts#L52)

**Click handling**

- Guards (pending/no-phone/no-digits), opens WhatsApp tab, then marks sent with error feedback (patches added after review)
  [`components/sessions/SessionRow.tsx:59`](../../components/sessions/SessionRow.tsx#L59)

- Button only shown for upcoming sessions with a usable phone number
  [`components/sessions/SessionRow.tsx:77`](../../components/sessions/SessionRow.tsx#L77)

**Wiring**

- Patient phone looked up from the already-fetched patient list, no new query
  [`components/sessions/SessionsBoard.tsx:18`](../../components/sessions/SessionsBoard.tsx#L18)
