import { GetterTree } from 'vuex';
import { UserInfo } from 'firebase';
import { RootState } from '@/modules/store/types';
import { AuthState, AuthStatus } from '../types';

export const getters: GetterTree<AuthState, RootState> = {
  user(state): UserInfo | null {
    const { user } = state;
    return user;
  },
  error(state): string | null {
    const { error } = state;
    return error;
  },
  status(state): AuthStatus | null {
    const { status } = state;
    return status;
  },
  isLoggedIn(state): boolean {
    const { user } = state;
    if (!user) {
      return false;
    }
    return !!user.uid;
  },
};
