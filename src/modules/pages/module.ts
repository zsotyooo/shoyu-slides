import { Application } from '@/core/app';
import routes from './routes';

export default () => ({
    name: 'pages',
    dependencies: ['admin'],
    setup: (app: Application) => {
        app.getRouter().addRoutes(routes);
        app.getStore().dispatch('admin/appendMenuAction', [
            {
                to: '/about',
                icon: 'mdi-information-variant',
                text: 'About ShoYu',
                slot: 'top',
            },
        ]);
        return Promise.resolve();
    },
});
