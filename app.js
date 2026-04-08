function createVideoCard(item) {
  const card = document.createElement('article');
  card.className = 'video-card';

  let media;
  if (item.url && item.url.trim()) {
    media = document.createElement('video');
    media.className = 'video-frame';
    media.controls = true;
    media.preload = 'auto';
    media.playsInline = true;
    media.src = item.url;

    media.addEventListener('loadeddata', () => {
      if (media.dataset.previewReady) {
        return;
      }

      media.dataset.previewReady = 'true';

      try {
        media.currentTime = 0.001;
      } catch (error) {
        // Ignore browsers that disallow seeking before user interaction.
      }
    }, { once: true });
  } else {
    media = document.createElement('div');
    media.className = 'video-frame placeholder';
    media.textContent = 'Add video URL in videos.js';
  }

  const meta = document.createElement('div');
  meta.className = 'video-meta';
  meta.innerHTML = `
    <p class="video-title">${item.title}</p>
    <p class="video-note">${item.note || ''}</p>
  `;

  card.appendChild(media);
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
