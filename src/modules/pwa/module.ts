import { Application } from '@/core/app';
import registerServiceWorker from './registerServiceWorker';

export default () => ({
    name: 'pwa',
    setup: (app: Application) => {
        registerServiceWorker();
        return Promise.resolve();
    },
});
