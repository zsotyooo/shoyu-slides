import { GetterTree } from 'vuex';
import { RootState } from '@/modules/store';
import { AuthState, AuthUser, AuthStatus } from '../';

export const getters: GetterTree<AuthState, RootState> = {
  authUser(state): AuthUser | null {
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
