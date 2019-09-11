import { GetterTree } from 'vuex';
import { RootState } from '@/core/app';
import { AuthState, AuthUser } from '../';

export const getters: GetterTree<AuthState, RootState> = {
    authUser(state): AuthUser | null {
        const { user } = state;
        return user;
    },
    isLoggedIn(state): boolean {
        const { user } = state;
        if (!user) {
            return false;
        }
        return !!user.uid;
    },
};
