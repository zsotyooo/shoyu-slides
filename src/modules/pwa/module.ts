import { Application } from '@/modules/core';
import { SetupPwa } from './SetupPwa';

export default () => ({
    name: 'pwa',
    setup: (app: Application) => (new SetupPwa()).setup(app),
});
