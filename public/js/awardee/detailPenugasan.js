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

    function idInstruksiFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailPenugasan\/(.*)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }
    const id_instruksi = idInstruksiFromURL()

    const response = await fetch(`/getDetailPenugasan/${id_instruksi}`, {
        method: 'GET'
    })
    const data = await response.json()
    if (data.success) {
        console.log(data.data)

        const judulMateri = document.getElementById('judul_materi')
        judulMateri.textContent = `${data.data.judul_materi}`

        const dateTimeString = `${data.data.created_at}`;
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
        mentorCreate.textContent = `${data.data.nama_mentor} | ${formattedDate}`

        const deskripsiMateri = document.getElementById('deskripsi_materi')
        deskripsiMateri.textContent = `${data.data.deskripsi_materi}`

        const judulReferensi = document.getElementById('judul_referensi')
        judulReferensi.textContent = `${data.data.judul_materi}`

        const nama_file = document.getElementById('namaFile')
        nama_file.textContent = `${data.data.file_materi}`
        nama_file.setAttribute('href', `/materi/${data.data.file_materi}`)

        const status = document.getElementById('status')
        status.textContent = `${data.status}`

        if (data.data.tenggat_tugas == null) {
            const tenggat = document.getElementById('tenggat')
            tenggat.textContent = `Tenggat: -`

            const btnKirim = document.getElementById('btn-kirim')
            btnKirim.disabled = true

        } else {
            const dateTimeString2 = `${data.data.tenggat_tugas}`;
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
        }

        const deskripsi_tugas = document.getElementById('deskripsi_tugas')
        deskripsi_tugas.textContent = `${data.data.deskripsi_tugas}`


    } else {
        Swal.fire({
            icon: 'error',
            title: `${data.data.message}`,
        })
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', async function (event) {
        event.preventDefault()

        const file_pengumpulan = document.getElementById('file_pengumpulan')
        const formData = new FormData()
        formData.append('file', file_pengumpulan.files[0])


        const submitTugas = await fetch(`/submitPenugasan/${id_instruksi}`, {
            method: 'POST',
            body: formData
        })

        const responseSubmit = await submitTugas.json()
        if (responseSubmit.success) {
            Swal.fire({
                icon: 'success',
                title: `${responseSubmit.message}`,
            })
            setTimeout(() => {
                window.location.href = '/ditugaskan'
            }, 3000);
        } else {
            Swal.fire({
                icon: 'error',
                title: `${responseSubmit.message}`,
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