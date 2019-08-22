import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '../store';
import { onAuthStateChanged } from './services/firebase';
import { storeConfig } from './store';
import { AuthUser } from '.';
import Login from './views/Login.vue';

export default (
    router: VueRouter,
    store: Store<RootState>,
    onAuthStateChangedCallback?: (user?: AuthUser | null) => void) => {
    router.addRoutes([
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Login,
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
    if (onAuthStateChangedCallback) {
        onAuthStateChanged(onAuthStateChangedCallback);
    }
};
