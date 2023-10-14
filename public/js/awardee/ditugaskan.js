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

  const dataDitugaskan = await fetch('/allDataDitugaskan', {
    method: 'GET'
  })
  const responseData = await dataDitugaskan.json()
  if (responseData.success) {
    const task = document.getElementById('task')
    for (let index = 0; index < responseData.results.length; index++) {
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

      const div6 = document.createElement('div')
      div6.classList.add('col', 'text-end', 'fw-semibold')

      const a1 = document.createElement('a')
      a1.classList.add('text-decoration-none')
      a1.classList.add('detail')

      task.appendChild(div1)
      div1.appendChild(div2)
      div2.appendChild(div3)
      div3.appendChild(div4)
      div4.appendChild(div5)
      div4.appendChild(div6)

      div5.appendChild(a1)
      a1.textContent = `${responseData.results[index].judul_materi}`
      a1.setAttribute('id_instruksi', `${responseData.results[index].id_instruksi}`)

      if (responseData.results[index].tenggat_tugas == '0000-00-00 00:00:00') {
        div6.textContent = `-`
      } else {
        const dateTimeString = `${responseData.results[index].tenggat_tugas}`;
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
        div6.textContent = `${formattedDate}`
      }
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: `${responseData.error}`,
    })
  }

  const btnDetail = document.getElementsByClassName('detail')
  for (let index = 0; index < btnDetail.length; index++) {
    btnDetail[index].addEventListener('mouseover', async function () {
      btnDetail[index].style.cursor = 'pointer'
    })
    btnDetail[index].addEventListener('click', async function () {
      const id_instruksi = btnDetail[index].getAttribute('id_instruksi')
      console.log(id_instruksi)
      window.location.href = `/detailPenugasan/${id_instruksi}`
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