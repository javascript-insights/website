document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showHidden').addEventListener('click', () => {
        document.getElementById('hiddenDiv').style.display = 'block';
    });

    document.getElementById('textInput').addEventListener('input', (event) => {
        console.log('Input value:', event.target.value);
    });
});

// Example of unused JavaScript
function unusedFunction() {
    console.log('This function is not used.');
}

function showNextHint() {
    const hints = document.querySelectorAll('.hint.hidden');
    if (hints.length > 0) {
        hints[0].classList.remove('hidden');
    }
}