document.addEventListener('DOMContentLoaded', () => {
    // Null Error
    window.triggerNullError = () => {
        const obj = null;
        obj.someProperty;  // Throws TypeError: Cannot read properties of null
    };

    // Type Error
    window.triggerTypeError = () => {
        const num = 42;
        num.toLowerCase();  // Throws TypeError: num.toLowerCase is not a function
    };

    // Reference Error
    window.triggerReferenceError = () => {
        console.log(undefinedVariable);  // Throws ReferenceError: undefinedVariable is not defined
    };

    // Stack Overflow
    window.triggerRecursion = () => {
        function recurse() {
            recurse();  // Infinite recursion causing stack overflow
        }
        recurse();
    };
});