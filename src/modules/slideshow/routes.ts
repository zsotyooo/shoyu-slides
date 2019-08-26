export default [
    {
        path: '/slideshows',
        name: 'slideshows',
        component: () => import(/* webpackChunkName: "slideshow" */ '@/modules/slideshow/views/Slideshows.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
