import { Application } from '@/modules/core';
import { SetupApp } from './SetupApp';

export default () => ({
    dependencies: ['vuetify'],
    name: 'app',
    setup: (app: Application) => (new SetupApp()).setup(app),
});
