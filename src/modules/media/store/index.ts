import { Module } from 'vuex';
import { RootState } from '@/core';
import { MediaState } from '..';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: MediaState = {
    list: null,
    currentUploads: null,
};

export const storeConfig: Module<MediaState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

