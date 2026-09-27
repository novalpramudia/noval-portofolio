# Fitur Certificates — Panduan Instalasi

## 1. Copy gambar sertifikat
Copy semua isi folder `public/certificates/` ke folder `public/certificates/` di project
`noval-portfolio` kamu (buat folder baru kalau belum ada).

File yang tersedia:
- aws-cloud-foundations.jpg
- aws-cloud-developing.jpg
- aws-cloud-architecting.jpg
- aws-generative-ai-foundations.jpg
- cisco-computer-hardware-basics.jpg
- cisco-operating-systems-basics.jpg
- cisco-introduction-to-cybersecurity.jpg
- cisco-ethical-hacker.jpg
- cisco-network-defense.jpg

## 2. Copy file data dan komponen
- `data/certificates.ts` → taruh di `data/certificates.ts`
- `components/Certificates.tsx` → taruh di `components/Certificates.tsx`

## 3. Pasang di halaman utama
Buka `app/page.tsx` (atau halaman tempat section "Skills"/"Projects" kamu berada),
tambahkan import dan render komponennya:

```tsx
import Certificates from "@/components/Certificates";

// ...di dalam JSX, taruh di posisi yang kamu mau (misal setelah section Skills):
<Certificates />
```

## 4. (Opsional) Tambahkan link navigasi
Kalau mau ada link "Certificates" di navbar, tambahkan di `Navbar.tsx`:
```tsx
<a href="#certificates">Certificates</a>
```
(Section sudah punya `id="certificates"` sehingga anchor link ini otomatis jalan.)

## 5. Cara kerja
- Grid menampilkan semua sertifikat sebagai kartu dengan thumbnail, judul, penerbit, dan
  tanggal terbit.
- Klik kartu mana pun akan membuka modal (lightbox) menampilkan gambar sertifikat secara
  penuh, plus tombol "Verify credential" untuk sertifikat AWS yang punya link Credly.
- Sertifikat Cisco tidak punya link verifikasi eksternal (hanya QR code di gambar itu
  sendiri), jadi tombol "Verify credential" otomatis tidak muncul untuk yang itu.

## 6. Menambah sertifikat baru nanti
Cukup taruh gambar baru di `public/certificates/`, lalu tambahkan satu entry baru di
`data/certificates.ts` mengikuti format yang sudah ada — tidak perlu ubah komponen.
