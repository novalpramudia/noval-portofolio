"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";

function useTypingEffect(words: readonly string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 45 : 80;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypingEffect(site.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
      >
        Hi, I&apos;m Noval
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl"
      >
        {site.name}
      </motion.h1>

      <div className="mt-5 h-8 font-display text-lg text-muted sm:text-xl">
        <span className="text-gradient font-medium">{typed}</span>
        <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 animate-blink bg-secondary align-middle" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-6 max-w-xl text-balance text-sm text-muted sm:text-base"
      >
        I build modern applications, developer tools, and experimental software
        projects.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#projects"
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-void transition hover:opacity-90"
        >
          View My Projects
          <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-primary/60 hover:bg-white/5"
        >
          <Github size={15} /> GitHub Profile
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-primary/60 hover:bg-white/5"
        >
          <Mail size={15} /> Contact Me
        </a>
      </motion.div>
    </section>
  );
}
