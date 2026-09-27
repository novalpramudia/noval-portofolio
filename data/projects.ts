import type { Project } from "@/types";

// Add or edit your projects here. `id` must be stable and unique —
// it is used as the foreign key for likes and comments in Supabase,
// so changing an existing id will orphan its likes/comments.
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Your Project Name",
    description:
      "Replace this with a short, honest description of what the project does and the problem it solves.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/novalpramudia",
    liveUrl: undefined,
    image: "/projects/placeholder-1.svg",
    featured: true,
  },
  {
    id: "project-two",
    title: "Your Android App",
    description:
      "Replace this with a short description of your Android project — architecture, key features, and what you learned.",
    technologies: ["Kotlin", "Android", "Jetpack Compose"],
    githubUrl: "https://github.com/novalpramudia",
    liveUrl: undefined,
    image: "/projects/placeholder-2.svg",
  },
  {
    id: "project-three",
    title: "Your CLI / Tool",
    description:
      "Replace this with a description of a developer tool, script, or experiment you've built.",
    technologies: ["Python", "CLI"],
    githubUrl: "https://github.com/novalpramudia",
    liveUrl: undefined,
    image: "/projects/placeholder-3.svg",
  },
];
