function showCode(id) {
    const codeBlock = document.getElementById(id);
    codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
}

// Exercise checking functions remain unchanged
function checkExercise1() {
    console.clear();
    console.info('Exercise 1 Template:');
    console.log('Your name here');
    console.warn('Warning: Battery at 10%');
    console.error('Error: Connection failed');
}

function checkExercise2() {
    console.clear();
    console.info('Exercise 2 Template:');
    console.log('%cYour styled message here', 'color: blue; font-size: 20px; font-weight: bold');
}

function checkExercise3() {
    console.clear();
    console.info('Exercise 3 Template:');
    console.group('Car Details');
    console.log('Model: [Your car model]');
    console.log('Year: [Year]');
    console.group('Technical Specs');
    console.log('Engine: [Engine details]');
    console.log('Power: [Power details]');
    console.groupEnd();
    console.groupEnd();
}

// Exercise checking functions remain unchanged
function checkExercise4() {
    console.clear();
    console.info('Exercise 4 Template:');
    const debugHeroes = [
        { name: 'Captain Console', superpower: 'Log Vision', bugsSquashed: 9001 },
        { name: 'The Debuginator', superpower: 'Breakpoint Mastery', bugsSquashed: 8000 },
        { name: 'Stack Trace Girl', superpower: 'Error Whispering', bugsSquashed: 7500 }
    ];
    console.table(debugHeroes);
}

function checkExercise5() {
    console.clear();
    console.info('Exercise 5 Template:');
    console.time('BugHunting');
    setTimeout(() => {
        console.time('CodeSprinting');
        setTimeout(() => {
            console.timeEnd('CodeSprinting');
            console.timeEnd('BugHunting');
        }, 1000);
    }, 2000);
}

function checkExercise6() {
    console.clear();
    console.info('Exercise 6 Template:');
    console.log('%cWhy do programmers prefer dark mode?', 'color: #FF69B4; font-size: 16px');
    console.log('%cBecause light attracts bugs! 🐛', 'color: #4CAF50; font-size: 20px; font-weight: bold');
    console.warn('Warning: Dad joke overload detected! 😄');
}