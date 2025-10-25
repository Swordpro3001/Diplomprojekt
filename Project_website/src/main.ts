import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(function() {
  const imagesToLoad = [
    'assets/Bild1.webp',
    'assets/Bild2.webp',
    'assets/Bild3.webp',
    'assets/logo.webp',
    'assets/OSA_logo_white.webp'
  ];

  let loadedCount = 0;
  const totalImages = imagesToLoad.length;
  const progressBar = document.getElementById('progress-bar');
  const percentageText = document.getElementById('loading-percentage');
  const loadingScreen = document.getElementById('loading-screen');

  function updateProgress() {
    loadedCount++;
    const percentage = Math.round((loadedCount / totalImages) * 100);
    if (progressBar) progressBar.style.width = percentage + '%';
    if (percentageText) percentageText.textContent = percentage + '%';

    if (loadedCount === totalImages) {
      setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('loaded');
        setTimeout(() => {
          if (loadingScreen) loadingScreen.style.display = 'none';
        }, 500);
      }, 300);
    }
  }

  imagesToLoad.forEach(src => {
    const img = new Image();
    img.onload = updateProgress;
    img.onerror = updateProgress; // Continue even if image fails
    img.src = src;
  });
})();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

