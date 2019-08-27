export default [
    {
        path: '/slideshows/new',
        name: 'slideshows-new',
        component: () => import(/* webpackChunkName: "slideshow" */ '@/modules/slideshow/views/Create.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/slideshows',
        name: 'slideshows',
        component: () => import(/* webpackChunkName: "slideshow" */ '@/modules/slideshow/views/Slideshows.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
