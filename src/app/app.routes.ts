import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'studio',
    loadChildren: () => import('./layouts/studio/studio.routes').then(m => m.studioRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./layouts/main/main.routes').then(m => m.mainRoutes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
