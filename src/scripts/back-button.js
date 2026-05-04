const STORAGE_KEY = 'kyoSmartBackFrom';

function setupTransitionFromTracking() {
    const w = window;
    if (w.__kyoSmartBackNavBound) return;
    w.__kyoSmartBackNavBound = true;
    document.addEventListener('astro:before-preparation', (e) => {
        const from = e.from;
        if (from && from.origin === location.origin) {
            sessionStorage.setItem(STORAGE_KEY, from.href);
        }
    });
}

function setupSmartBack() {
    const w = window;
    if (w.__kyoBackButtonSmartBound) return;
    w.__kyoBackButtonSmartBound = true;
    document.addEventListener(
        'click',
        (e) => {
            const target = e.target;
            if (!(target instanceof Element)) return;
            const a = target.closest('a[data-smart-back]');
            if (!a) return;
            const ref = document.referrer;
            const stored = sessionStorage.getItem(STORAGE_KEY);
            const sameOriginViaReferrer = ref && ref.startsWith(location.origin);
            const sameOriginViaTransition =
                stored && stored.startsWith(location.origin);
            if (sameOriginViaReferrer || sameOriginViaTransition) {
                e.preventDefault();
                history.back();
            }
        },
        true
    );
}

setupTransitionFromTracking();
setupSmartBack();
