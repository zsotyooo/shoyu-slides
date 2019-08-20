import VueRouter from 'vue-router';
import { Store } from 'vuex';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import 'firebase/auth';
import { RootState } from '../store/types';
import { storeConfig } from './store';
import Login from './views/Login.vue';

export default (router: VueRouter, store: Store<RootState>, onAuthStateChanged?: (user?: User | null) => void) => {
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
        store.dispatch('auth/setUserFromFirebaseAction');
        if (requiresAuth && !store.getters['auth/isLoggedIn']) {
            next('login');
        } else {
            next();
        }
    });
    if (onAuthStateChanged) {
        firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }
};
