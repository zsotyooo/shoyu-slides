
import { storeConfig } from './store';
import { Setup, Application } from '@/modules/core';
import { authService } from './services';

export class SetupAuth implements Setup {
    private isAuthDone = false;
    public async setup(app: Application) {
        const router = app.getRouter();
        const store = app.getStore();
        router.addRoutes([
            {
                path: '/login',
                name: 'login',
                component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
            },
            {
                path: '/logout',
                name: 'logout',
                component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
                props: {
                    logout: true,
                },
            },
        ]);

        store.registerModule('auth', storeConfig);

        router.beforeEach((to, from, next) => {
            const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
            store.dispatch('auth/syncAuthUserAction');
            if (requiresAuth && !store.getters['auth/isLoggedIn']) {
                next('login');
            } else {
                next();
            }
        });

        return new Promise<void>((resolve) => {
            authService().onAuthStateChanged(() => {
                if (!this.isAuthDone) {
                    this.isAuthDone = true;
                    resolve();
                }
            });
        });
    }
}
