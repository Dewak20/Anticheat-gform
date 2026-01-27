# Anti-Cheating Exam System

Sistem ujian online dengan deteksi anti-curang berbasis browser dan pemantauan real-time.

## 📁 Struktur Folder

```
Anti Cheating/
├── index.html          # Halaman login SISWA
├── exam.html           # Halaman ujian (iframe Google Form + Proctor)
├── admin/
│   ├── login.html      # Halaman login GURU
│   └── dashboard.html  # Dashboard pemantauan guru
├── assets/
│   ├── css/            # Stylesheet (jika ada)
│   └── js/
│       ├── supabase-client.js  # Koneksi ke Supabase
│       └── proctor.js          # Script deteksi pelanggaran
└── docs/
    ├── supabase_schema.sql             # Schema database awal
    ├── migration_update.sql            # Update kolom baru
    └── migration_add_delete_policy.sql # Policy untuk hapus log
```

## 🚀 Cara Deploy

1. Upload semua file ke hosting Anda (folder `public_html`).
2. Pastikan `assets/js/supabase-client.js` berisi URL dan Key Supabase yang benar.
3. Jalankan semua file SQL di folder `docs/` melalui Supabase SQL Editor.

## 🔗 URL Akses

| Pengguna | URL |
|----------|-----|
| Siswa    | `https://domain-anda.com/` |
| Guru     | `https://domain-anda.com/admin/login.html` |

## ⚙️ Teknologi

- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Proctoring**: Visibility API, Resize Detection
