export default [
    {
        path: '/admin/slideshows/new',
        name: 'admin-slideshow-new',
        component: () => import(/* webpackChunkName: "slideshow-edit" */ '@/modules/slideshow/views/Create.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/admin/slideshows/:slideshowId/edit',
        name: 'admin-slideshow-edit',
        component: () => import(/* webpackChunkName: "slideshow-edit" */ '@/modules/slideshow/views/Create.vue'),
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
    {
        path: '/s/:slideshowId',
        name: 'slideshow',
        component: () => import(/* webpackChunkName: "slideshow-view" */ '@/modules/slideshow/views/View.vue'),
        meta: {
            requiresAuth: false,
        },
    },
];
