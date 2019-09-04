import { MutationTree } from 'vuex';
import { AuthUser, AuthState } from '../types';

export const mutations: MutationTree<AuthState> = {
    setAuthUser(state, payload: AuthUser | null) {
        state.user = payload;
    },

    removeAuthUser(state) {
        state.user = null;
    },
};
