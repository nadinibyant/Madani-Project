document.addEventListener('DOMContentLoaded', async function () {

    function idInstruksiFromURL() {
        const url = window.location.href;
        const idRegex = /\/tugasAwardee\/(.*)/;
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



    const tugasAwardee = await fetch(`/allTugasAwardee/${id_instruksi}`, {
        method: 'GET'
    })
    const dataTugasAwardee = await tugasAwardee.json()
    console.log(dataTugasAwardee)
    if (dataTugasAwardee.success) {
        const tbody = document.getElementById('tabelBody')
        for (let index = 0; index < dataTugasAwardee.file_pengumpulan.length; index++) {

            const tr = document.createElement('tr')
            const no = document.createElement('td')
            const nama = document.createElement('td')
            const dokumen = document.createElement('td')
            const tanggal = document.createElement('td')
            const action = document.createElement('td')

            const div1 = document.createElement('div')
            const div2 = document.createElement('div')
            const div3 = document.createElement('div')
            const div4 = document.createElement('div')

            const a1 = document.createElement('a')
            const a2 = document.createElement('a')

            const img1 = document.createElement('img')
            const img2 = document.createElement('img')

            tbody.appendChild(tr)

            tr.appendChild(no)
            no.textContent = index + 1

            tr.appendChild(nama)
            nama.textContent = `${dataTugasAwardee.nama_lengkap[index]}`

            tr.appendChild(dokumen)
            dokumen.textContent = `${dataTugasAwardee.file_pengumpulan[index]}`

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
            const created = dataTugasAwardee.created_at[index];
            const formattedDate = formatDate(created);

            tr.appendChild(tanggal)
            tanggal.textContent = `${formattedDate}`

            tr.appendChild(action)
            action.appendChild(div1)
            div1.classList.add('container')
            div1.appendChild(div2)
            div2.classList.add('row', 'align-items-start')
            div2.appendChild(div3)
            div3.classList.add('col', 'text-end')
            div3.appendChild(a1)
            a1.classList.add('btn-done')


            a1.appendChild(img1)
            a1.setAttribute('status', `${dataTugasAwardee.status[index]}`)
            img1.setAttribute('src', '/img/check.png')
            img1.classList.add('img-fluid', 'w-50')
            const status = a1.getAttribute('status')
            

            div2.appendChild(div4)
            div4.classList.add('col', 'text-start')
            div4.appendChild(a2)
            a2.classList.add('btn-info')
            a2.appendChild(img2)
            a2.setAttribute('id', `${dataTugasAwardee.id_awardee[index]}`)
            img2.setAttribute('src', '/img/information.png')
            img2.classList.add('img-fluid', 'w-50')

            if (status == 'selesai') {
                a1.remove()
                img1.remove()
            } 
        
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: `${dataTugasAwardee.message}`,
        })
    }

    const btnDone = document.getElementsByClassName('btn-done')
    for (let index = 0; index < btnDone.length; index++) {
        btnDone[index].addEventListener('click', async () => {
            const doneTugas = await fetch(`/doneTugas/${id_instruksi}/${dataTugasAwardee.id_awardee[index]}`, {
                method: 'POST'
            })
            const dataDone = await doneTugas.json()
            if (dataDone.success) {
                Swal.fire({
                    icon: 'success',
                    title: `${dataDone.message}`,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: `${dataDone.message}`,
                })
            }
        })

    }

    const btnInfo = document.getElementsByClassName('btn-info')
    console.log(btnInfo)
    for (let index = 0; index < btnInfo.length; index++) {
        btnInfo[index].addEventListener('click', async () => {
            window.location.href = `/reviewTugasView/${id_instruksi}/${dataTugasAwardee.id_awardee[index]}`
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
})