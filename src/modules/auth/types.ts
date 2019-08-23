import { UserInfo} from 'firebase';

export type AuthUser = UserInfo;

export type AuthStatus = 'success' | 'failure' | 'loading';

export interface EmailPasswordCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: UserInfo | null;
    status: AuthStatus | null;
    error: string | null;
}

export interface AuthService<ProviderT> {
    getCurrentUser: () => AuthUser | null;
    createUserWithEmailAndPassword: (credentials: EmailPasswordCredentials) => Promise<AuthUser | null>;
    signInWithEmailAndPassword: (credentials: EmailPasswordCredentials) => Promise<AuthUser | null>;
    signInWithPopup: (provider: ProviderT) => Promise<AuthUser | null>;
    signOut: () => Promise<void>;
    onAuthStateChanged: (onAuthStateChangedCallback: (user?: AuthUser | null) => void) => void;
    getGoogleAuthProvider: () => ProviderT;
    getFacebookAuthProvider: () => ProviderT;
}
