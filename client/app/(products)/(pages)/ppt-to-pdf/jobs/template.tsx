"use client";
import React from "react";
import { motion } from "framer-motion";
import { ThemePPT } from "@/ui/themes/Themes";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "25%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={`grow bg-${ThemePPT.color}-very-light`}
    >
      {children}
    </motion.div>
  );
}
