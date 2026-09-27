"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award } from "lucide-react";
import { certificates, type Certificate } from "@/data/certificates";

export default function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="certificates" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Certificates
        </h2>
        <p className="mt-2 text-sm text-muted">
          Credentials from Cisco Networking Academy and AWS Academy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <motion.button
            key={cert.title}
            onClick={() => setActive(cert)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="glass group flex flex-col overflow-hidden rounded-2xl text-left"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-line bg-black/20">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-primary">
                <Award size={13} />
                {cert.issuer}
              </div>
              <h3 className="font-display text-sm font-semibold text-ink">
                {cert.title}
              </h3>
              <p className="mt-auto text-xs text-muted">
                Issued {cert.issuedOn}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActive(null)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="glass relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close dialog"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60"
              >
                <X size={18} />
              </button>

              <div className="relative max-h-[70vh] w-full overflow-auto bg-black/30">
                <Image
                  src={active.image}
                  alt={active.title}
                  width={1600}
                  height={1131}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-1 p-5">
                <span className="text-[11px] uppercase tracking-wide text-primary">
                  {active.issuer}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {active.title}
                </h3>
                <p className="text-sm text-muted">Issued {active.issuedOn}</p>

                {active.credentialUrl && (
                  <a
                    href={active.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-primary/40 hover:text-ink"
                  >
                    <ExternalLink size={15} />
                    Verify credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
