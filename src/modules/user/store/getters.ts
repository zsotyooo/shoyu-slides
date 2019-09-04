import { GetterTree } from 'vuex';
import { RootState } from '@/core';
import { User, UserState } from '../types';

export const getters: GetterTree<UserState, RootState> = {
    users(state): User[] | null {
        const { users } = state;
        return users;
    },
    currentUser(state): User | null {
        const { currentUser } = state;
        return currentUser;
    },
};
