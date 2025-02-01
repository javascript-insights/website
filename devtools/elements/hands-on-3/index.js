document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.window').forEach(window => {
        window.addEventListener('dragstart', dragStart);
        window.addEventListener('dragend', dragEnd);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.visibility = 'hidden';
        }, 0);
    }

    function dragEnd(e) {
        e.target.style.visibility = 'visible';
    }

    document.addEventListener('dragover', e => {
        e.preventDefault();
    });

    document.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropX = e.clientX - draggableElement.offsetWidth / 2;
        const dropY = e.clientY - draggableElement.offsetHeight / 2;
        draggableElement.style.left = `${dropX}px`;
        draggableElement.style.top = `${dropY}px`;
    });


});
