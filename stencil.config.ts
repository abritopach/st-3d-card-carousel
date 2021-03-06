import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'st-3d-card-carousel',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
