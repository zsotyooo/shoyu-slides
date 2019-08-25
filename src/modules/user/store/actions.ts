import { ActionTree } from 'vuex';
import { AuthUser } from '@/modules/auth/types';
import { RootState } from '@/modules/store/types';
import { User, UserState, UserService } from '../types';
import { userService } from '..';

const convertAuthUserInfoToUser = (user: AuthUser): User => ({
    displayName: user.displayName || '',
    photoUrl: user.photoURL || '',
    uid: user.uid,
});

export const actions: ActionTree<UserState, RootState> = {
    async setCurrentUser({ commit }, authUser: AuthUser | null) {
        if (authUser) {
            try {
                let userDoc = await userService()
                    .fetchUser(authUser.uid);
                if (!userDoc) {
                    userDoc = await userService()
                        .saveUser({ id: authUser.uid, data: convertAuthUserInfoToUser(authUser) });
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
