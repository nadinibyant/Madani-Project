document.addEventListener('DOMContentLoaded', async function () {
    const responseUsername = await fetch('/getNamaAwardee', {
        method: 'GET'
    })
    const dataUsername = await responseUsername.json()
    if (dataUsername.success) {
        const nama = dataUsername.nama_awardee
        const usernameProfile = document.getElementById('usernameProfile')
        usernameProfile.textContent = `${nama}`
    } else {
        window.location.href = '/login'
    }

    function idPengumpulanFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailSelesaiView\/\d+\/(\d+)\/\d+/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }

    function idInstruksiFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailSelesaiView\/(\d+)\/\d+\/\d+/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }

    function idAwrdeeFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailSelesaiView\/\d+\/\d+\/(\d+)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }
    const id_instruksi = idInstruksiFromURL()
    const id_pengumpulan = idPengumpulanFromURL()
    const id_awardee = idAwrdeeFromURL()

    const dataDetail = await fetch(`/detailSelesai/${id_instruksi}/${id_pengumpulan}/${id_awardee}`, {
        method: 'GET'
    })
    const responseDetail = await dataDetail.json()
    if (responseDetail.success == true && responseDetail.disable == true) {
        console.log(responseDetail)

        const judulMateri = document.getElementById('judul_materi')
        judulMateri.textContent = `${responseDetail.instruksi.judul_materi}`

        const dateTimeString = `${responseDetail.instruksi.created_at}`;
        const dateObj = new Date(dateTimeString);

        // Array nama bulan
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Mendapatkan hari
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

        // Mendapatkan tanggal, bulan, dan tahun
        const day = dateObj.getUTCDate();
        const month = monthNames[dateObj.getUTCMonth()]; // Menggunakan nama bulan
        const year = dateObj.getUTCFullYear();

        // Menggabungkan hasil ke dalam format yang diinginkan
        const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

        const mentorCreate = document.getElementById('mentor_create')
        mentorCreate.textContent = `${responseDetail.instruksi.nama_mentor} | ${formattedDate}`

        const deskripsiMateri = document.getElementById('deskripsi_materi')
        deskripsiMateri.textContent = `${responseDetail.instruksi.deskripsi_materi}`

        const judulReferensi = document.getElementById('judul_referensi')
        judulReferensi.textContent = `${responseDetail.instruksi.judul_materi}`

        const nama_file = document.getElementById('namaFile')
        nama_file.textContent = `${responseDetail.instruksi.file_materi}`
        nama_file.setAttribute('href', `/materi/${responseDetail.instruksi.file_materi}`)

        const status = document.getElementById('status')
        status.textContent = `Diserahkan`

        const dateTimeString2 = `${responseDetail.instruksi.tenggat_tugas}`;
        const dateObj2 = new Date(dateTimeString2);

        // Array nama bulan
        const monthNames2 = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Mendapatkan hari
        const daysOfWeek2 = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayOfWeek2 = daysOfWeek2[dateObj2.getUTCDay()];

        // Mendapatkan tanggal, bulan, dan tahun
        const day2 = dateObj2.getUTCDate();
        const month2 = monthNames2[dateObj2.getUTCMonth()]; // Menggunakan nama bulan
        const year2 = dateObj2.getUTCFullYear();

        // Menggabungkan hasil ke dalam format yang diinginkan
        const formattedDate2 = `${dayOfWeek2}, ${day2} ${month2} ${year2}`;

        const tenggat = document.getElementById('tenggat')
        tenggat.textContent = `Tenggat: ${formattedDate2}`

        const deskripsi_tugas = document.getElementById('deskripsi_tugas')
        deskripsi_tugas.textContent = `${responseDetail.instruksi.deskripsi_tugas}`

        const file = document.getElementById('fileTugas')
        file.textContent = `${responseDetail.pengumpulan.file_pengumpulan}`

        const btnHapus = document.getElementById('btn-hapus')
        btnHapus.setAttribute('disabled', 'true')

    } else if (responseDetail.success == true && responseDetail.disable == false) {
        
        const judulMateri = document.getElementById('judul_materi')
        judulMateri.textContent = `${responseDetail.instruksi.judul_materi}`

        const dateTimeString = `${responseDetail.instruksi.created_at}`;
        const dateObj = new Date(dateTimeString);

        // Array nama bulan
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Mendapatkan hari
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

        // Mendapatkan tanggal, bulan, dan tahun
        const day = dateObj.getUTCDate();
        const month = monthNames[dateObj.getUTCMonth()]; // Menggunakan nama bulan
        const year = dateObj.getUTCFullYear();

        // Menggabungkan hasil ke dalam format yang diinginkan
        const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

        const mentorCreate = document.getElementById('mentor_create')
        mentorCreate.textContent = `${responseDetail.instruksi.nama_mentor} | ${formattedDate}`

        const deskripsiMateri = document.getElementById('deskripsi_materi')
        deskripsiMateri.textContent = `${responseDetail.instruksi.deskripsi_materi}`

        const judulReferensi = document.getElementById('judul_referensi')
        judulReferensi.textContent = `${responseDetail.instruksi.judul_materi}`

        const nama_file = document.getElementById('namaFile')
        nama_file.textContent = `${responseDetail.instruksi.file_materi}`
        nama_file.setAttribute('href', `/materi/${responseDetail.instruksi.file_materi}`)

        const status = document.getElementById('status')
        status.textContent = `Diserahkan`

        const dateTimeString2 = `${responseDetail.instruksi.tenggat_tugas}`;
        const dateObj2 = new Date(dateTimeString2);

        // Array nama bulan
        const monthNames2 = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Mendapatkan hari
        const daysOfWeek2 = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayOfWeek2 = daysOfWeek2[dateObj2.getUTCDay()];

        // Mendapatkan tanggal, bulan, dan tahun
        const day2 = dateObj2.getUTCDate();
        const month2 = monthNames2[dateObj2.getUTCMonth()]; // Menggunakan nama bulan
        const year2 = dateObj2.getUTCFullYear();

        // Menggabungkan hasil ke dalam format yang diinginkan
        const formattedDate2 = `${dayOfWeek2}, ${day2} ${month2} ${year2}`;

        const tenggat = document.getElementById('tenggat')
        tenggat.textContent = `Tenggat: ${formattedDate2}`

        const deskripsi_tugas = document.getElementById('deskripsi_tugas')
        deskripsi_tugas.textContent = `${responseDetail.instruksi.deskripsi_tugas}`

        const file = document.getElementById('fileTugas')
        file.textContent = `${responseDetail.pengumpulan.file_pengumpulan}`
    } else {
        Swal.fire({
            icon: 'error',
            title: `${responseDetail.message}`,
        })
    }

    const response = await fetch(`/reviewTugas/${id_instruksi}/${id_awardee}`, {
        method: 'GET'
    })
    const data = await response.json()
    if (data.success) {


    } else {
        Swal.fire({
            icon: 'error',
            title: `${data.message}`,
        })
    }

    const btnHapus = document.getElementById('btn-hapus')
    btnHapus.addEventListener('click', async function () {
        const deleted = await fetch(`/deleteTugas/${id_pengumpulan}`, {
            method: 'GET'
        })
        const data = await deleted.json()
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: `${data.message}`,
            })

            setTimeout(() => {
                window.location.href = '/penugasanSelesai'
            }, 3000);

        } else {
            Swal.fire({
                icon: 'error',
                title: `${data.message}`,
            })
        }
    })

    const btnLogout = document.getElementById('btn-logout');
      btnLogout.addEventListener('click', async function (event) {
        event.preventDefault()

        // Buat elemen form sementara
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'logout';

        // Tambahkan elemen input yang diperlukan untuk mengirim permintaan POST
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name =
          '_csrf'; // Ubah sesuai dengan nama input yang digunakan di sisi server
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        // Tambahkan form ke body dan submit secara otomatis
        document.body.appendChild(form);
        form.submit();

        try {
          const response = await fetch('/logout', {
            method: 'POST'
          });
          const data = await response.json();

          if (data.success) {
            window.location.href = '/login';
          } else {
            console.log(data.message);
            location.reload()
          }
        } catch (error) {
          console.log(error);
        }
      })


})