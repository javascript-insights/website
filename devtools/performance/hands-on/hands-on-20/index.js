

function loop(x) {
    if (x >= 1000000000) return;
    loop(x + 1);
}

function showHint() {
    document.getElementById('hintText').style.display = 'block';
}