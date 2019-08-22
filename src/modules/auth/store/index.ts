import { Module } from 'vuex';
import { RootState } from '@/modules/store';
import { AuthState } from '../';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: AuthState = {
    user: null,
    status: null,
    error: null,
};

export const storeConfig: Module<AuthState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
