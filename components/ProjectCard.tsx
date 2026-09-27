"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

interface ProjectCardProps {
  project: Project;
  onRequireAuth: () => void;
}

export default function ProjectCard({ project, onRequireAuth }: ProjectCardProps) {
  const supabase = useMemo(() => createClient(), []);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("project_id", project.id)
      .then(({ count }) => {
        if (active) setCommentCount(count ?? 0);
      });
    return () => {
      active = false;
    };
  }, [project.id, supabase]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, rotate: -0.3 }}
      className="glass flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
        <Image
          src={project.image}
          alt={`${project.title} thumbnail`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted transition hover:text-ink"
          >
            <Github size={15} /> Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted transition hover:text-ink"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-4">
          <LikeButton projectId={project.id} onRequireAuth={onRequireAuth} />
          <button
            onClick={() => setShowComments((s) => !s)}
            aria-expanded={showComments}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition hover:border-primary/40 hover:text-ink"
          >
            <MessageCircle size={15} /> {commentCount ?? "…"}
          </button>
        </div>

        {showComments && (
          <CommentSection projectId={project.id} onRequireAuth={onRequireAuth} />
        )}
      </div>
    </motion.article>
  );
}
