document.addEventListener('DOMContentLoaded', async function (){
    const response = await fetch ('/allDataPenugasanAdmin', {
        method: 'GET'
    })
    const data = await response.json()
    if (data.success) {
        const dataPenugasan = data.data

        const task = document.getElementById('task')
        for (let index = 0; index < dataPenugasan.length; index++) {
            const div1 = document.createElement('div')
            div1.classList.add('card', 'w-80', 'mt-3', 'me-4', 'ms-4', 'mb-3')

            const div2 = document.createElement('div')
            div2.classList.add('card-body')

            const div3 = document.createElement('div')
            div3.classList.add('container')

            const div4 = document.createElement('div')
            div4.classList.add('row')

            const div5 = document.createElement('div')
            div5.classList.add('col', 'fw-semibold', 'text-start')

            const judul = document.createElement('p')

            const btnDetail = document.createElement('button')
            btnDetail.classList.add('btn', 'btn-warning', 'text-white', 'btn-detail')
            btnDetail.setAttribute('type', 'button')
            btnDetail.setAttribute('id_instruksi', `${data.id_instruksi[index]}`)

            const div6 = document.createElement('div')
            div6.classList.add('col', 'fw-semibold', 'text-end')

            task.appendChild(div1)
            div1.appendChild(div2)
            div2.appendChild(div3)
            div3.appendChild(div4)
            div4.appendChild(div5)
            div4.appendChild(div6)
            div5.appendChild(judul)
            div5.appendChild(btnDetail)

            const dateTimeString = `${data.data[index].created_at}`;
            const dateObj = new Date(dateTimeString);

        
            const monthNames = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];

            
            const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

         
            const day = dateObj.getUTCDate();
            const month = monthNames[dateObj.getUTCMonth()]; 
            const year = dateObj.getUTCFullYear();

    
            const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

            judul.textContent = `${data.data[index].judul_materi}`
            btnDetail.textContent = 'Lihat'
            div6.textContent = `${formattedDate}`

        }
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: data.message
        })
    }

    const responseUsername = await fetch ('/getNama', {
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

    const btnDetail = document.getElementsByClassName('btn-detail')
    for (let index = 0; index < btnDetail.length; index++) {
        btnDetail[index].addEventListener('click', async function (){
            const id_instruksi = btnDetail[index].getAttribute('id_instruksi')

            const detailInstruksi = await fetch(`/detailDataPenugasan/${id_instruksi}`, {
                method: 'GET'
            })
            const dataInstruksi = await detailInstruksi.json()
            if (dataInstruksi.success) {
                window.location.href = `/detailInstruksi/${id_instruksi}`
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: dataInstruksi.message
                  })
        
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
            }            
        }) 
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