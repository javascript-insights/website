window.addEventListener("load", function foo() {
  navigator.serviceWorker.ready.then((registration) => {
    return registration.sync.register('sync-save-document');
  });
});