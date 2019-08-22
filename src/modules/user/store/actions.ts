import { ActionTree } from 'vuex';
import { UserInfo } from 'firebase/app';
import { RootState } from '@/modules/store/types';
import { fetchUser, saveUser } from '../service/firebase';
import { User, UserState } from '../types';

const convertAuthUserInfoToUser = (user: UserInfo): User => ({
    displayName: user.displayName || '',
    photoUrl: user.photoURL || '',
    uid: user.uid,
});

export const actions: ActionTree<UserState, RootState> = {
    async setCurrentUser({ commit }, authUser: UserInfo | null) {
        if (authUser) {
            try {
                let userDoc = await fetchUser(authUser.uid);
                if (!userDoc) {
                    userDoc = await saveUser({ id: authUser.uid, data: convertAuthUserInfoToUser(authUser) });
                }
                commit('setCurrentUser', userDoc.data);
            } catch (e) {
                commit('removeCurrentUser');
            }
        } else {
            commit('removeCurrentUser');
        }
    },
};
