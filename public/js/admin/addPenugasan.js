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

        const response = await fetch('/addPenugasan', {
            method:'POST',
            body: formData
        })
        const data = await response.json()
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: `${data.message}`
              })

              setTimeout(() => {
                window.location.href = '/penugasanAdmin'
              }, 3000);

            
        } else {
            Swal.fire({
                icon: 'error',
                title: `${data.message}`
              })

              setTimeout(() => {
                window.location.reload()
              }, 3000);
            
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