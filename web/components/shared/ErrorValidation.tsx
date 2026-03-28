"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ErrorValidation({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={"text-sm text-destructive-light dark:text-destructive-dark"}
    >
      {children}
    </motion.p>
  );
}
