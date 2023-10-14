document.addEventListener('DOMContentLoaded', async function () {
    const file = document.getElementById('pdf-viewer')

    function idFileFromURL() {
        const url = window.location.href;
        const regex = /\/materi\/(.+)$/;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1];
        } else {
            return null; 
        }
    }

    const file_materi = idFileFromURL()
    file.setAttribute('src', `/doc/materi/${file_materi}`)

})