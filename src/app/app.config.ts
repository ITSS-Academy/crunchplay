import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideHttpClient} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {authReducer} from './ngrx/reducers/auth.reducer';
import {videoReducer} from './ngrx/reducers/video.reducer';
import * as AuthEffects from './ngrx/effects/auth.effects';
import * as VideoEffects from './ngrx/effects/video.effects';
import {categoryReducer} from './ngrx/reducers/category.reducer';
import * as CategoryEffects from './ngrx/effects/category.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(), provideStore(
    {
      auth: authReducer,
      video: videoReducer,
      category: categoryReducer
    },
  ),
    provideEffects(AuthEffects, VideoEffects, CategoryEffects), provideHttpClient()]
};
