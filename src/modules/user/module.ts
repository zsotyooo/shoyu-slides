import { Application } from '@/modules/core';
import { SetupUser } from './SetupUser';

export default () => ({
    dependencies: ['router', 'store', 'auth'],
    name: 'user',
    setup: (app: Application) => (new SetupUser()).setup(app),
});
