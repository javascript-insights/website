document.addEventListener('DOMContentLoaded', () => {
    var spins = 0;
    setInterval(function () {
        spins = spins + 1;
        document.getElementById("spin").textContent = spins + " spin" + (spins != 1 ? "s" : "");
    }, 4205);
});