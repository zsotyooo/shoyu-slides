import { ActionTree, Store, Commit } from 'vuex';
import firebase, { User, UserInfo } from 'firebase/app';
import { RootState } from '@/modules/store';
import { getCurrentUser, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup, signOut } from '../services/firebase';
import { AuthState, EmailAuthCredentials } from '../';

const signInWithProvider = async (commit: Commit, provider: firebase.auth.AuthProvider) => {
    commit('setStatus', 'loading');
    try {
        const user = await signInWithPopup(provider);
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
        const user = getCurrentUser();
        if (user) {
            commit('setAuthUser', user);
        } else {
            commit('removeAuthUser');
        }
    },

    async signUpAction({ commit }, payload: EmailAuthCredentials) {
        commit('setStatus', 'loading');
        try {
            const user = await createUserWithEmailAndPassword(payload);
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

    async signInAction({ commit }, payload: EmailAuthCredentials) {
        commit('setStatus', 'loading');
        try {
            const user = await signInWithEmailAndPassword(payload);
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
        const provider = new firebase.auth.GoogleAuthProvider();
        return signInWithProvider(commit, provider);
    },

    async signInWithFacebookAction({ commit }) {
        const provider = new firebase.auth.FacebookAuthProvider();
        return signInWithProvider(commit, provider);
    },

    async signOutAction({ commit }) {
        try {
            await signOut();
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
