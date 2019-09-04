import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Router from 'vue-router';
import { storeConfig } from './store';
import { RootState, Application, services } from '.';

export default () => ({
    name: 'core',
    setup: (app: Application) => {
        Vue.use(Vuex);

        app.setStore(new Store<RootState>(storeConfig));

        Vue.use(Router);

        app.setRouter(new Router({
            mode: 'history',
            base: process.env.BASE_URL,
            routes: [],
        }));

        return Promise.resolve();
    },
});
