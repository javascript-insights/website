if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then((reg) => {
            console.log('[load-service-worker] Registered:', reg.scope);
        })
        .catch((err) => {
            console.error('[load-service-worker] Registration failed:', err);
        });
}
