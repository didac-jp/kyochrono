document.addEventListener('click', (e) => {
    const t = e.target;
    const wrapper =
        t instanceof Element ? t.closest('[data-video-id]') : null;
    if (!wrapper || wrapper.querySelector('iframe, video')) return;

    const id    = wrapper.dataset.videoId;
    const title = wrapper.dataset.videoTitle;
    const type  = wrapper.dataset.videoType;

    if (type === 'youtube') {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        iframe.title = title;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.className = 'absolute inset-0 w-full h-full';
        wrapper.replaceChildren(iframe);
    } else if (type === 'animethemes') {
        const video = document.createElement('video');
        video.src = id;
        video.controls = true;
        video.autoplay = true;
        video.className = 'absolute inset-0 w-full h-full bg-black';
        wrapper.replaceChildren(video);
    }

    wrapper.classList.remove('group/video');
});