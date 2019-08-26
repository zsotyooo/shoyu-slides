import { Application } from '@/modules/core';
import routes from './routes';
import { storeConfig } from './store';

export default () => ({
    name: 'slideshow',
    dependencies: ['router', 'vuetify', 'admin'],
    setup: (app: Application) => {
        const store = app.getStore();
        store.registerModule('slideshow', storeConfig);
        // authService().onAuthStateChanged((user) => {
        //     store.dispatch('user/setCurrentUser', user);
        // });
        app.getRouter().addRoutes(routes);
        app.getStore().dispatch('admin/prependMenuAction', [
            {
                to: '/slideshows',
                icon: 'mdi-dots-horizontal-circle-outline',
                text: 'Slideshows',
                slot: 'top',
            },
        ]);
        return Promise.resolve();
    },
});
