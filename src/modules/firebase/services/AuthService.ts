import firebase, { User, UserInfo } from 'firebase/app';
import { EmailAuthCredentials } from '..';

const convertUserToUserInfo = (user: firebase.User): UserInfo => ({
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    providerId: user.providerId,
    uid: user.uid,
});

export class AuthService {
    constructor(
        private auth: firebase.auth.Auth,
    ) { }

    public getCurrentUser() {
        return this.auth.currentUser;
    }

    public async createUserWithEmailAndPassword(credentials: EmailAuthCredentials) {
        try {
            const result = await this.auth
                .createUserWithEmailAndPassword(credentials.email, credentials.password);
            return Promise.resolve(result);
        } catch (e) {
            console.warn('Error while creating user with Email and Password!', e);
            return Promise.reject(e);
        }
    }

    public async signInWithEmailAndPassword(credentials: EmailAuthCredentials) {
        try {
            const result = await this.auth
                .signInWithEmailAndPassword(credentials.email, credentials.password);
            return Promise.resolve(result);
        } catch (e) {
            console.warn('Error while signing in with Email and Password!', e);
            // TODO: implement fallback here
            return Promise.reject(e);
        }
    }

    public async signInWithPopup(provider: firebase.auth.AuthProvider) {
        try {
            const result = await this.auth.signInWithPopup(provider);
            return Promise.resolve(result);
        } catch (e) {
            console.warn('Error while signing in with Popup!', e);
            // TODO: implement fallback here
            return Promise.reject(e);
        }
    }

    public async signOut() {
        return this.auth.signOut();
    }

    public onAuthStateChanged(onAuthStateChangedCallback: (user?: User | null) => void) {
        this.auth.onAuthStateChanged(onAuthStateChangedCallback);
    }

    public validateUser(uid: string, throwException = true): boolean {
        if (this.auth.currentUser && this.auth.currentUser.uid === uid) {
            return true;
        }
        if (throwException) {
            throw new Error('User does not match!');
        }
        return false;
    }
}
