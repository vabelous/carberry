import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Routes':
      'apps/frontend/remotes/auth/src/app/remote-entry/entry.routes.ts',
  },
  shared: (name, config) => {
    if (['webpack-merge'].includes(name)) {
      return false;
    }

    if ('@angular/core' === name) {
      return { ...config, singleton: true, strictVersion: true };
    }

    if ('@angular/common' === name) {
      return { ...config, singleton: true, strictVersion: true };
    }

    if ('@angular/router' === name) {
      return { ...config, singleton: true, strictVersion: true };
    }

    if ('socket.io-client' === name) {
      return {
        ...config,
        singleton: true,
        strictVersion: false,
        requiredVersion: '4.7.5',
      };
    }

    return config;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
