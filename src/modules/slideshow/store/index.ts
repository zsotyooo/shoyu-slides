import { Module } from 'vuex';
import { RootState } from '@/core/app';
import { SlideshowState } from '..';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: SlideshowState = {
    slideshows: [],
    currentSlideshow: null,
};

export const storeConfig: Module<SlideshowState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

