window.addEventListener("load", function () {
    const TEST_CASES = [
        {
            error: "ReferenceError: $ is not defined",
            note: "Common cause for this is that jQuery is not loaded. Or that it's used before it's loaded.",
            code: `
              function foo() {
                function updateSiteTitle(newTitle) {
                  $("h1").html(newTitle);
                }
                updateSiteTitle("New title");
              }
              foo();
            `,
        },

        {
            error: "TypeError: $ is not a function",
            note: "There is another global variable called $ that is not jQuery. This is common when using jQuery with other libraries.",
            code: `
              var $ = 5;
              function toggleOverlay(state) {
                $(".overlay").toggleClass("open", state);
              }
              toggleOverlay(true);
            `,
        },

        {
            error: "ReferenceError: jQuery is not defined",
            note: "jQuery is not loaded, or used before it's loaded.",
            code: `
              var CSRF_HEADER = "X-CSRF-Token";
              var setCSRFToken = function (securityToken) {
                jQuery.ajaxPrefilter(function (options, _, xhr) {
                  if (!xhr.crossDomain) {
                    xhr.setRequestHeader(CSRF_HEADER, $(securityToken));
                  }
                });
              };
              setCSRFToken('meta[name="csrf-token"]');
            `,
        },

        {
            error: "SyntaxError: Invalid or unexpected token",
            note: "This happens when there is a syntax error in the code. It can also happen when using frameworks like Razor, where the code is compiled on the server and then sent to the browser. In that case, it's easy to miss a quote.",
            code: `
              var foo = '@Url.Action("index","Survey")?id='
                        + @Model.MyGuid+'&languageName='
                        + selectedValue;
              console.log(foo);
            `,
        },

        {
            error: "SyntaxError: Unexpected token '<'",
            note: "Common cause for this is fetching JSON data from a server endpoint which, instead, replies with HTML (often when the response is a 404).",
            code: `
              async function fetchAPIResponse() {
                const response = await fetch(document.location.href);
                const data = await response.json();
                return data;
              }
              fetchAPIResponse().then((data) => console.log(data));
            `,
        },

        {
            error: "TypeError: Cannot read property 'addEventListener' of null",
            note: "Very common error due to a property being accessed on a null object. But the solution may be subtle. The element may be accessed before it's loaded for example, so the solution isn't to just check if the element is null.",
            code: `
              function swapper() {
                toggleClass(document.getElementById("overlay"), "open");
              }
              var el = document.getElementById("overlayBtn");
              el.addEventListener("click", swapper, false);
            `,
        },

        {
            error: "SyntaxError: Unexpected identifier",
            note: "Common cause for this is a misspelled keyword.",
            code: `
              functionn bar() {
  
              } 
            `,
        },

        {
            error: "TypeError: Cannot read property 'appendChild' of null",
            note: "The element on which the 'appendChild' method is used may actually exist, so it's not just a problem of something being missing. The &lt;script&gt; tag may appear before the element in the DOM.",
            code: `
              var p = document.createElement("p");
              p.textContent = "Hello World";
              document.getElementById("appendChild").appendChild(p);
            `,
        },

        {
            error: "TypeError: 'x' is not iterable",
            note: "Using a for..of loop on an object.",
            code: `
              const obj = { France: "Paris", England: "London" };
              for (const p of obj) {
                console.log(p);
              }
            `
        },

        {
            error: "TypeError: can't define property x: Object is not extensible",
            note: "Using defineProperty on a non-extensible object.",
            code: `
              const zoo = {};
              Object.preventExtensions(zoo);
              Object.defineProperty(zoo, "x", { value: "foo" });
            `
        },

        {
            error: "TypeError: Right-hand side of 'instanceof' is not an object",
            note: "Using instanceof on a non-object.",
            code: `
              function Foo() {}
              const f = Foo(); 
              const x = new Foo();
              x instanceof f;
            `
        },

        {
            error: "RangeError: Maximum call stack size exceeded",
            note: "A function calling itself too many times, exceeding the max call stack size.",
            code: `
              function loop(x) {
                if (x >= 1000000000) return;
                loop(x + 1);
              }
              loop(0);
            `
        },

        {
            error: "ReferenceError: bar is not defined",
            note: "Another ReferenceError, generic message, unrelated to a framework or library.",
            code: `
              function foo() {
                "use strict";
                bar = true;
              }
              foo();
            `
        },

        {
            error: "TypeError: Converting circular structure to JSON",
            note: "Trying to stringify an object that contains a circular reference.",
            code: `
              const circularReference = { otherData: 123 };
              circularReference.myself = circularReference;
              JSON.stringify(circularReference);
            `
        },

        {
            error: "SyntaxError: Private field '#element' must be declared in an enclosing class",
            note: "Using a private field outside of a class. This can sometimes be a result of a typo, like forgetting quotes around an ID selector.",
            code: `
              class Foo {
                #bar = 42;
              }
              document.querySelector(#element);
            `
        },

        {
            error: "RangeError: Invalid time value",
            note: "Trying to create invalidate dates.",
            code: `
              new Date("2014-25-23").toISOString();
            `
        },

        {
            error: "Access to fetch at '...' from origin '...' has been blocked by CORS policy",
            note: "Trying to access a resource from a different origin, but the server doesn't allow it.",
            code: `
              fetch("https://www.microsoft.com/");
            `
        }
    ];

    const testCasesEl = document.querySelector(".test-cases");

    function createTestCaseEl(error, note, code) {
        const lines = code.split("\n");
        lines.shift();
        const cleanCode = lines
            .map((line) => {
                // Remove the indentation.
                return line.slice(12);
            })
            .join("\n");

        const li = document.createElement("li");
        li.innerHTML = `
            <h2>${error}</h2>
            <p>${note}</p>
            <pre><code>${cleanCode}</code></pre>
          `;

        const runButton = document.createElement("button");
        runButton.textContent = "Run";
        runButton.addEventListener("click", () => {
            const script = document.createElement("script");
            script.textContent = code;
            document.body.appendChild(script);
        });
        li.appendChild(runButton);

        return li;
    }

    for (const { error, note, code } of TEST_CASES) {
        const li = createTestCaseEl(error, note, code);
        testCasesEl.appendChild(li);
    }
});

