import { MutationTree } from 'vuex';
import { Slideshow, SlideshowState, SlideshowType, SlideshowStatus } from '..';

export const mutations: MutationTree<SlideshowState> = {
    setStatus(state, payload: SlideshowStatus | null) {
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
