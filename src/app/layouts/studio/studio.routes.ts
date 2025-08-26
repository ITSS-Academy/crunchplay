import {Routes} from '@angular/router';

export const studioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./studio.component').then(m => m.StudioComponent),
    children: [
      {
        path: 'upload',
        loadComponent: () => import('../../pages/upload/upload.component').then(m => m.UploadComponent),
        data: {
          headerTitle: 'Upload',
        }
      },
      {
        path: 'analytics',
        loadComponent: () => import('../../pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
        data: {
          headerTitle: 'Analytics',
        }
      },
      {
        path: '**',
        redirectTo: 'upload',
        pathMatch: 'full'
      }
    ]
  }
];

