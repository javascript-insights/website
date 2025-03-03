window.addEventListener("load", function () {
    document.getElementById('downloadSource').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = './complex-operations.js';
        link.download = 'complex-operations.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    document.getElementById('downloadSourceMap').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = './complex-operations.js.map';
        link.download = 'complex-operations.js.map';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});