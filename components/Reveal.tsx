"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  y = 20,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
