function toggleSolution(solutionId) {
    const solution = document.getElementById(solutionId);
    solution.style.display = solution.style.display === 'none' || !solution.style.display ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('puzzle1').addEventListener('click', () => {
        console.log("\n\npuzzle1 clicked");
        console.log("doSomething().then(function () { return doSomethingElse(); }).then(finalHandler);");
        console.log("----------------------------------------------------------------------\n");
        doSomething().then(function () {
            return doSomethingElse();
        }).then(finalHandler);
    });

    document.getElementById('puzzle2').addEventListener('click', () => {
        console.log("\n\npuzzle2 clicked");
        console.log("doSomething().then(doSomethingElse()).then(finalHandler)");
        console.log("----------------------------------------------------------------------\n");
        doSomething().then(function () {
            doSomethingElse();
        }).then(finalHandler);
    });

    document.getElementById('puzzle3').addEventListener('click', () => {
        console.log("\n\npuzzle3 clicked");
        console.log("doSomething().then(doSomethingElse()).then(finalHandler)");
        console.log("----------------------------------------------------------------------\n");
        doSomething().then(doSomethingElse()).then(finalHandler);
    });

    document.getElementById('puzzle4').addEventListener('click', () => {
        console.log("\n\npuzzle4 clicked");
        console.log("doSomething().then(doSomethingElse).then(finalHandler)");
        console.log("----------------------------------------------------------------------\n");
        doSomething().then(doSomethingElse).then(finalHandler);
    });
});

function doSomething(input) {
    return doWork("doSomething\t\t", input);
}

function doSomethingElse(input) {
    return doWork("doSomethingElse", input);
}

function finalHandler(input) {
    return doWork("finalHandler\t", input);
}

function doWork(name, input) {
    console.log(new Date().toISOString(), "\t|\t", `start: ${name}`, "\t|\t input: ", input);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(new Date().toISOString(), "\t|\t", `end  : ${name}`, "\t|\t input: ", input);
            resolve(`${new Date().toISOString()} \t|\t resolve : ${name} \t\t|\t input: ${input}`);
        }, 2000);
    });
}