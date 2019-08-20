import Vue from 'vue';
import Router from 'vue-router';

export default () => {
    Vue.use(Router);

    return new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [],
    });
};
