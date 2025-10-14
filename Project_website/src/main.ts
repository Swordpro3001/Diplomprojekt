import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// swiper removed: using Tailwind-based carousel component instead

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

