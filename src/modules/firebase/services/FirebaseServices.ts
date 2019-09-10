import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { DbService } from './DbService';
import { AuthService } from './AuthService';
import { StorageService } from './StorageService';

export class FirebaseServices {
    private app: firebase.app.App;
    private fFirestore: firebase.firestore.Firestore;
    private fStorage: firebase.storage.Storage;
    private auth: AuthService;
    private db: DbService;
    private storage: StorageService;

    public init(config: {[index: string]: string}) {
        if (!this.app) {
            this.app = firebase.initializeApp(config);
            this.fFirestore = this.app.firestore();
            this.db = new DbService(this.fFirestore);
            this.auth = new AuthService(firebase.auth());
            this.fStorage = firebase.storage();
            this.storage = new StorageService(this.fStorage);
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

    public getStorage() {
        return this.storage;
    }
}

const firebaseService = new FirebaseServices();

export default firebaseService;
export const app = () => firebaseService.getApp();
export const db = () => firebaseService.getDb();
export const auth = () => firebaseService.getAuth();
export const storage = () => firebaseService.getStorage();
