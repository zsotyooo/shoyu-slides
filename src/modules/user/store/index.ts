import { Module } from 'vuex';
import { RootState } from '@/modules/store/types';
import { UserState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: UserState = {
    users: null,
    currentUser: null,
};

export const storeConfig: Module<UserState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
