import { ActionTree, Commit } from 'vuex';
import { AuthUser } from '@/modules/auth';
import { RootState } from '@/core/app';
import { appStateService } from '@/modules/app';
import { SlideshowDocument, slideshowService, Slideshow, SlideshowState, createSlideshowObject } from '..';

const fetchSlideshow = async (commit: Commit, id: string): Promise<SlideshowDocument | false> => {
    try {
        appStateService().setLoading();
        const res = await slideshowService().fetchSlideshow(id);
        if (res) {
            commit('setCurrentSlideshow', { id, ...res.data});
        }
        appStateService().setSuccess(null);
        return Promise.resolve(res);
    } catch (e) {
        appStateService().setError(e.message);
        commit('removeCurrentSlideshow');
        return Promise.reject(e);

    }
};
export const actions: ActionTree<SlideshowState, RootState> = {
    async fetchSlideshowsAction({ commit }, authUser: AuthUser | null) {
        if (authUser) {
            try {
                appStateService().setLoading();
                const slideshowDocs = await slideshowService()
                    .fetchSlideshows(authUser.uid);
                appStateService().setSuccess(null);
                if (slideshowDocs) {
                    commit('setSlideshows', slideshowDocs.map((s) => ({...s.data, id: s.id})));
                } else {
                    commit('removeSlideshows');
                }
            } catch (e) {
                appStateService().setError(e.message);
                commit('removeSlideshows');
            }
        } else {
            appStateService().setError('This page is only available after signing in!');
            commit('removeSlideshows');
        }
    },

    async addSlideshowAction({ commit }, slideshow: Slideshow): Promise<SlideshowDocument | false> {
        try {
            appStateService().setLoading();
            const res = await slideshowService().addSlideshow(slideshow);
            const slideshowDoc = await fetchSlideshow(commit, res.id);
            appStateService().setSuccess('Slideshow created.');
            return Promise.resolve(slideshowDoc);
        } catch (e) {
            appStateService().setError(e.message);
            commit('removeCurrentSlideshow');
            return Promise.reject();
        }
    },

    async updateSlideshowAction({ commit }, payload: SlideshowDocument): Promise<SlideshowDocument | false> {
        appStateService().setLoading();
        try {
            const res = await slideshowService().saveSlideshow({id: payload.id, data: payload.data});
            const slideshowDoc = await fetchSlideshow(commit, res.id);
            appStateService().setSuccess('Slideshow saved.');
            return Promise.resolve(slideshowDoc);
        } catch (e) {
            appStateService().setError(e.message);
            commit('removeCurrentSlideshow');
            return Promise.reject();
        }
    },

    async fetchCurrentSlideshowAction({ commit }, id: string): Promise<SlideshowDocument | false> {
        try {
            appStateService().setLoading();
            const slideshowDoc = await fetchSlideshow(commit, id);
            return Promise.resolve(slideshowDoc);
        } catch (e) {
            appStateService().setError(e.message);
            commit('removeCurrentSlideshow');
            return Promise.reject();
        }
    },

    removeCurrentSlideshowAction({ commit }) {
        commit('removeCurrentSlideshow');
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
