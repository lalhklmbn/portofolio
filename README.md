# Portofolio Pribadi

Website portofolio statis — **murni HTML, CSS, dan JavaScript**, tanpa database
dan tanpa backend. Semua konten (foto, PDF, teks) diedit langsung lewat file,
lalu di-push ke GitHub.

## Struktur Folder

```
index.html
css/
  └─ style.css
js/
  └─ script.js
assets/
  ├─ images/
  │   ├─ profile/     → foto profil (4 tempat)
  │   ├─ portrait/     → foto potret (3 tempat)
  │   └─ landscape/    → foto lanskap (3 tempat)
  └─ pdfs/             → dokumen PDF (3 tempat, dengan pratinjau langsung)
```

## Cara Mengganti Foto

Setiap foto punya **nama file tetap**. Yang perlu Anda lakukan hanyalah
mengunggah foto Anda sendiri dengan nama file yang **persis sama**
(format `.jpg`) ke folder yang sesuai lewat GitHub (upload file / drag-drop),
menimpa placeholder yang ada. Tidak perlu edit kode sama sekali.

| Lokasi di halaman | Path file yang harus diisi | Rasio disarankan |
|---|---|---|
| Avatar kecil di navbar | `assets/images/profile/profile-nav.jpg` | 1:1 (persegi) |
| Foto besar di Hero | `assets/images/profile/profile-hero.jpg` | 3:4 (potret) |
| Foto di bagian "Tentang" | `assets/images/profile/profile-about.jpg` | 4:5 (potret) |
| Foto di Kontak/Footer | `assets/images/profile/profile-footer.jpg` | 1:1 (persegi) |
| Galeri Potret #1–#3 | `assets/images/portrait/portrait-1.jpg`, `portrait-2.jpg`, `portrait-3.jpg` | 3:4 (potret) |
| Galeri Lanskap #1–#3 | `assets/images/landscape/landscape-1.jpg`, `landscape-2.jpg`, `landscape-3.jpg` | 16:10 (landscape) |

> Selama belum ada file di path tersebut, halaman otomatis menampilkan kotak
> placeholder bergaya putus-putus berwarna biru berisi nama file yang
> dibutuhkan — jadi tampilan tetap rapi sebelum Anda menambahkan foto asli.

**Ingin pakai format `.png` atau `.webp`?** Cukup ubah ekstensi pada atribut
`src="..."` di `index.html` sesuai nama file Anda (gunakan Ctrl+F untuk
mencari nama file di atas).

## Cara Mengganti Dokumen PDF

Letakkan 3 berkas PDF Anda di folder `assets/pdfs/` dengan nama:

- `document-1.pdf` → ditampilkan sebagai "Curriculum Vitae"
- `document-2.pdf` → ditampilkan sebagai "Portofolio Cetak"
- `document-3.pdf` → ditampilkan sebagai "Sertifikat & Penghargaan"

Begitu file diunggah dengan nama yang sama, pratinjau halaman pertama PDF akan
otomatis muncul di kartu masing-masing (lengkap dengan tombol "Buka Tab Baru"
dan "Unduh"). Judul dan deskripsi tiap dokumen bisa diganti di `index.html`
pada bagian `<section class="docs-section" id="dokumen">`.

## Mengedit Teks

Buka `index.html` dengan editor teks apa pun, lalu cari komentar
`<!-- GANTI: ... -->` — komentar ini menandai bagian yang sebaiknya Anda isi
dengan data Anda sendiri, antara lain:

- Nama (judul halaman, navbar, hero, footer)
- Deskripsi singkat & paragraf "Tentang Saya"
- Daftar keahlian pada teks berjalan (marquee)
- Judul & deskripsi tiap foto / dokumen
- Alamat email dan tautan media sosial (Instagram, LinkedIn, GitHub)

## Menjalankan Secara Lokal

Cukup buka `index.html` langsung di browser, atau jalankan server statis
sederhana (disarankan agar fitur pratinjau PDF berjalan optimal):

```bash
# Python
python -m http.server 5500

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:5500`.

## Menerbitkan via GitHub Pages

1. Push seluruh folder ini ke repository GitHub Anda.
2. Buka **Settings → Pages** pada repository.
3. Pilih branch (misalnya `main`) dan folder root (`/`), lalu simpan.
4. Situs akan aktif di `https://<username>.github.io/<nama-repo>/`.

Setiap kali Anda mengganti foto/PDF atau mengedit teks lalu push ke GitHub,
situs akan otomatis ter-update dalam beberapa menit — tidak perlu proses
build apa pun.

## Catatan Teknis

- Font **Fraunces** (judul) dan **Inter** (teks) dimuat dari Google Fonts —
  butuh koneksi internet saat halaman dibuka.
- Semua animasi menghormati pengaturan sistem **"Reduce Motion"** — akan
  otomatis non-aktif/statis bagi pengguna yang mengaktifkannya.
- Tidak ada dependensi eksternal (tanpa framework, tanpa library JS) selain
  font — seluruh interaksi ditulis di `js/script.js` murni vanilla JS.
