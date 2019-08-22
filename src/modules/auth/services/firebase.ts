import { User } from 'firebase/app';
import { auth } from '@/modules/firebase';
import { EmailAuthCredentials } from '@/modules/firebase';
import { AuthUser } from '../';

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

export const getCurrentUser = () => convertUserToAuthUser(auth().getCurrentUser());

export const createUserWithEmailAndPassword = async (credentials: EmailAuthCredentials) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(credentials);
        return Promise.resolve(convertUserToAuthUser(userCredential.user));
    } catch (e) {
        return Promise.reject(e);
    }
};

export const signInWithEmailAndPassword = async (credentials: EmailAuthCredentials) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(credentials);
        return Promise.resolve(convertUserToAuthUser(userCredential.user));
    } catch (e) {
        return Promise.reject(e);
    }
};

export const signInWithPopup = async (provider: firebase.auth.AuthProvider) => {
    try {
        const userCredential = await auth().signInWithPopup(provider);
        return Promise.resolve(convertUserToAuthUser(userCredential.user));
    } catch (e) {
        return Promise.reject(e);
    }
};

export const signOut = async () => auth().signOut();

export const onAuthStateChanged = (onAuthStateChangedCallback: (user?: AuthUser | null) => void) =>
    auth().onAuthStateChanged((user) => onAuthStateChangedCallback(convertUserToAuthUser(user)));
