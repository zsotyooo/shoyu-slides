import { Application } from '@/modules/core';
import routes from './routes';

export default () => ({
    dependencies: ['router', 'vuetify'],
    name: 'helloworld',
    setup: (app: Application) => {
        app.getRouter().addRoutes(routes);
        return Promise.resolve();
    },
});
