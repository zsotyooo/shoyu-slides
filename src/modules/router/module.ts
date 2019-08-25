import Vue from 'vue';
import Router from 'vue-router';
import { Application } from '@/modules/core';

export default () => ({
    name: 'router',
    setup: (app: Application) => {
        Vue.use(Router);

        app.setRouter(new Router({
            mode: 'history',
            base: process.env.BASE_URL,
            routes: [],
        }));

        return Promise.resolve();
    },
});
