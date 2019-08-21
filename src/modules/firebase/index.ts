import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

class FirebaseService {
    private app: firebase.app.App;
    private firestore: firebase.firestore.Firestore;
    private auth: firebase.auth.Auth;

    public initApp(config: {[index: string]: string}) {
        if (!this.app) {
            this.app = firebase.initializeApp(config);
            this.firestore = this.app.firestore();
            this.auth = firebase.auth();
        }
    }

    public getApp() {
        return this.app;
    }

    public getDb() {
        return this.firestore;
    }

    public getAuth() {
        return this.auth;
    }
}

const firebaseService = new FirebaseService();

export default firebaseService;
export const db = () => firebaseService.getDb();
export const auth = () => firebaseService.getAuth();
