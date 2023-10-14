document.addEventListener('DOMContentLoaded', async function (){
    const fileTugas = document.getElementById('fileTugas')

    function idInstruksiFromURL() {
        const url = window.location.href;
        const idRegex =/\/reviewTugasView\/(\d+)\/\d+/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }
    function idAwardeeFromURL() {
        const url = window.location.href;
        const idRegex = /\/reviewTugasView\/\d+\/(\d+)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }
    const id_instruksi = idInstruksiFromURL()
    const id_awardee = idAwardeeFromURL()
   
    const response = await fetch (`/reviewTugas/${id_instruksi}/${id_awardee}`, {
        method: 'GET'
    })
    const data = await response.json()
    if (data.success) {
        const file = document.getElementById('fileTugas')
        file.setAttribute('src', `/doc/tugas/${data.namaFile}`)
        
        const judul = document.getElementById('judul')
        judul.textContent = `${data.judul}`
    } else {
        Swal.fire({
            icon: 'error',
            title: `${data.message}`,
        })
    }

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

    const btnLogout = document.getElementById('btn-logout');
      btnLogout.addEventListener('click', async function (event) {
        event.preventDefault()

        // Buat elemen form sementara
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'logout';

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name =
          '_csrf'; 
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

    
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