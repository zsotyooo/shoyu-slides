import { Application } from '@/modules/core';
import { SetupAuth } from './SetupAuth';

export default () => ({
    dependencies: ['router', 'store', 'vuetify'],
    name: 'auth',
    setup: (app: Application) => (new SetupAuth()).setup(app),
});
