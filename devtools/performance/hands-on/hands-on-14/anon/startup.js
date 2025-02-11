window.addEventListener("load", function () {
    console.log('startup.js loaded');
    var maxDepth = 10;

    document.addEventListener('click', function (event) {
        let element = event.target;

        // go up the DOM tree
        let depth = 0;
        while (element && depth < maxDepth) {
            doWork(element.innerHTML);
            element = element.parentElement;
            depth++;
        }
        // go down the DOM tree
        function traverseDown(element, depth) {
            if (element && depth < maxDepth) {
                doWork(element.innerHTML);
                let children = element.children;
                for (let i = 0; i < children.length; i++) {
                    traverseDown(children[i], depth + 1);
                }
            }
        }

        traverseDown(event.target, 0);

    });

    function doWork(element) {
        console.log(element.innerHTML);
    }
});