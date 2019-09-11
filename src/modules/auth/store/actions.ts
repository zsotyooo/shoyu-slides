import { ActionTree, Commit } from 'vuex';
import { RootState } from '@/core/app';
import { authService, AuthState, EmailPasswordCredentials } from '..';
import { appStateService } from '@/modules/app';

const signInWithProvider = async (commit: Commit, provider: any) => {
    appStateService().setLoading();
    try {
        const user = await authService().signInWithPopup(provider);
        if (user) {
            commit('setAuthUser', user);
        } else {
            commit('removeAuthUser');
        }
        appStateService().setSuccess('You have successfully signed in.');
        return Promise.resolve(user);
    } catch (e) {
        appStateService().setError(e.message);
        return Promise.reject(e);
    }
};

export const actions: ActionTree<AuthState, RootState> = {
    syncAuthUserAction({ commit }) {
        const user = authService().getCurrentUser();
        if (user) {
            commit('setAuthUser', user);
        } else {
            commit('removeAuthUser');
        }
    },

    async signUpAction({ commit }, payload: EmailPasswordCredentials) {
        appStateService().setLoading();
        try {
            const user = await authService().createUserWithEmailAndPassword(payload);
            if (user) {
                commit('setAuthUser', user);
            } else {
                commit('removeAuthUser');
            }
            appStateService().setSuccess('You have successfully signed up.');
            return Promise.resolve(user);
        } catch (e) {
            appStateService().setError(e.message);
            return Promise.reject(e);
        }
    },

    async signInAction({ commit }, payload: EmailPasswordCredentials) {
        appStateService().setLoading();
        try {
            const user = await authService().signInWithEmailAndPassword(payload);
            if (user) {
                commit('setAuthUser', user);
            } else {
                commit('removeAuthUser');
            }
            appStateService().setSuccess('You have successfully signed in.');
            return Promise.resolve(user);
        } catch (e) {
            appStateService().setError(e.message);
            return Promise.reject(e);
        }
    },

    async signInWithGoogleAction({ commit }) {
        const provider = authService().getGoogleAuthProvider();
        return signInWithProvider(commit, provider);
    },

    async signInWithFacebookAction({ commit }) {
        const provider = authService().getFacebookAuthProvider();
        return signInWithProvider(commit, provider);
    },

    async signOutAction({ commit }) {
        try {
            await authService().signOut();
            commit('removeAuthUser');
            appStateService().setSuccess('You have successfully signed out.');
            return Promise.resolve();
        } catch (e) {
            appStateService().setError(e.message);
            return Promise.reject();
        }
    },

    async signOutLightAction({ commit }) {
        commit('removeAuthUser');
        appStateService().setSuccess(null);
    },
};
