import { storeConfig } from './store';
import { Application } from '@/core';
import routes from './routes';

export default () => ({
    dependencies: ['vuetify'],
    name: 'auth',
    setup: async (app: Application) => {
        const router = app.getRouter();
        const store = app.getStore();
        router.addRoutes(routes);

        store.registerModule('auth', storeConfig);
        store.dispatch('admin/appendMenuAction', [
            {
                to: '/logout',
                icon: 'mdi-logout-variant',
                text: 'Sign out',
                slot: 'bottom',
            },
        ]);

        router.beforeEach((to, from, next) => {
            const doLogout = to.matched.some((record) => record.meta.logout);
            if (doLogout && !store.getters['auth/isLoggedIn']) {
                store.dispatch('auth/signOutAction');
                next('login');
            } else {
                next();
            }

            const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
            store.dispatch('auth/syncAuthUserAction');
            if (requiresAuth && !store.getters['auth/isLoggedIn']) {
                next('login');
            } else {
                next();
            }
        });

        return Promise.resolve();
    },
});
