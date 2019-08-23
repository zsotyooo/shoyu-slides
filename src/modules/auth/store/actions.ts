import { ActionTree, Commit } from 'vuex';
import { RootState } from '@/modules/store';
import { AuthState, EmailPasswordCredentials } from '../';
import { authService } from '../services';

const signInWithProvider = async (commit: Commit, provider: any) => {
    commit('setStatus', 'loading');
    try {
        const user = await authService().signInWithPopup(provider);
        if (user) {
            commit('setAuthUser', user);
        } else {
            commit('removeAuthUser');
        }
        commit('setStatus', 'success');
        commit('setError', null);
        return Promise.resolve(user);
    } catch (e) {
        commit('setStatus', 'failure');
        commit('setError', e.message);
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
        commit('setStatus', 'loading');
        try {
            const user = await authService().createUserWithEmailAndPassword(payload);
            if (user) {
                commit('setAuthUser', user);
            } else {
                commit('removeAuthUser');
            }
            commit('setStatus', 'success');
            commit('setError', null);
            return Promise.resolve(user);
        } catch (e) {
            commit('setStatus', 'failure');
            commit('setError', e.message);
            return Promise.reject(e);
        }
    },

    async signInAction({ commit }, payload: EmailPasswordCredentials) {
        commit('setStatus', 'loading');
        try {
            const user = await authService().signInWithEmailAndPassword(payload);
            if (user) {
                commit('setAuthUser', user);
            } else {
                commit('removeAuthUser');
            }
            commit('setStatus', 'success');
            commit('setError', null);
            return Promise.resolve(user);
        } catch (e) {
            commit('setStatus', 'failure');
            commit('setError', e.message);
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
            commit('setStatus', 'success');
            commit('setError', null);
            return Promise.resolve();
        } catch (e) {
            commit('setStatus', 'failure');
            commit('setError', e.message);
            return Promise.reject();
        }
    },

    async signOutLightAction({ commit }) {
        commit('removeAuthUser');
        commit('setStatus', 'success');
        commit('setError', null);
    },
};
