import { GetterTree } from 'vuex';
import { RootState } from '@/core/app';
import { MediaState } from '..';

export const getters: GetterTree<MediaState, RootState> = {
    list(state): string[] | null {
        const { list } = state;
        return list;
    },
    currentUploads(state): string[] | null {
        const { currentUploads } = state;
        return currentUploads;
    },
};
