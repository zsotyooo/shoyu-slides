import { Application } from '../core';
import { SetupVuetify } from './SetupVuetify';

export default () => ({
    name: 'vuetify',
    setup: (app: Application) => (new SetupVuetify()).setup(app),
});
