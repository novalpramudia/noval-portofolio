"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  reason?: string;
}

export default function LoginModal({ open, onClose, reason }: LoginModalProps) {
  const { signInWithGoogle } = useAuth();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            className="glass relative w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full p-1 text-muted transition hover:bg-white/10 hover:text-ink"
            >
              <X size={18} />
            </button>

            <h2 id="login-modal-title" className="font-display text-lg font-semibold text-ink">
              Sign in required
            </h2>
            <p className="mt-2 text-sm text-muted">
              {reason ?? "Sign in with Google to continue."}
            </p>

            <button
              onClick={() => signInWithGoogle()}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-white/5 px-4 py-3 text-sm font-medium text-ink transition hover:border-primary/50 hover:bg-white/10"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.2-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 36 26.9 37 24 37c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.6 40.6 16.3 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.7 36 44 30.5 44 24c0-1.4-.2-2.7-.4-3.5z"
      />
    </svg>
  );
}
