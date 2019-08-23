import { storeConfig } from './store';
import { Setup, Application } from '@/modules/core';
import { authService } from '@/modules/auth/services';

export class SetupUser implements Setup {
    public async setup(app: Application) {
        const store = app.getStore();
        store.registerModule('user', storeConfig);
        authService().onAuthStateChanged((user) => {
            store.dispatch('user/setCurrentUser', user);
        });
        return Promise.resolve();
    }
}
