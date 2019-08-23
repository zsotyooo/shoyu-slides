import { Setup, Application } from '@/modules/core';
import firebaseServices from './services/FirebaseServices';

const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
};

export class SetupFirebase implements Setup {
    public setup(app: Application) {
        firebaseServices.init(config);
        return Promise.resolve();
    }
}