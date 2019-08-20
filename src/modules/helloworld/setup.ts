import VueRouter from 'vue-router';
import Home from '@/modules/helloworld/views/Home.vue';

export default (router: VueRouter) => {
    router.addRoutes([
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '@/modules/helloworld/views/About.vue'),
            meta: {
                requiresAuth: true,
            },
        },
    ]);
};
