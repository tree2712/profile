# My Little Corner

Website profil pribadi bertema hitam-putih. Pengunjung bisa melihat profil, hobi, video, lagu, catatan, rekomendasi buku, dan tautan sosial. Foto, wallpaper, dan video hanya bisa diganti lewat file website di VS Code.

## Menambahkan foto dan video

Buka folder `profile-pribadi` di VS Code. Di panel Explorer, buka folder `media`. Salin media milikmu ke sana dan gunakan nama file berikut:

| File | Dipakai untuk |
| --- | --- |
| `avatar.jpg` | Foto profil bulat |
| `profile-wallpaper.jpg` | Gambar banner di belakang profil |
| `background-wallpaper.mp4` | Video latar seluruh halaman |
| `my-video.mp4` | Video yang diputar di TV retro |
| `favorite-song.mp3` | Lagu di pemutar musik |

Kalau nama atau ekstensi file berbeda, buka `index.html` dan cari nama file lama—misalnya `media/avatar.jpg`—lalu ganti dengan nama file barumu. Komentar di dekat setiap baris media juga menandai kegunaannya. Untuk foto profil dan banner, format JPG paling mudah; video MP4.

Banner profil juga mendukung video: di `index.html`, cari komentar `WALLPAPER DI BELAKANG KARTU PROFIL`. Ganti akhiran `.jpg` pada baris gambar menjadi `.mp4` dan pastikan nama file cocok dengan `media/profile-wallpaper.mp4`.

## Mengubah isi profil

Di `index.html`, cari teks dalam tanda kurung siku seperti `[Nama Kamu]`, `[username]`, dan `[Hobi pertama]`, lalu ganti dengan isi milikmu. Ganti juga tautan contoh `YOUR_USER_ID`, `YOUR_STEAM_ID`, dan `YOUR_USERNAME` dengan tautan akunmu. Ubah judul video, detail buku, catatan, dan teks lainnya di bagian yang sama.

Jangan hapus tag `<source>` media jika ingin pemutarannya tetap bekerja. Tombol di halaman hanya untuk interaksi seperti play/pause, kontrol TV, dan kejutan kecil; tidak ada menu pengunjung untuk mengganti foto atau wallpaper.
