import { injectable } from 'inversify';
import firebase, { User } from 'firebase/app';
import { auth } from '@/modules/firebase';
import { AuthUser, AuthService, EmailPasswordCredentials } from '../';

const convertUserToAuthUser = (user: User | null | undefined): AuthUser | null => {
    if (user) {
        return {
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
        };
    }
    return null;
};

@injectable()
export class FirebaseAuthService implements AuthService<firebase.auth.AuthProvider> {
    public getCurrentUser() {
        return convertUserToAuthUser(auth().getCurrentUser());
    }

    public async createUserWithEmailAndPassword(credentials: EmailPasswordCredentials) {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(credentials);
            return Promise.resolve(convertUserToAuthUser(userCredential.user));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async signInWithEmailAndPassword(credentials: EmailPasswordCredentials) {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(credentials);
            return Promise.resolve(convertUserToAuthUser(userCredential.user));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async signInWithPopup(provider: firebase.auth.AuthProvider) {
        try {
            const userCredential = await auth().signInWithPopup(provider);
            return Promise.resolve(convertUserToAuthUser(userCredential.user));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async signOut() {
        return auth().signOut();
    }

    public onAuthStateChanged(onAuthStateChangedCallback: (user?: AuthUser | null) => void) {
        return auth().onAuthStateChanged(
            (user) => onAuthStateChangedCallback(convertUserToAuthUser(user)),
        );
    }

    public getGoogleAuthProvider() {
        return new firebase.auth.GoogleAuthProvider();
    }

    public getFacebookAuthProvider() {
        return new firebase.auth.FacebookAuthProvider();
    }

    public validateUser(uid: string, throwException = true): boolean {
        return auth().validateUser(uid, throwException);
    }
}
