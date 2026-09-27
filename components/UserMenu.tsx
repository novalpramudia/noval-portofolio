"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function UserMenu({ onRequestLogin }: { onRequestLogin: () => void }) {
  const { user, signOut } = useAuth();
  const { show } = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!user) {
    return (
      <button
        onClick={onRequestLogin}
        className="rounded-full border border-line px-4 py-1.5 text-sm text-ink transition hover:border-primary/60 hover:bg-white/5"
      >
        Login
      </button>
    );
  }

  const name = (user.user_metadata?.full_name as string) ?? user.email ?? "User";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex items-center gap-2 rounded-full border border-line px-1.5 py-1.5 pr-3 text-sm text-ink transition hover:border-primary/60"
      >
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            width={26}
            height={26}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/30 text-xs">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-[110px] truncate sm:inline">{name}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="glass absolute right-0 mt-2 w-56 rounded-xl p-3 shadow-xl shadow-black/40"
        >
          <p className="truncate text-sm font-medium text-ink">{name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
          <button
            role="menuitem"
            onClick={async () => {
              await signOut();
              show("Signed out.", "info");
              setOpen(false);
            }}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink transition hover:bg-white/10"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
