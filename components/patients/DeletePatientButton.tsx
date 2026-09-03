"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { deletePatient } from "@/app/actions/patients";
import type { Patient } from "@/lib/types";

export function DeletePatientButton({ patient }: { patient: Patient }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [typedName, setTypedName] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isMatch = typedName.trim() === patient.full_name.trim();

  function handleClose() {
    setOpen(false);
    setTypedName("");
    triggerRef.current?.focus();
  }

  function handleDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && !isPending) {
      handleClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleConfirm() {
    if (!isMatch) return;
    startTransition(async () => {
      try {
        await deletePatient(patient.id);
        toast.success("Paciente excluído");
        router.push("/pacientes");
        router.refresh();
      } catch {
        toast.error("Não foi possível excluir o paciente");
      }
    });
  }

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="danger"
        className="px-4 py-2"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={14} /> Excluir
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-800/40 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget && !isPending) handleClose();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-patient-title"
              onKeyDown={handleDialogKeyDown}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-md rounded-2xl border border-sand-200 bg-white p-6 shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dusk-50 text-dusk-500">
                    <AlertTriangle size={16} />
                  </span>
                  <h3 id="delete-patient-title" className="font-display text-base font-semibold text-ink-800">
                    Excluir paciente
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-full p-1 text-ink-700/40 transition-colors hover:bg-sand-100 hover:text-ink-700"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-700/70">
                Esta ação é <strong>irreversível</strong>. Todos os dados de{" "}
                <strong>{patient.full_name}</strong> — incluindo sessões,
                documentos e registros de humor — serão permanentemente
                excluídos.
              </p>

              <label className="mt-4 block text-xs font-medium text-ink-700/60">
                Digite <span className="font-semibold">{patient.full_name}</span>{" "}
                para confirmar
              </label>
              <input
                type="text"
                autoFocus
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                disabled={isPending}
                className="mt-1.5 w-full rounded-xl border border-sand-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-dusk-300"
                placeholder={patient.full_name}
              />

              <div className="mt-5 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleConfirm}
                  disabled={!isMatch}
                  loading={isPending}
                >
                  <Trash2 size={14} /> Excluir paciente
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
