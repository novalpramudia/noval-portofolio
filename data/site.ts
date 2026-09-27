// Central place to edit your identity, links, and headline stats.
// Nothing else in the codebase should need to change when these do.

export const site = {
  name: "Noval Pramudia Ramadhan",
  username: "novalpramudia",
  title: "Noval Pramudia Ramadhan — Developer Portfolio",
  tagline: "Full Stack Developer • Android Developer • Software Developer • Tech Enthusiast",
  description:
    "Portfolio of Noval Pramudia Ramadhan — a full stack and Android developer building modern applications, developer tools, and experimental software projects.",
  roles: [
    "Full Stack Developer",
    "Android Developer",
    "Software Developer",
    "Tech Enthusiast",
  ],
  about:
    "Saya adalah developer yang tertarik pada pengembangan software, aplikasi Android, web development, dan eksplorasi teknologi baru. Saya senang membuat project dari ide hingga menjadi aplikasi yang dapat digunakan.",
  links: {
    github: "https://github.com/novalpramudia",
    instagram: "https://www.instagram.com/nvlpramdi104v?stkn=bWVpemhjaTc4OHJp",
    facebook: "https://www.facebook.com/share/1EemHDt2Mx/",
    whatsapp: "https://wa.me/6285624753455",
  },
  // Edit these to match your real numbers — nothing here is fetched
  // automatically, so update it whenever it goes stale.
  stats: [
    { label: "Projects", value: 12 },
    { label: "Technologies", value: 15 },
    { label: "GitHub Repositories", value: 20 },
    { label: "Years of Learning", value: 3 },
  ],
} as const;

export const skills = [
  "Kotlin",
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Android",
  "Git",
  "GitHub",
  "Supabase",
  "Vercel",
] as const;
