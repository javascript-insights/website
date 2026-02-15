document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // Service Worker Registration
    // =============================================
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => {
                console.log('[Hands-On 5] Service Worker registered:', reg.scope);
                window._swRegistration = reg;
            })
            .catch(err => console.error('[Hands-On 5] SW registration failed:', err));
    }

    // Helper: append to a mini-log element
    function logTo(elId, msg) {
        const el = document.getElementById(elId);
        if (!el) return;
        const time = new Date().toLocaleTimeString();
        el.textContent += `[${time}] ${msg}\n`;
        el.scrollTop = el.scrollHeight;
    }

    // =============================================
    // Exercise 2: Background Sync
    // =============================================
    const syncBtn = document.getElementById('syncBtn');
    const syncInput = document.getElementById('syncMessage');
    const checkSyncTags = document.getElementById('checkSyncTags');

    if (syncBtn) {
        syncBtn.addEventListener('click', async () => {
            const message = syncInput.value.trim();
            if (!message) {
                logTo('syncLog', '⚠️ Please type a message first');
                return;
            }

            if (!('SyncManager' in window)) {
                logTo('syncLog', '❌ Background Sync not supported in this browser');
                return;
            }

            try {
                const reg = await navigator.serviceWorker.ready;
                const tag = 'sync-msg-' + Date.now();
                await reg.sync.register(tag);
                logTo('syncLog', `✅ Sync registered: "${tag}" (message: "${message}")`);
                syncInput.value = '';
            } catch (err) {
                logTo('syncLog', '❌ Sync failed: ' + err.message);
            }
        });

        syncInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') syncBtn.click();
        });
    }

    if (checkSyncTags) {
        checkSyncTags.addEventListener('click', async () => {
            try {
                const reg = await navigator.serviceWorker.ready;
                const tags = await reg.sync.getTags();
                logTo('syncLog', tags.length > 0
                    ? `📋 Registered tags: ${tags.join(', ')}`
                    : '📋 No tags registered (all completed)');
            } catch (err) {
                logTo('syncLog', 'Error: ' + err.message);
            }
        });
    }

    // Listen for sync-complete messages from SW
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'sync-complete') {
            logTo('syncLog', `✅ SW reports sync complete for tag: ${event.data.tag}`);
        }
    });

    // =============================================
    // Exercise 3: Notifications
    // =============================================
    const requestNotifPerm = document.getElementById('requestNotifPerm');
    const notifPermStatus = document.getElementById('notifPermStatus');
    const sendNotif = document.getElementById('sendNotif');
    const sendBatch = document.getElementById('sendBatch');
    const closeAllNotifs = document.getElementById('closeAllNotifs');

    function updatePermBadge() {
        if (!notifPermStatus) return;
        const perm = Notification.permission;
        notifPermStatus.textContent = perm;
        notifPermStatus.className = 'status-badge ' + perm;
    }

    if ('Notification' in window) {
        updatePermBadge();
    }

    if (requestNotifPerm) {
        requestNotifPerm.addEventListener('click', async () => {
            const perm = await Notification.requestPermission();
            updatePermBadge();
            logTo('notifLog', `Permission: ${perm}`);
        });
    }

    if (sendNotif) {
        sendNotif.addEventListener('click', async () => {
            if (Notification.permission !== 'granted') {
                logTo('notifLog', '⚠️ Grant permission first');
                return;
            }
            try {
                const reg = await navigator.serviceWorker.ready;
                const title = document.getElementById('notifTitle').value || 'Test';
                const body = document.getElementById('notifBody').value || '';
                const tag = document.getElementById('notifTag').value || undefined;

                await reg.showNotification(title, {
                    body,
                    tag,
                    data: { url: window.location.href, timestamp: Date.now() }
                });
                logTo('notifLog', `✅ Notification sent: "${title}" (tag: ${tag || 'none'})`);
            } catch (err) {
                logTo('notifLog', '❌ ' + err.message);
            }
        });
    }

    if (sendBatch) {
        sendBatch.addEventListener('click', async () => {
            if (Notification.permission !== 'granted') {
                logTo('notifLog', '⚠️ Grant permission first');
                return;
            }
            const reg = await navigator.serviceWorker.ready;
            const items = [
                { title: 'ℹ️ Info', tag: 'batch-info' },
                { title: '✅ Success', tag: 'batch-success' },
                { title: '⚠️ Warning', tag: 'batch-warning' }
            ];
            for (const item of items) {
                await reg.showNotification(item.title, {
                    body: `Batch notification with tag: ${item.tag}`,
                    tag: item.tag
                });
            }
            logTo('notifLog', '📦 3 batch notifications sent!');
        });
    }

    if (closeAllNotifs) {
        closeAllNotifs.addEventListener('click', async () => {
            const reg = await navigator.serviceWorker.ready;
            const notifs = await reg.getNotifications();
            notifs.forEach(n => n.close());
            logTo('notifLog', `Closed ${notifs.length} notification(s)`);
        });
    }

    // =============================================
    // Exercise 4: Push Messaging
    // =============================================
    const pushSubscribe = document.getElementById('pushSubscribe');
    const pushUnsubscribe = document.getElementById('pushUnsubscribe');
    const pushCheck = document.getElementById('pushCheck');
    const pushSubInfo = document.getElementById('pushSubscriptionInfo');

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    }

    function displayPushSub(sub) {
        if (!pushSubInfo) return;
        if (!sub) {
            pushSubInfo.textContent = 'No active subscription';
            return;
        }
        const json = sub.toJSON();
        pushSubInfo.textContent =
            `Endpoint: ${json.endpoint}\n` +
            `Keys: p256dh=${json.keys?.p256dh || 'N/A'}, auth=${json.keys?.auth || 'N/A'}`;
    }

    // Check existing subscription on load
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then(reg => reg.pushManager.getSubscription()).then(sub => {
            if (sub) {
                displayPushSub(sub);
                logTo('pushLog', 'Found existing push subscription');
                if (pushSubscribe) pushSubscribe.disabled = true;
                if (pushUnsubscribe) pushUnsubscribe.disabled = false;
            }
        });
    }

    if (pushSubscribe) {
        pushSubscribe.addEventListener('click', async () => {
            try {
                const perm = await Notification.requestPermission();
                if (perm !== 'granted') {
                    logTo('pushLog', '❌ Notification permission required for push');
                    return;
                }
                const reg = await navigator.serviceWorker.ready;
                const sub = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array(
                        'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo'
                    )
                });
                displayPushSub(sub);
                logTo('pushLog', '✅ Subscribed! Endpoint: ' + sub.endpoint.slice(0, 60) + '...');
                pushSubscribe.disabled = true;
                pushUnsubscribe.disabled = false;
            } catch (err) {
                logTo('pushLog', '❌ ' + err.message);
            }
        });
    }

    if (pushUnsubscribe) {
        pushUnsubscribe.addEventListener('click', async () => {
            const reg = await navigator.serviceWorker.ready;
            const sub = await reg.pushManager.getSubscription();
            if (sub) {
                await sub.unsubscribe();
                displayPushSub(null);
                logTo('pushLog', '✅ Unsubscribed');
                pushSubscribe.disabled = false;
                pushUnsubscribe.disabled = true;
            }
        });
    }

    if (pushCheck) {
        pushCheck.addEventListener('click', async () => {
            const reg = await navigator.serviceWorker.ready;
            const sub = await reg.pushManager.getSubscription();
            displayPushSub(sub);
            logTo('pushLog', sub ? '📋 Active subscription found' : '📋 No active subscription');
        });
    }

    // =============================================
    // Exercise 5: Speculative Loads
    // =============================================
    const addPrefetch = document.getElementById('addPrefetch');
    const addPrerender = document.getElementById('addPrerender');
    const removeSpecRules = document.getElementById('removeSpecRules');
    const dynamicSpecRules = [];

    if (addPrefetch) {
        addPrefetch.addEventListener('click', () => {
            const rules = {
                prefetch: [{
                    urls: ['bfcache-bad.html', '../index.html'],
                    eagerness: 'immediate'
                }]
            };
            const script = document.createElement('script');
            script.type = 'speculationrules';
            script.textContent = JSON.stringify(rules);
            document.head.appendChild(script);
            dynamicSpecRules.push(script);
            logTo('specLog', '✅ Prefetch rules added for bfcache-bad.html and ../index.html');
        });
    }

    if (addPrerender) {
        addPrerender.addEventListener('click', () => {
            const rules = {
                prerender: [{
                    urls: ['bfcache-good.html'],
                    eagerness: 'moderate'
                }]
            };
            const script = document.createElement('script');
            script.type = 'speculationrules';
            script.textContent = JSON.stringify(rules);
            document.head.appendChild(script);
            dynamicSpecRules.push(script);
            logTo('specLog', '✅ Prerender rule added for bfcache-good.html');
        });
    }

    if (removeSpecRules) {
        removeSpecRules.addEventListener('click', () => {
            const count = dynamicSpecRules.length;
            dynamicSpecRules.forEach(el => el.remove());
            dynamicSpecRules.length = 0;
            logTo('specLog', `🗑️ Removed ${count} dynamic rule(s)`);
        });
    }

    // Log hover events on spec links
    document.querySelectorAll('.spec-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            logTo('specLog', `👆 Hovering: ${link.textContent.trim()}`);
        });
    });

    // =============================================
    // Exercise 6: Reporting API
    // =============================================
    const triggerDeprecation = document.getElementById('triggerDeprecation');
    const checkReports = document.getElementById('checkReports');
    const reportCountEl = document.getElementById('reportCount');
    const capturedReports = [];

    if ('ReportingObserver' in window) {
        const observer = new ReportingObserver((reports) => {
            reports.forEach(report => {
                capturedReports.push(report);
                logTo('reportLog', `📊 ${report.type}: ${report.body?.message || JSON.stringify(report.body)}`);
            });
            if (reportCountEl) reportCountEl.textContent = capturedReports.length + ' reports';
        }, { buffered: true, types: ['deprecation', 'intervention'] });
        observer.observe();
    }

    if (triggerDeprecation) {
        triggerDeprecation.addEventListener('click', () => {
            logTo('reportLog', 'Triggering deprecated APIs...');

            try { document.domain; } catch (e) { /* deprecated */ }

            try {
                if (window.openDatabase) {
                    window.openDatabase('test', '1.0', 'Test', 1024);
                }
            } catch (e) { /* removed */ }

            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'getstarted.json', false);
                xhr.send();
                logTo('reportLog', 'Synchronous XHR completed (deprecated on main thread)');
            } catch (e) {
                logTo('reportLog', 'Sync XHR: ' + e.message);
            }

            logTo('reportLog', 'Check Console and Application → Reporting API');
        });
    }

    if (checkReports) {
        checkReports.addEventListener('click', () => {
            logTo('reportLog', `📋 Total captured: ${capturedReports.length} report(s)`);
            capturedReports.forEach((r, i) => {
                logTo('reportLog', `  #${i + 1} type=${r.type} id=${r.body?.id || 'N/A'}`);
            });
        });
    }
});
