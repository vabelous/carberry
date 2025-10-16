import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'orenburg',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: [],

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
