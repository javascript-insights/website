window.addEventListener("load", function () {
    document.getElementById('clickButton').addEventListener('click', () => {
        console.log('Button clicked!');
    });

    document.getElementById('textInput').addEventListener('input', (event) => {
        console.log('Input changed: ', event.target.value);
    });
});