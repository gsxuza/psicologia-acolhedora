"use client";

import { motion } from "framer-motion";
import { DocumentCard } from "@/components/documents/DocumentCard";
import type { PatientDocument } from "@/lib/types";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function DocumentList({ documents }: { documents: PatientDocument[] }) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 lg:grid-cols-2"
    >
      {documents.map((doc) => (
        <motion.div key={doc.id} variants={itemVariants}>
          <DocumentCard document={doc} />
        </motion.div>
      ))}
    </motion.div>
  );
}
