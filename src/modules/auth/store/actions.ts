import { ActionTree } from 'vuex';
import firebase, { User, UserInfo } from 'firebase/app';
import 'firebase/auth';
import { RootState } from '@/modules/store/types';
import { AuthState, EmailAuthCredentials } from '../types';

const retrieveUserInfo = (user: User): UserInfo => ({
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    providerId: user.providerId,
    uid: user.uid,
});

export const actions: ActionTree<AuthState, RootState> = {
    setUserFromFirebaseAction({ commit }) {
        const user = firebase.auth().currentUser;
        if (user) {
            commit('setUser', retrieveUserInfo(user));
        } else {
            commit('removeUser');
        }
    },

    signUpAction({ commit }, payload: EmailAuthCredentials) {
        commit('setStatus', 'loading');
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then((response) => {
                if (response.user) {
                    commit('setUser', retrieveUserInfo(response.user));
                } else {
                    commit('removeUser');
                }
                commit('setStatus', 'success');
                commit('setError', null);
            })
            .catch((error) => {
                commit('setStatus', 'failure');
                commit('setError', error.message);
            });
    },

    signInAction({ commit }, payload: EmailAuthCredentials) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((response) => {
                if (response.user) {
                    commit('setUser', retrieveUserInfo(response.user));
                } else {
                    commit('removeUser');
                }
                commit('setStatus', 'success');
                commit('setError', null);
            })
            .catch((error) => {
                commit('setStatus', 'failure');
                commit('setError', error.message);
            });
    },

    signInWithGoogleAction({ commit }) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((response) => {
                if (response.user) {
                    commit('setUser', retrieveUserInfo(response.user));
                } else {
                    commit('removeUser');
                }
                commit('setStatus', 'success');
                commit('setError', null);
            })
            .catch((error) => {
                commit('setStatus', 'failure');
                commit('setError', error.message);
            });
    },

    signInWithFacebookAction({ commit }) {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((response) => {
                if (response.user) {
                    commit('setUser', retrieveUserInfo(response.user));
                } else {
                    commit('removeUser');
                }
                commit('setStatus', 'success');
                commit('setError', null);
            })
            .catch((error) => {
                commit('setStatus', 'failure');
                commit('setError', error.message);
            });
    },

    signOutAction({ commit }) {
        firebase.auth().signOut()
            .then((response) => {
                commit('removeUser');
                commit('setStatus', 'success');
                commit('setError', null);
            })
            .catch((error) => {
                commit('setStatus', 'failure');
                commit('setError', error.message);
            });
    },

    signOutLightAction({ commit }) {
        commit('removeUser');
        commit('setStatus', 'success');
        commit('setError', null);
    },
};
