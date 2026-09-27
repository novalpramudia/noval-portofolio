import { MessageCircle } from "lucide-react";

interface CommentCountBadgeProps {
  count?: number | null;
  size?: "sm" | "md";
}

/**
 * Badge read-only untuk menampilkan jumlah komentar di card/list.
 * Aman dari NaN/undefined -- selalu fallback ke 0.
 */
export default function CommentCountBadge({
  count,
  size = "md",
}: CommentCountBadgeProps) {
  const safeCount =
    typeof count === "number" && !Number.isNaN(count) ? count : 0;

  const isSmall = size === "sm";

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border text-gray-400 ${
        isSmall ? "px-3 py-1 text-sm" : "px-4 py-2"
      }`}
    >
      <MessageCircle size={isSmall ? 14 : 18} />
      <span>{safeCount}</span>
    </div>
  );
}
