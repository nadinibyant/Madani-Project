document.addEventListener('DOMContentLoaded', async function () {
    const responseUsername = await fetch('/getNama', {
        method: 'GET'
    })
    const dataUsername = await responseUsername.json()
    if (dataUsername.success) {
        const nama = dataUsername.nama_admin
        const usernameProfile = document.getElementById('usernameProfile')
        usernameProfile.textContent = `${nama}`
    } else {
        window.location.href = '/login'
    }

    function idInstruksiFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailInstruksi\/(.*)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }

    const id_instruksi = idInstruksiFromURL()

    const btnInstruksi = document.getElementById('btn-instruksi')
    btnInstruksi.setAttribute('href', `/detailInstruksi/${id_instruksi}`)

    const btnTugas = document.getElementById('btn-tugas')
    btnTugas.setAttribute('href', `/tugasAwardee/${id_instruksi}`)

    const detailInstruksi = await fetch(`/detailDataPenugasan/${id_instruksi}`, {
        method: 'GET'
    })
    const dataDetailInstruksi = await detailInstruksi.json()
    if (dataDetailInstruksi.success) {
        console.log(dataDetailInstruksi.data)

        const judul = document.getElementById('judul')
        judul.textContent = `${dataDetailInstruksi.data.judul_materi}`

        function formatDate(inputDate) {
            const date = new Date(inputDate);
            const day = date.getDate();
            const month = date.toLocaleString('default', {
                month: 'short'
            });
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day} -${month} -${year}, ${hours}:${minutes}`;
        }
        const created = dataDetailInstruksi.data.created_at;
        const formattedDate = formatDate(created);

        const mentor_create = document.getElementById('mentor')
        mentor_create.textContent = `${dataDetailInstruksi.data.nama_mentor} | ${formattedDate}`

        const deskripsiMateri = document.getElementById('deskripsiMateri')
        deskripsiMateri.textContent = `${dataDetailInstruksi.data.deskripsi_materi}`

        const judul_referensi = document.getElementById('judul_referensi')
        judul_referensi.textContent = `${dataDetailInstruksi.data.judul_materi}`

        const nama_file = document.getElementById('namaFile')
        nama_file.textContent = `${dataDetailInstruksi.data.file_materi}`
        nama_file.setAttribute('href', `/materi/${dataDetailInstruksi.data.file_materi}`)

        const tenggaDate = dataDetailInstruksi.data.tenggat_tugas;
        const formattedTenggat = formatDate(tenggaDate);

        const tenggat = document.getElementById('tenggat')
        if (dataDetailInstruksi.data.tenggat_tugas == null) {
          tenggat.textContent = `Tenggat : -`
        } else {
          tenggat.textContent = `Tenggat : ${formattedTenggat}`
        }
        

        const deskripsiTugas = document.getElementById('deskripsiTugas')
        deskripsiTugas.textContent = `${dataDetailInstruksi.data.deskripsi_tugas}`

        const btnDetail = document.getElementById('btn-detail')
        btnDetail.setAttribute('href', `/editInstruksi/${id_instruksi}`)
    } else {
        console.log(dataDetailInstruksi.data)
    }

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