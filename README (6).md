# Fitur Like & Comment — Sesuai struktur ProjectCard.tsx kamu

Project kamu sudah punya pola sendiri:
- `project.id` sebagai identifier (bukan slug)
- Query Supabase dilakukan **client-side** (`@/lib/supabase/client`)
- Pola `onRequireAuth()` — dipanggil kalau user belum login (biar ProjectCard yang urus modal login)

File ini disesuaikan 100% dengan pola itu, jadi `ProjectCard.tsx` KAMU **tidak perlu diubah sama sekali**.

## 1. Jalankan SQL di Supabase (SQL Editor), berurutan:
1. `sql/01_schema.sql` — bikin tabel `comments` dan `likes`, kolom `project_id` (text)
2. `sql/02_rls_policies.sql` — Row Level Security

## 2. Timpa 2 file ini di project kamu:
- `components/LikeButton.tsx`
- `components/CommentSection.tsx`

Props-nya sudah cocok persis dengan cara `ProjectCard.tsx` memanggilnya:
```tsx
<LikeButton projectId={project.id} onRequireAuth={onRequireAuth} />
<CommentSection projectId={project.id} onRequireAuth={onRequireAuth} />
```

## 3. Cek dependency
```
npm install lucide-react
```
(kemungkinan besar sudah terinstall karena `ProjectCard.tsx` sudah pakai `lucide-react`)

## 4. Catatan tipe data `project.id`
Kolom `project_id` di database dibuat bertipe `text`, jadi cocok baik `project.id` kamu
berupa string biasa (slug) maupun UUID. Kalau nanti ternyata `project.id` bertipe number,
kabari saja, tinggal disesuaikan.

## 5. Test
- `npm run build` dulu di lokal sebelum deploy ke Vercel, pastikan tidak ada type error lagi.
- Login → coba like & comment.
- Logout → coba klik like/comment, pastikan modal login (`onRequireAuth`) muncul, bukan error.
