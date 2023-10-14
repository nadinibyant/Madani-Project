const form = document.querySelector('form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    console.log(email)
    console.log(password)

    const formData = new FormData(form)
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()
    if (data.success && data.role == 'admin') {
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
            icon: 'success',
            title: data.message
        })
        setTimeout(() => {
            window.location.href = '/penugasanAdmin'
        }, 3000);

    } else if (data.success && data.role == 'awardee') {
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
            icon: 'success',
            title: data.message
        })
        setTimeout(() => {
            window.location.href = '/ditugaskan'
        }, 3000);
        
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

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
})