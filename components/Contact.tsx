"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Facebook, MessageCircle, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const CONTACTS = [
  { label: "GitHub", href: site.links.github, Icon: Github },
  { label: "Instagram", href: site.links.instagram, Icon: Instagram },
  { label: "Facebook", href: site.links.facebook, Icon: Facebook },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: MessageCircle },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Let&apos;s build something
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Open to collaboration, freelance work, or just a conversation about
          software. Reach out on any of these.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {CONTACTS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-ink transition hover:border-primary/50 hover:bg-white/5"
            >
              <Icon size={15} />
              {label}
              <ArrowUpRight
                size={13}
                className="text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
