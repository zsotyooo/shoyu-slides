export default [
    {
        path: '/helloworld',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/modules/helloworld/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/modules/helloworld/views/About.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
