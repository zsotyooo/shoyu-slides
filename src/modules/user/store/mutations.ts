import { MutationTree } from 'vuex';
import { User, UserState } from '../types';

export const mutations: MutationTree<UserState> = {
    setUsers(state, payload: User[] | null) {
        state.users = payload;
    },

    removeUsers(state) {
        state.users = null;
    },

    setCurrentUser(state, payload: User | null) {
        state.currentUser = payload;
    },

    removeCurrentUser(state) {
        state.currentUser = null;
    },
};
