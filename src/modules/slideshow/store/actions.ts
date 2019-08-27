import { ActionTree } from 'vuex';
import { AuthUser } from '@/modules/auth/types';
import { RootState } from '@/modules/store/types';
import { slideshowService, SlideshowState } from '..';

export const actions: ActionTree<SlideshowState, RootState> = {
    async fetchSlideshows({ commit }, authUser: AuthUser | null) {
        if (authUser) {
            try {
                commit('setStatus', 'loading');
                const slideshowDocs = await slideshowService()
                    .fetchSlideshows(authUser.uid);
                commit('setStatus', 'success');
                if (slideshowDocs) {
                    commit('setSlideshows', slideshowDocs.map((s) => s.data));
                } else {
                    commit('removeSlideshows');
                }
            } catch (e) {
                commit('setStatus', 'failure');
                commit('removeSlideshows');
            }
        } else {
            commit('setStatus', 'success');
            commit('removeSlideshows');
        }
    },
};
