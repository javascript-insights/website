window.addEventListener("load", function () {

    // fetch window.location.href button
    ///////////////////////////////////////////////////////////////////////////
    document.getElementById('fetchButton').addEventListener('click', async () => {
        fetch(window.location.href)
            .then(response => {
                if (!response.ok) throw Error('Fetch failed');
                console.log('Fetch successfully');
            })
            .catch(err => {
                console.error('Fetch failed:', err);
            })
    });
});
