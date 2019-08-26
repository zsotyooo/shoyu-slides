import { Module } from 'vuex';
import { RootState } from '@/modules/store';
import { AdminState } from '../';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: AdminState = {
    isResponsive: false,
    isDrawerOpen: true,
};

export const storeConfig: Module<AdminState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
