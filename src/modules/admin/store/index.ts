import { Module } from 'vuex';
import { RootState } from '@/core/app';
import { AdminState } from '../';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: AdminState = {
    isResponsive: false,
    isDrawerOpen: true,
    isDrawerMini: false,
    menu: [],
    status: null,
    error: null,
    success: null,
};

export const storeConfig: Module<AdminState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
