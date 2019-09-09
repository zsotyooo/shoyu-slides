import { MutationTree } from 'vuex';
import _ from 'lodash';
import { AuthUser, AuthState } from '../types';

export const mutations: MutationTree<AuthState> = {
    setAuthUser(state, payload: AuthUser | null) {
        if (!_.isEqual({...state.user}, {...payload})) {
            state.user = payload;
        }
    },

    removeAuthUser(state) {
        if (state.user !== null) {
            state.user = null;
        }
    },
};
