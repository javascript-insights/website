window.addEventListener("load", function () {

  var noButton = document.getElementById("no-button");
  noButton.addEventListener("mouseover", () => {
    noButton.setAttribute("style", `position: absolute; left: ${Math.random() * 200}px; top: ${Math.random() * 200}px`);
  });

  // prints the text to the console as  a log message
  console.log('This is a log message from Elements Theoretical');

  // prints the text to the console as an informational message
  console.info('This is some information from Elements Theoretical');

  // prints the text to the console as an error message
  console.error('This is an error from Elements Theoretical');

  // prints the text to the console as a warning
  console.warn('This is a warning from Elements Theoretical');

  // prints the geometry of the document body as an object
  console.log(document.body.getBoundingClientRect(), 'from Elements Theoretical');

  // prints the geometry of the document body as a table
  console.table(document.body.getBoundingClientRect(), 'from Elements Theoretical');

  // shows a list of techologies as a collapsed group
  let technologies = ["HTML", "CSS", "SVG", "ECMAScript"];
  console.groupCollapsed('Technolgies');
  technologies.forEach(tech => { console.info(tech); })
  console.groupEnd('Technolgies');
});