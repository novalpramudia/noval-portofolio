"use server";

import { createClient } from "@/lib/supabase/server";

export interface EngagementSummary {
  likeCount: number;
  commentCount: number;
  hasLiked: boolean;
}

/**
 * Ambil ringkasan like & comment untuk BANYAK project sekaligus.
 * Dipakai di halaman daftar/homepage supaya tidak perlu query satu-satu per card.
 *
 * Return: Map dari project_slug -> { likeCount, commentCount, hasLiked }
 * Kalau sebuah slug tidak ada datanya sama sekali, tetap dikembalikan
 * dengan nilai default { likeCount: 0, commentCount: 0, hasLiked: false }
 * supaya komponen di frontend tidak pernah menerima `undefined`.
 */
export async function getEngagementSummary(
  projectSlugs: string[]
): Promise<Record<string, EngagementSummary>> {
  const supabase = await createClient();

  // Siapkan default value dulu untuk semua slug, supaya tidak ada yang undefined
  const summary: Record<string, EngagementSummary> = {};
  for (const slug of projectSlugs) {
    summary[slug] = { likeCount: 0, commentCount: 0, hasLiked: false };
  }

  if (projectSlugs.length === 0) return summary;

  const { data: userData } = await supabase.auth.getUser();

  const [likesResult, commentsResult] = await Promise.all([
    supabase.from("likes").select("project_slug, user_id").in("project_slug", projectSlugs),
    supabase.from("comments").select("project_slug").in("project_slug", projectSlugs),
  ]);

  const likesRows = likesResult.data ?? [];
  const commentsRows = commentsResult.data ?? [];

  for (const row of likesRows) {
    const slug = row.project_slug as string;
    if (!summary[slug]) continue;
    summary[slug].likeCount += 1;
    if (userData.user && row.user_id === userData.user.id) {
      summary[slug].hasLiked = true;
    }
  }

  for (const row of commentsRows) {
    const slug = row.project_slug as string;
    if (!summary[slug]) continue;
    summary[slug].commentCount += 1;
  }

  return summary;
}
