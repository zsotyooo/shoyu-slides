import { Application } from '@/core/app';
import routes from './routes';
import { storeConfig } from './store';

export default () => ({
    name: 'slideshow',
    dependencies: ['vuetify', 'admin', 'auth'],
    setup: (app: Application) => {
        const store = app.getStore();
        const router = app.getRouter();
        store.registerModule('slideshow', storeConfig);
        // authService().onAuthStateChanged((user) => {
        //     store.dispatch('user/setCurrentUser', user);
        // });
        router.addRoutes(routes);

        app.getStore().dispatch('admin/prependMenuAction', [
            {
                to: '/admin/slideshows',
                icon: 'mdi-dots-horizontal-circle-outline',
                text: 'Slideshows',
                slot: 'top',
            },
        ]);

        router.beforeEach((to, from, next) => {
            if (to.params.slideshowId) {
                store.dispatch('slideshow/fetchCurrentSlideshowAction', to.params.slideshowId);
            } else {
                store.dispatch('slideshow/removeCurrentSlideshowAction');
            }
            next();
        });
        return Promise.resolve();
    },
});
