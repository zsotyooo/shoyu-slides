import Vue from 'vue';
import Router from 'vue-router';
import { Setup, Application } from '@/modules/core';

export class SetupRouter implements Setup {
    public setup(app: Application) {
        Vue.use(Router);

        app.setRouter(new Router({
            mode: 'history',
            base: process.env.BASE_URL,
            routes: [],
        }));

        return Promise.resolve();
    }
}
