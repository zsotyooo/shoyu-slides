import { Setup, Application } from '@/modules/core';
import registerServiceWorker from './registerServiceWorker';

export class SetupPwa implements Setup {
    public async setup(app: Application) {
        registerServiceWorker();
        return Promise.resolve();
    }
}
