import { MutationTree } from 'vuex';
import { AuthUser, AuthState, AuthStatus } from '../types';

export const mutations: MutationTree<AuthState> = {
    setAuthUser(state, payload: AuthUser | null) {
        state.user = payload;
    },

    removeAuthUser(state) {
        state.user = null;
    },

    setStatus(state, payload: AuthStatus) {
        state.status = payload;
    },

    setError(state, payload: string | null) {
        state.error = payload;
    },
};
