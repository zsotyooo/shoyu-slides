import { Application } from '@/core/app';
import firebaseServices from './services/FirebaseServices';
import config from './config';

export default () => ({
    name: 'firebase',
    setup: (app: Application) => {
        firebaseServices.init(config);
        return Promise.resolve();
    },
});
