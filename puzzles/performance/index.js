function toggleSolution(solutionId) {
    const solution = document.getElementById(solutionId);
    solution.style.display = solution.style.display === 'none' || !solution.style.display ? 'block' : 'none';
}