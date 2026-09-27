"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getComments(projectSlug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, author_name, author_avatar_url, content, created_at, user_id")
    .eq("project_slug", projectSlug)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getLikeInfo(projectSlug: string) {
  const supabase = await createClient();

  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("project_slug", projectSlug);

  const { data: userData } = await supabase.auth.getUser();
  let hasLiked = false;

  if (userData.user) {
    const { data } = await supabase
      .from("likes")
      .select("id")
      .eq("project_slug", projectSlug)
      .eq("user_id", userData.user.id)
      .maybeSingle();
    hasLiked = !!data;
  }

  return { count: count ?? 0, hasLiked };
}

export async function addComment(projectSlug: string, content: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Kamu harus login dulu untuk berkomentar.");
  }

  const trimmed = content.trim();
  if (!trimmed) throw new Error("Komentar tidak boleh kosong.");

  const { error } = await supabase.from("comments").insert({
    project_slug: projectSlug,
    user_id: userData.user.id,
    author_name:
      userData.user.user_metadata.full_name ??
      userData.user.email ??
      "Anonim",
    author_avatar_url: userData.user.user_metadata.avatar_url ?? null,
    content: trimmed,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/projects/${projectSlug}`);
}

export async function deleteComment(commentId: string, projectSlug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) throw new Error(error.message);

  revalidatePath(`/projects/${projectSlug}`);
}

export async function toggleLike(projectSlug: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Kamu harus login dulu untuk like.");
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("project_slug", projectSlug)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("likes").insert({
      project_slug: projectSlug,
      user_id: userData.user.id,
    });
  }

  revalidatePath(`/projects/${projectSlug}`);
}
