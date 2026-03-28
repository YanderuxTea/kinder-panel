"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export default function ModalSkeleton({
  children,
  setOpenModalAction,
}: {
  children: ReactNode;
  setOpenModalAction: (value: boolean) => void;
}) {
  useEffect(() => {
    window.document.documentElement.style.overflow = "hidden";
    return () => {
      window.document.documentElement.style.overflow = "unset";
    };
  }, []);
  return (
    <motion.div
      onClick={() => setOpenModalAction(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={
        "flex items-center justify-center inset-0 fixed z-1000 backdrop-blur bg-black/10 p-6"
      }
    >
      <div
        className={
          "bg-popover-light dark:bg-popover-dark rounded-3xl border border-border-light" +
          " dark:border-border-dark w-full p-6 max-w-125"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
}
