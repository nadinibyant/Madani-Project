-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Okt 2023 pada 03.54
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_madani`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nama_admin` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `nama_admin`, `jenis_kelamin`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'tsabithah', ' perempuan', 'tsabithah@gmail.com', 'tsabithah1234', '2023-10-02 14:48:23', '2023-10-02 14:48:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `awardee`
--

CREATE TABLE `awardee` (
  `id_awardee` int(11) NOT NULL,
  `nomor_penerimaan` varchar(50) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `awardee`
--

INSERT INTO `awardee` (`id_awardee`, `nomor_penerimaan`, `nama_lengkap`, `jenis_kelamin`, `tanggal_lahir`, `no_telp`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, '12345', 'John Doe', 'Laki-laki', '1990-02-15', '08123456789', 'johndoe@gmail.com', 'P@ssw0rd123', '2023-10-02 14:50:52', '2023-10-02 14:50:52'),
(2, '67890', 'Jane Smith', ' Perempuan', '1985-05-25', '08567891234', 'janesmith@gmail.com', 'SecurePassword', '2023-10-02 14:50:52', '2023-10-02 14:50:52'),
(3, '54321', 'Michael Johnson', 'Laki-laki', '1995-10-10', '08765432100', 'michael@gmail.com', 'MyP@ss123', '2023-10-02 14:52:53', '2023-10-02 14:52:53'),
(4, '98765', 'Sarah Williams', 'Perempuan', '1988-07-08', '08109876543', 'sarahw@gmail.com', 'Secure12345', '2023-10-02 14:52:53', '2023-10-02 14:52:53'),
(5, '24680', ' David Brown', ' Laki-laki', '1992-03-20', '08234567812', 'davidb@gmail.com', 'BrownDav@123', '2023-10-02 14:53:45', '2023-10-02 14:53:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `instruksi_tugas`
--

CREATE TABLE `instruksi_tugas` (
  `id_instruksi` int(11) NOT NULL,
  `nama_mentor` varchar(50) NOT NULL,
  `judul_materi` varchar(255) NOT NULL,
  `deskripsi_tugas` longtext DEFAULT NULL,
  `deskripsi_materi` longtext DEFAULT NULL,
  `file_materi` varchar(255) DEFAULT NULL,
  `tenggat_tugas` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tugas_awardee`
--

CREATE TABLE `tugas_awardee` (
  `id_pengumpulan` int(11) NOT NULL,
  `id_instruksi` int(11) NOT NULL,
  `id_awardee` int(11) NOT NULL,
  `file_pengumpulan` varchar(255) NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `awardee`
--
ALTER TABLE `awardee`
  ADD PRIMARY KEY (`id_awardee`);

--
-- Indeks untuk tabel `instruksi_tugas`
--
ALTER TABLE `instruksi_tugas`
  ADD PRIMARY KEY (`id_instruksi`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indeks untuk tabel `tugas_awardee`
--
ALTER TABLE `tugas_awardee`
  ADD PRIMARY KEY (`id_pengumpulan`),
  ADD KEY `id_instruksi` (`id_instruksi`),
  ADD KEY `id_awardee` (`id_awardee`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `awardee`
--
ALTER TABLE `awardee`
  MODIFY `id_awardee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `instruksi_tugas`
--
ALTER TABLE `instruksi_tugas`
  MODIFY `id_instruksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tugas_awardee`
--
ALTER TABLE `tugas_awardee`
  MODIFY `id_pengumpulan` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `instruksi_tugas`
--
ALTER TABLE `instruksi_tugas`
  ADD CONSTRAINT `instruksi_tugas_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tugas_awardee`
--
ALTER TABLE `tugas_awardee`
  ADD CONSTRAINT `tugas_awardee_ibfk_1` FOREIGN KEY (`id_instruksi`) REFERENCES `instruksi_tugas` (`id_instruksi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tugas_awardee_ibfk_2` FOREIGN KEY (`id_awardee`) REFERENCES `awardee` (`id_awardee`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
