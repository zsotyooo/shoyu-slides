import { GetterTree } from 'vuex';
import { RootState } from '@/modules/store/types';
import { Slideshow, SlideshowState } from '../types';

export const getters: GetterTree<SlideshowState, RootState> = {
    slideshows(state): Slideshow[] | null {
        const { slideshows } = state;
        return slideshows;
    },
    currentSlideshow(state): Slideshow | null {
        const { currentSlideshow } = state;
        return currentSlideshow;
    },
    status(state): 'loading' | 'success' | 'failed' {
        const { status } = state;
        return status;
    },
};
