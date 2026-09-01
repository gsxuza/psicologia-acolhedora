"use client";

import { motion } from "framer-motion";
import { PatientCard } from "@/components/patients/PatientCard";
import type { Patient } from "@/lib/types";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export function PatientList({ patients }: { patients: Patient[] }) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 lg:grid-cols-2"
    >
      {patients.map((patient) => (
        <motion.div key={patient.id} variants={itemVariants}>
          <PatientCard patient={patient} />
        </motion.div>
      ))}
    </motion.div>
  );
}
