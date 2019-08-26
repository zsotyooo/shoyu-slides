import { MutationTree } from 'vuex';
import { Slideshow, SlideshowState, SlideshowType } from '../types';

export const mutations: MutationTree<SlideshowState> = {
    setStatus(state, payload: 'loading' | 'success' | 'failed') {
        state.status = payload;
    },

    setSlideshows(state, payload: Slideshow[] | null) {
        state.slideshows = payload;
    },

    removeSlideshows(state) {
        state.slideshows = null;
    },

    setCurrentSlideshow(state, payload: Slideshow | null) {
        state.currentSlideshow = payload;
    },

    removeCurrentSlideshow(state) {
        state.currentSlideshow = null;
    },
};
