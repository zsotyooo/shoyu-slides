import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { DbService } from './DbService';
import { AuthService } from './AuthService';

export class FirebaseServices {
    private app: firebase.app.App;
    private firestore: firebase.firestore.Firestore;
    private auth: AuthService;
    private db: DbService;

    public init(config: {[index: string]: string}) {
        if (!this.app) {
            this.app = firebase.initializeApp(config);
            this.firestore = this.app.firestore();
            this.db = new DbService(this.firestore);
            this.auth = new AuthService(firebase.auth());
        }
    }

    public getApp() {
        return this.app;
    }

    public getDb() {
        return this.db;
    }

    public getAuth() {
        return this.auth;
    }
}

const firebaseService = new FirebaseServices();

export default firebaseService;
export const app = () => firebaseService.getApp();
export const db = () => firebaseService.getDb();
export const auth = () => firebaseService.getAuth();
