document.addEventListener('DOMContentLoaded', async function (){
    function idInstruksiFromURL() {
        const url = window.location.href;
        const regex = /\/editInstruksi\/(.+)$/;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1];
        } else {
            return null; 
        }
    }

    const id_instruksi = idInstruksiFromURL()
    
    const response = await fetch(`/detailDataPenugasan/${id_instruksi}`,{
        method: 'GET'
    })
    const data = await response.json()
    if (data.success) {
        console.log(data.data)
        const nama_mentor = document.getElementById('nama_mentor')
        nama_mentor.setAttribute('value', `${data.data.nama_mentor}`)

        const judul_materi = document.getElementById('judul_materi')
        judul_materi.setAttribute('value', `${data.data.judul_materi}`)

        const deskripsi_materi = document.getElementById('deskripsi_materi')
        deskripsi_materi.textContent = `${data.data.deskripsi_materi}`

        const deskripsi_tugas = document.getElementById('deskripsi_tugas')
        deskripsi_tugas.textContent = `${data.data.deskripsi_tugas}`

        const tanggalTugas = data.data.tenggat_tugas
        const formattedDateTime = tanggalTugas.slice(0, 16)
        const tenggat_tugas = document.getElementById('tenggat_tugas')
        tenggat_tugas.setAttribute('value', `${formattedDateTime}`)

        const btnBatal = document.getElementById('btn-batal')
        btnBatal.setAttribute('href', `/detailInstruksi/${id_instruksi}`)
    } else {
        console.log(data.data)
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const nama_mentor = document.getElementById('nama_mentor').value
        const judul_materi = document.getElementById('judul_materi').value
        const deskripsi_materi = document.getElementById('deskripsi_materi').value
        const deskripsi_tugas = document.getElementById('deskripsi_tugas').value
        const tenggat_tugas = document.getElementById('tenggat_tugas').value
        const file_materi = document.getElementById('file_materi')

        const formData = new FormData();
        formData.append('nama_mentor', nama_mentor)
        formData.append('judul_materi', judul_materi)
        formData.append('deskripsi_materi', deskripsi_materi)
        formData.append('deskripsi_tugas', deskripsi_tugas)
        formData.append('tenggat_tugas', tenggat_tugas)
        formData.append('file', file_materi.files[0]);


        const editInstruksi = await fetch(`/editInstruksiData/${id_instruksi}`, {
            method: 'POST',
            body: formData
        })
        const dataUpdate = await editInstruksi.json()
        if (dataUpdate.success) {
            Swal.fire({
                icon: 'success',
                title: `${dataUpdate.message}`,
            })
            setTimeout(() => {
                window.location.href = `/detailInstruksi/${id_instruksi}`
            }, 3000);
        } else {
            Swal.fire({
                icon: 'error',
                title: `${dataUpdate.message}`,
            })
        }

    
    })

    const responseUsername = await fetch('/getNama', {
        method: 'GET'
    })
    const dataUsername = await responseUsername.json()
    if (dataUsername.success) {
        const nama = dataUsername.nama_admin
        console.log(nama)
        const usernameProfile = document.getElementById('usernameProfile')
        usernameProfile.textContent = `${nama}`
    } else {
        window.location.href = '/login'
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