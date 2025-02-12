document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('startGame').addEventListener('click', function () {
        // Create a buffer array to store the hidden key
        const encodedKey = 'c2VjcmV0S2V5MTIz';
        const buffer = new ArrayBuffer(atob(encodedKey).length);
        const view = new Uint32Array(buffer);
        for (let i = 0; i < atob(encodedKey).length; i++) {
            view[i] = atob(encodedKey).charCodeAt(i);
        }
        console.log('Buffer created with hidden key.');
    });

});

