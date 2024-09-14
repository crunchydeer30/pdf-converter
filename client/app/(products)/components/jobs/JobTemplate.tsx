"use client";
import React from "react";
import { motion } from "framer-motion";
import { Theme } from "@/ui/themes/types/Theme";

export default function JobTemplate({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <motion.div
      initial={{ x: "15%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={`grow h-[90vh] bg-${theme.color}-very-light p-20 relative`}
    >
      {children}
    </motion.div>
  );
}
