import { ActionTree, Commit } from 'vuex';
import { AuthUser } from '@/modules/auth/types';
import { RootState } from '@/modules/store/types';
import { slideshowService, Slideshow, SlideshowState, createSlideshowObject } from '..';
import { SlideshowDocument } from '../types';

const fetchSlideshow = async (commit: Commit, id: string): Promise<SlideshowDocument | false> => {
    try {
        commit('setStatus', 'loading');
        const res = await slideshowService().fetchSlideshow(id);
        if (res) {
            commit('setCurrentSlideshow', { id, ...res.data});
        }
        commit('setStatus', 'success');
        return Promise.resolve(res);
    } catch (e) {
        commit('setStatus', 'failure');
        commit('removeCurrentSlideshows');
        return Promise.reject(e);

    }
};
export const actions: ActionTree<SlideshowState, RootState> = {
    async fetchSlideshowsAction({ commit }, authUser: AuthUser | null) {
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
    async addSlideshowAction({ commit }, slideshow: Slideshow): Promise<SlideshowDocument | false> {
        try {
            const res = await slideshowService().addSlideshow(slideshow);
            const slideshowDoc = await fetchSlideshow(commit, res.id);
            return Promise.resolve(slideshowDoc);
        } catch (e) {
            commit('setStatus', 'failure');
            commit('removeCurrentSlideshow');
            return Promise.reject();
        }
    },
    // async setCurrentSlideshow({ commit }, slideshow: Slideshow) {
    //     if (slideshow.id) {
    //         try {
    //             let slideshowDoc = await slideshowService()
    //                 .fetchSlideshow(slideshow.id);
    //             if (!slideshowDoc) {
    //                 slideshowDoc = await slideshowService()
    //                     .saveSlideshow({ id: slideshow.id, data: createSlideshowObject(slideshow) });
    //             }
    //             commit('setCurrentSlideshow', slideshowDoc.data);
    //         } catch (e) {
    //             commit('removeCurrentSlideshow');
    //         }
    //     } else {
    //         commit('removeCurrentSlideshow');
    //     }
    // },
};
