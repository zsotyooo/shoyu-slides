import { Application } from '@/modules/core';
import { SetupRouter } from './SetupRouter';

export default () => ({
    name: 'router',
    setup: (app: Application) => (new SetupRouter()).setup(app),
});
