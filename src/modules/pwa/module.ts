import { Application } from '@/core';
import registerServiceWorker from './registerServiceWorker';

export default () => ({
    name: 'pwa',
    setup: (app: Application) => {
        registerServiceWorker();
        return Promise.resolve();
    },
});
