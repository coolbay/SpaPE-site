function getVideoSources(item) {
  if (Array.isArray(item.sources) && item.sources.length > 0) {
    return item.sources.filter((source) => source && source.src);
  }

  if (item.url && item.url.trim()) {
    return [{ src: item.url.trim(), type: item.type || 'video/mp4' }];
  }

  return [];
}

function createVideoCard(item) {
  const card = document.createElement('article');
  card.className = 'video-card';
  const sources = getVideoSources(item);

  let media;
  if (sources.length > 0) {
    media = document.createElement('video');
    media.className = 'video-frame is-hidden';
    media.controls = true;
    media.preload = 'auto';
    media.playsInline = true;

    const fallback = document.createElement('div');
    fallback.className = 'video-fallback';
    fallback.textContent = 'This browser cannot display this video. Safari may still play it, or you can provide an H.264/WebM fallback source.';

    sources.forEach((source) => {
      const sourceElement = document.createElement('source');
      sourceElement.src = source.src;

      if (source.type) {
        sourceElement.type = source.type;
      }

      media.appendChild(sourceElement);
    });

    const revealVideo = () => {
      media.classList.remove('is-hidden');
      fallback.classList.remove('is-visible');
    };

    const showFallback = () => {
      media.classList.add('is-hidden');
      fallback.classList.add('is-visible');
    };

    media.addEventListener('loadeddata', () => {
      if (media.dataset.previewReady) {
        revealVideo();
        return;
      }

      media.dataset.previewReady = 'true';

      try {
        media.currentTime = 0.001;
      } catch (error) {
        // Ignore browsers that disallow seeking before user interaction.
      }
      revealVideo();
    }, { once: true });

    media.addEventListener('error', showFallback, { once: true });
    media.load();
    card.appendChild(media);
    card.appendChild(fallback);
  } else {
    media = document.createElement('div');
    media.className = 'video-frame placeholder';
    media.textContent = 'Add video URL in videos.js';
    card.appendChild(media);
  }

  const meta = document.createElement('div');
  meta.className = 'video-meta';
  meta.innerHTML = `
    <p class="video-title">${item.title}</p>
    <p class="video-note">${item.note || ''}</p>
  `;

  card.appendChild(meta);
  return card;
}

function renderSection(sectionId, items) {
  const grid = document.getElementById(sectionId);
  items.forEach((item) => {
    grid.appendChild(createVideoCard(item));
  });
}

renderSection('normal-grid', videoData.normal);
renderSection('reverse-grid', videoData.reverse);
