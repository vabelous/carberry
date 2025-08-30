import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteEntry } from './app/remote-entry/entry';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(RemoteEntry, config);

export default bootstrap;
