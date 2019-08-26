import { Module } from 'vuex';
import { RootState } from '@/modules/store/types';
import { SlideshowState, SlideshowService } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const namespaced = true;

const state: SlideshowState = {
    status: 'success',
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

