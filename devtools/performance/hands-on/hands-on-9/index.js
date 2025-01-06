window.addEventListener("load", function () {

    document.getElementById('clickButton').addEventListener('click', () => {
        console.log('Button clicked!');
    });

    document.getElementById('textInput').addEventListener('input', (event) => {
        console.log('Input changed: ', event.target.value);
    });

    document.getElementById('loadDataButton').addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const dataContainer = document.getElementById('dataContainer');
                dataContainer.innerHTML = data.map(post => `<p>${post.title}</p>`).join('');
            });
    });
});