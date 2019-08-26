import { storeConfig } from './store';
import { Application } from '@/modules/core';
import routes from './routes';

export default () => ({
    dependencies: ['router', 'store', 'vuetify'],
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
