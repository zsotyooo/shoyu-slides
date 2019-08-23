import { Application } from '@/modules/core';
import { SetupHelloworld } from './SetupHelloworld';

export default () => ({
    dependencies: ['router', 'vuetify'],
    name: 'helloworld',
    setup: (app: Application) => (new SetupHelloworld()).setup(app),
});
