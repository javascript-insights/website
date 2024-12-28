window.addEventListener("load", function () {

    document.getElementById('loadData').addEventListener('click', () => {
        fetchData();
    });

    function fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const dataDiv = document.getElementById('data');
                dataDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});