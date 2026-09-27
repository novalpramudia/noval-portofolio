"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl font-semibold text-ink sm:text-3xl"
      >
        Skills &amp; Tech Stack
      </motion.h2>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      >
        {skills.map((skill, i) => (
          <motion.li
            key={skill}
            variants={item}
            className="glass group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl px-4 py-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 opacity-0 blur-md transition-opacity duration-300 group-hover:from-primary/20 group-hover:to-secondary/20 group-hover:opacity-100" />
            <span
              className="relative flex h-11 w-11 animate-float items-center justify-center rounded-xl border border-line font-display text-sm font-semibold text-ink"
              style={{ animationDelay: `${(i % 6) * 0.3}s` }}
            >
              {skill.slice(0, 2)}
            </span>
            <span className="relative text-xs font-medium text-muted sm:text-sm">
              {skill}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
