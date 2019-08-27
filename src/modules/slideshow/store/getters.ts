import { GetterTree } from 'vuex';
import { RootState } from '@/modules/store/types';
import { Slideshow, SlideshowState, SlideshowStatus } from '..';

export const getters: GetterTree<SlideshowState, RootState> = {
    slideshows(state): Slideshow[] | null {
        const { slideshows } = state;
        return slideshows;
    },
    currentSlideshow(state): Slideshow | null {
        const { currentSlideshow } = state;
        return currentSlideshow;
    },
    status(state): SlideshowStatus | null {
        const { status } = state;
        return status;
    },
};
