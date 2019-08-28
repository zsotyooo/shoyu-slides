export default [
    {
        path: '/admin/slideshows/new',
        name: 'admin-slideshows-new',
        component: () => import(/* webpackChunkName: "slideshow" */ '@/modules/slideshow/views/Create.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/admin/slideshows',
        name: 'admin-slideshows',
        component: () => import(/* webpackChunkName: "slideshow" */ '@/modules/slideshow/views/Slideshows.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
