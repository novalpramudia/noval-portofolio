"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Comment {
  id: string;
  author_name: string;
  author_avatar_url: string | null;
  content: string;
  created_at: string;
  user_id: string;
}

interface CommentSectionProps {
  projectId: string;
  onRequireAuth: () => void;
}

export default function CommentSection({ projectId, onRequireAuth }: CommentSectionProps) {
  const supabase = useMemo(() => createClient(), []);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("comments")
        .select("id, author_name, author_avatar_url, content, created_at, user_id")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (active) {
        setUserId(userData.user?.id ?? null);
        setComments(data ?? []);
        setIsLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [projectId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      onRequireAuth();
      return;
    }

    const trimmed = content.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      onRequireAuth();
      setIsSubmitting(false);
      return;
    }

    const newComment = {
      project_id: projectId,
      user_id: user.id,
      author_name: user.user_metadata?.full_name ?? user.email ?? "Anonim",
      author_avatar_url: user.user_metadata?.avatar_url ?? null,
      content: trimmed,
    };

    const { data, error } = await supabase
      .from("comments")
      .insert(newComment)
      .select("id, author_name, author_avatar_url, content, created_at, user_id")
      .single();

    if (!error && data) {
      setComments((prev) => [data, ...prev]);
      setContent("");
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  return (
    <div className="mt-4 space-y-4 border-t border-line/60 pt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar..."
          rows={2}
          className="w-full rounded-lg border border-line bg-transparent p-2.5 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end rounded-full bg-primary px-4 py-1.5 text-sm text-white disabled:opacity-50"
        >
          {isSubmitting ? "Mengirim..." : "Post Comment"}
        </button>
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-xs text-muted">Memuat komentar...</p>}
        {!isLoading && comments.length === 0 && (
          <p className="text-xs text-muted">Belum ada komentar.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-2.5">
            {c.author_avatar_url && (
              <img
                src={c.author_avatar_url}
                alt={c.author_name}
                className="h-7 w-7 rounded-full"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink">{c.author_name}</span>
                {userId === c.user_id && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <p className="text-xs text-muted">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
