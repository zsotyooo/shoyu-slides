import { Setup, Application } from '@/modules/core';

export class SetupHelloworld implements Setup {
    public async setup(app: Application) {
        app.getRouter().addRoutes([
            {
                path: '/',
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
        ]);
        return Promise.resolve();
    }
}
