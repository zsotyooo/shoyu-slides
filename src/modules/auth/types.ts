import { UserInfo} from 'firebase';
export { EmailAuthCredentials } from '@/modules/firebase/types';

export type AuthUser = UserInfo;

export type AuthStatus = 'success' | 'failure';

export interface AuthState {
    user: UserInfo | null;
    status: AuthStatus | null;
    error: string | null;
}
