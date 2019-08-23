import { Application } from '@/modules/core';
import { SetupStore } from './SetupStore';

export default () => ({
    name: 'store',
    setup: (app: Application) => (new SetupStore()).setup(app),
});
