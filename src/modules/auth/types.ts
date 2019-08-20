import { UserInfo } from 'firebase';

export interface EmailAuthCredentials {
    email: string;
    password: string;
}

export type AuthStatus = 'success' | 'failure';

export interface AuthState {
    user: UserInfo | null;
    status: AuthStatus | null;
    error: string | null;
}
