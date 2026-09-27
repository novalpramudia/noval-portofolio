"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface LikeButtonProps {
  projectId: string;
  onRequireAuth: () => void;
}

export default function LikeButton({ projectId, onRequireAuth }: LikeButtonProps) {
  const supabase = useMemo(() => createClient(), []);
  const [count, setCount] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData.user?.id ?? null;

      const { count: likeCount } = await supabase
        .from("likes")
        .select("id", { count: "exact", head: true })
        .eq("project_id", projectId);

      let liked = false;
      if (currentUserId) {
        const { data } = await supabase
          .from("likes")
          .select("id")
          .eq("project_id", projectId)
          .eq("user_id", currentUserId)
          .maybeSingle();
        liked = !!data;
      }

      if (active) {
        setUserId(currentUserId);
        setCount(likeCount ?? 0);
        setHasLiked(liked);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [projectId, supabase]);

  const handleClick = async () => {
    if (!userId) {
      onRequireAuth();
      return;
    }
    if (isPending) return;

    setIsPending(true);
    const willLike = !hasLiked;

    // Optimistic update
    setHasLiked(willLike);
    setCount((prev) => Math.max(0, (prev ?? 0) + (willLike ? 1 : -1)));

    try {
      if (willLike) {
        await supabase.from("likes").insert({ project_id: projectId, user_id: userId });
      } else {
        await supabase
          .from("likes")
          .delete()
          .eq("project_id", projectId)
          .eq("user_id", userId);
      }
    } catch {
      // Rollback kalau gagal
      setHasLiked(!willLike);
      setCount((prev) => Math.max(0, (prev ?? 0) + (willLike ? -1 : 1)));
    } finally {
      setIsPending(false);
    }
  };

  const safeCount = typeof count === "number" && !Number.isNaN(count) ? count : 0;

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition hover:border-primary/40 hover:text-ink disabled:opacity-50"
    >
      <Heart
        size={15}
        className={hasLiked ? "fill-red-500 text-red-500" : ""}
      />
      {count === null ? "…" : safeCount}
    </button>
  );
}
