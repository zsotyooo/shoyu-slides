import { MutationTree } from 'vuex';
import { MediaState } from '..';

export const mutations: MutationTree<MediaState> = {
    setList(state, payload: string[] | null) {
        state.list = payload;
    },

    removeList(state) {
        state.list = null;
    },

    setCurrentUploads(state, payload: string[] | null) {
        state.currentUploads = payload;
    },

    removeCurrentUploads(state) {
        state.currentUploads = null;
    },

    addToCurrentUploads(state, payload: string) {
        if (state.currentUploads === null) {
            state.currentUploads = [ payload ];
        } else {
            state.currentUploads.push(payload);
        }
    },
};
