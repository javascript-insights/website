window.addEventListener("load", function () {
  // prints the text to the console as  a log message
  console.log('This is a log message from index.js');

  // prints the text to the console as an informational message
  console.info('This is some information from index.js');

  // prints the text to the console as an error message
  console.error('This is an error from index.js');

  // prints the text to the console as a warning
  console.warn('This is a warning from index.js');

  // prints the geometry of the document body as an object
  console.log(document.body.getBoundingClientRect(), 'from index.js');

  // prints the geometry of the document body as a table
  console.table(document.body.getBoundingClientRect(), 'from index.js');

  // shows a list of techologies as a collapsed group
  let technologies = ["HTML", "CSS", "SVG", "ECMAScript"];
  console.groupCollapsed('Technolgies');
  technologies.forEach(tech => { console.info(tech); })
  console.groupEnd('Technolgies');
});

function demonstrateBasicLogs() {
  console.clear();
  console.log('🌟 Regular message');
  console.info('🔍 Information message');
  console.warn('⚠️ Warning message');
  console.error('💥 Error message');
}

function demonstrateStyledLogs() {
  console.clear();
  console.log('%cMagical Text ✨', 'color: blue; font-size: 20px; font-weight: bold');
  console.log('%cParty %cTime 🎉',
    'color: red; font-size: 20px',
    'color: green; font-size: 16px');
}

function demonstrateGroups() {
  console.clear();
  console.group('🧙‍♂️ Wizard Data');
  console.log('Name: Merlin');
  console.log('Age: 500');
  console.group('🏰 Magic Castle');
  console.log('Location: Cloud Nine');
  console.log('Spell Count: Over 9000! ⚡');
  console.groupEnd();
  console.groupEnd();
}