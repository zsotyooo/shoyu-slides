import { MutationTree } from 'vuex';
import { Slideshow, SlideshowState } from '..';

export const mutations: MutationTree<SlideshowState> = {
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
