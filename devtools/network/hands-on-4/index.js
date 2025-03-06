window.addEventListener("load", function () {

    function fetchData(url, method = 'GET') {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = 'Loading...';

        fetch(url, {
            method: method
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                resultDiv.textContent = `Successfully fetched. Data: ${data}`;
            })
            .catch(error => {
                resultDiv.textContent = `CORS Error: ${error.message}`;
            });
    }

    const domain = 'https://javascript-insights-server-azf4hfbxetbnd4gy.israelcentral-01.azurewebsites.net';

    document.getElementById('fetch0').addEventListener('click', () => fetchData(domain + '/cors/allow-all'));
    document.getElementById('fetch1').addEventListener('click', () => fetchData(domain + '/cors/specific-origin'));
    document.getElementById('fetch2').addEventListener('click', () => fetchData(domain + '/cors/allow-methods'));
    document.getElementById('fetch3').addEventListener('click', () => fetchData(domain + '/cors/allow-methods', 'PUT'));
    document.getElementById('fetch4').addEventListener('click', () => fetchData(domain + '/cors/with-credentials'));
    document.getElementById('fetch5').addEventListener('click', () => fetchData(domain + '/cors/custom-headers'));
    document.getElementById('fetch6').addEventListener('click', () => fetchData(domain + '/cors/max-age'));
    document.getElementById('fetch7').addEventListener('click', () => fetchData(domain + '/cors/preflight', 'OPTIONS'));
    document.getElementById('fetch8').addEventListener('click', () => fetchData(domain + '/cors/preflight', 'POST'));
});