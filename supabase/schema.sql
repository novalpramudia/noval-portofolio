-- ============================================================================
-- Noval Portfolio — Supabase schema
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- Safe to re-run: guarded with IF NOT EXISTS / OR REPLACE where possible.
-- ============================================================================

-- 1. PROFILES ---------------------------------------------------------------
-- Mirrors the fields we need from auth.users so we can safely join a
-- commenter's name/avatar from client-side queries (auth.users itself is
-- never exposed to the client).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- Profiles are written only by the trigger below (as the postgres role),
-- never directly by clients — so no insert/update/delete policy is granted.

-- Keep profiles in sync whenever a user signs up or their Google metadata
-- (name/avatar) changes.
create or replace function public.handle_new_or_updated_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute procedure public.handle_new_or_updated_user();

-- 2. PROJECTS -----------------------------------------------------------------
-- `id` must match the `id` used for the same project in data/projects.ts.
-- This table exists so likes/comments have a real foreign key to point at;
-- the rest of the project's content (title, description, images...) is
-- still authored in data/projects.ts.
create table if not exists public.projects (
  id text primary key,
  title text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Projects are publicly readable" on public.projects;
create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

-- Seed rows matching the example projects in data/projects.ts.
-- Add a row here every time you add a project with a new id.
insert into public.projects (id, title) values
  ('project-one', 'Your Project Name'),
  ('project-two', 'Your Android App'),
  ('project-three', 'Your CLI / Tool')
on conflict (id) do nothing;

-- 3. LIKES --------------------------------------------------------------------
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects (id) on delete cascade,
  -- References profiles (not auth.users) so PostgREST can embed
  -- `profiles(...)` directly in a `.select()` on this table.
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create index if not exists likes_project_id_idx on public.likes (project_id);
create index if not exists likes_user_id_idx on public.likes (user_id);

alter table public.likes enable row level security;

drop policy if exists "Likes are publicly readable" on public.likes;
create policy "Likes are publicly readable"
  on public.likes for select
  using (true);

drop policy if exists "Users can like as themselves" on public.likes;
create policy "Users can like as themselves"
  on public.likes for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own like" on public.likes;
create policy "Users can remove their own like"
  on public.likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- 4. COMMENTS -------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects (id) on delete cascade,
  -- References profiles (not auth.users) so we can embed the commenter's
  -- profile directly via `.select("...,profiles(...)")` on the client.
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_project_id_idx on public.comments (project_id, created_at desc);
create index if not exists comments_user_id_idx on public.comments (user_id);

alter table public.comments enable row level security;

drop policy if exists "Comments are publicly readable" on public.comments;
create policy "Comments are publicly readable"
  on public.comments for select
  using (true);

drop policy if exists "Users can comment as themselves" on public.comments;
create policy "Users can comment as themselves"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own comments" on public.comments;
create policy "Users can delete their own comments"
  on public.comments for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can edit their own comments" on public.comments;
create policy "Users can edit their own comments"
  on public.comments for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at current on edits.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at
  before update on public.comments
  for each row execute procedure public.set_updated_at();
