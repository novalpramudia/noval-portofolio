import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment can't be empty.")
    .max(1000, "Comments are limited to 1000 characters."),
  projectId: z.string().min(1),
});

export type CommentInput = z.infer<typeof commentSchema>;
