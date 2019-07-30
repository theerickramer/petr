import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const googleMapsScript = document.createElement('script');
googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}`;
document.head.appendChild(googleMapsScript);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
