import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const appRoutes: Route[] = [
  {
    path: 'chart',
    loadChildren: () =>
      loadRemote<typeof import('chart/Module')>('chart/Module').then(
        (m) => m!.RemoteEntryModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemote<typeof import('auth/Routes')>('auth/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
