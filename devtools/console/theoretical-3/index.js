window.addEventListener("load", function () {
    // prints the text to the console as  a log message
    console.log('This is a log message from Console Theoretical 3');

    // prints the text to the console as an informational message
    console.info('This is some information from Console Theoretical 3');

    // prints the text to the console as an error message
    console.error('This is an error from Console Theoretical 3');

    // prints the text to the console as a warning
    console.warn('This is a warning from Console Theoretical 3');

    // prints the geometry of the document body as an object
    console.log(document.body.getBoundingClientRect(), 'from Console Theoretical 3');

    // prints the geometry of the document body as a table
    console.table(document.body.getBoundingClientRect(), 'from Console Theoretical 3');

    // shows a list of techologies as a collapsed group
    let technologies = ["HTML", "CSS", "SVG", "ECMAScript"];
    console.groupCollapsed('Technolgies');
    technologies.forEach(tech => { console.info(tech); })
    console.groupEnd('Technolgies');
});

