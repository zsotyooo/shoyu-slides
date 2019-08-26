export default [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/modules/pages/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/modules/pages/views/About.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
