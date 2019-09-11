import { Application } from '@/core/app';
import routes from './routes';
import { storeConfig } from './store';

export default () => ({
    name: 'media',
    dependencies: ['vuetify', 'admin', 'auth'],
    setup: (app: Application) => {
        const store = app.getStore();
        const router = app.getRouter();
        store.registerModule('media', storeConfig);
        router.addRoutes(routes);

        app.getStore().dispatch('admin/appendMenuAction', [
            {
                to: '/admin/media-center',
                icon: 'mdi-image-multiple',
                text: 'Media center',
                slot: 'top',
            },
        ]);

        return Promise.resolve();
    },
});
