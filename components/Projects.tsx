"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects({ onRequireAuth }: { onRequireAuth: () => void }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Projects
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          A selection of things I&apos;ve built. Sign in with Google to like or
          comment on any of them.
        </p>
      </motion.div>

      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onRequireAuth={onRequireAuth} />
        ))}
      </div>
    </section>
  );
}
