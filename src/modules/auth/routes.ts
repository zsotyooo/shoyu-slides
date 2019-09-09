export default [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
        meta: {
            logout: true,
        },
    },
];
