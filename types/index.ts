export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
}

export interface CommentRow {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
}

export interface LikeRow {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
}

export interface ProjectStats {
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
}
