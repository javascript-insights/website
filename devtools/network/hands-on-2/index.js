window.addEventListener("load", function () {
    document.getElementById('fetchData1').addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error('Error: ' + error);
            });
    });

    document.getElementById('fetchData2').addEventListener('click', () => {
        fetch('https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error('Error: ' + error);
            });
    });

    document.getElementById('fetchData3').addEventListener('click', () => {
        fetch('https://api.publicapis.org/entries')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error('Error: ' + error);
            });
    });
});