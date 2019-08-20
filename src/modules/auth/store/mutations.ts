import { MutationTree } from 'vuex';
import { UserInfo } from 'firebase';
import { AuthState, AuthStatus } from '../types';

export const mutations: MutationTree<AuthState> = {
    setUser(state, payload: UserInfo | null) {
        state.user = payload;
    },

    removeUser(state) {
        state.user = null;
    },

    setStatus(state, payload: AuthStatus) {
        state.status = payload;
    },

    setError(state, payload: string | null) {
        state.error = payload;
    },
};
