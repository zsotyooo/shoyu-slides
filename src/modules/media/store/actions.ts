import { ActionTree, Commit } from 'vuex';
import { AuthUser, authService } from '@/modules/auth';
import { RootState } from '@/core';
import { appStateService } from '@/modules/app';
import { MediaState, mediaService } from '..';

export const actions: ActionTree<MediaState, RootState> = {
    async uploadUserFileAction(
        { commit },
        payload: {
            authUser: AuthUser | null,
            file: File,
            onStarted?: () => void,
            onProgress?: (progress: number) => void,
            onPaused?: () => void,
        },
    ): Promise<string> {
        if (payload.authUser) {
            try {
                appStateService().setLoading();
                const downloadUrl = await mediaService()
                    .uploadToUserFolder(
                        payload.authUser.uid,
                        payload.file,
                        payload.onStarted,
                        payload.onProgress,
                        payload.onPaused,
                    );
                appStateService().setSuccess(null);

                commit('addToCurrentUploads', downloadUrl);
                return Promise.resolve(downloadUrl);
            } catch (e) {
                appStateService().setError(e.message);
                return Promise.reject(e.message);
            }
        } else {
            appStateService().setError('You have to sign sign in to be able to uplad!');
            commit('removeList');
            commit('removeCurrentUploads');
            return Promise.reject('You have to sign sign in to be able to uplad!');
        }
    },

    async fetchUserFileList({ commit }, authUser: AuthUser) {
        const list = await mediaService().fetchUserFiles(authUser.uid);
        commit('setList', list);
    },
};
