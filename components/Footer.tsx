import { Github, Instagram, Facebook, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

const SOCIALS = [
  { label: "GitHub", href: site.links.github, Icon: Github },
  { label: "Instagram", href: site.links.instagram, Icon: Instagram },
  { label: "Facebook", href: site.links.facebook, Icon: Facebook },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/60 px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted">© 2026 {site.name}</p>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full border border-line p-2 text-muted transition hover:border-primary/50 hover:text-ink"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted">Built with Next.js, Supabase &amp; Vercel</p>
      </div>
    </footer>
  );
}
