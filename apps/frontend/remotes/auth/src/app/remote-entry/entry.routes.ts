import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { WebsocketsPortAdapter } from '@carberry/front-end-infrastructure-backend-websockets-websockets';
import { WebsocketsPort } from '@carberry/front-end-core-ports-secondary-websockets';

export const remoteRoutes: Route[] = [{ 
  path: '', 
  providers: [
    {
      provide: WebsocketsPort,
      useClass: WebsocketsPortAdapter,
    }
  ],
  component: RemoteEntry 
}];
