import { Application } from '@/modules/core';
import { SetupFirebase } from './SetupFirebase';

export default () => ({
    name: 'firebase',
    setup: (app: Application) => (new SetupFirebase()).setup(app),
});
