export default [
    {
        path: '/admin/media-center',
        name: 'media-center',
        component: () => import(/* webpackChunkName: "media-center" */ '@/modules/media/views/MediaCenterPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
