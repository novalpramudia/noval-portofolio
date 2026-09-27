"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1100;

    let frame: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden={!visible}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />

          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-line font-display text-3xl font-bold text-ink"
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-gradient">N</span>
            <motion.span
              className="absolute inset-0 rounded-2xl border border-primary/50"
              animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="relative flex flex-col items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Initializing Portfolio...
            </p>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
