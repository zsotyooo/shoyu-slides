import { storeConfig } from './store';
import { Application } from '@/modules/core';
import { authService } from '@/modules/auth';

export default () => ({
    dependencies: ['router', 'store', 'auth'],
    name: 'user',
    setup: (app: Application) => {
        const store = app.getStore();
        store.registerModule('user', storeConfig);
        authService().onAuthStateChanged((user) => {
            store.dispatch('user/setCurrentUser', user);
        });
        return Promise.resolve();
    },
});
