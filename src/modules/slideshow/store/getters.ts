import { GetterTree } from 'vuex';
import { RootState } from '@/core';
import { Slideshow, SlideshowState } from '..';

export const getters: GetterTree<SlideshowState, RootState> = {
    slideshows(state): Slideshow[] | null {
        const { slideshows } = state;
        return slideshows;
    },
    currentSlideshow(state): Slideshow | null {
        const { currentSlideshow } = state;
        return currentSlideshow;
    },
};
